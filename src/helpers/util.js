const API_URL = import.meta.env.VITE_API_URL;
const MODEL = import.meta.env.VITE_MODEL;
const REASONING_EFFORT = import.meta.env.VITE_REASONING_EFFORT;
const THROTTLE_DELAY = 100;

function getOpenAIApiKey(key) {
  return import.meta.env.VITE_OPENAI_API_KEY || key;
}

function throttleUpdate(text, updateResponseText) {
  requestAnimationFrame(() => updateResponseText(text));
}

async function parseErrorResponse(response) {
  try {
    const json = await response.json();
    return json?.error?.message || JSON.stringify(json);
  } catch {
    return `${response.status} ${response.statusText}`;
  }
}

/**
 * Streams an OpenAI Responses API response.
 *
 * @param {string} prompt
 * @param {(text: string) => void} updateResponseText
 * @param {string} key
 * @param {AbortSignal} [signal]
 * @returns {Promise<string>} Final accumulated text
 */
export async function handleStream(prompt, updateResponseText, key, signal) {
  const apiKey = getOpenAIApiKey(key);

  if (!apiKey) {
    updateResponseText('Missing OpenAI API key.');
    return '';
  }

  let accumulatedText = '';
  let lastUpdateTime = 0;
  let sseBuffer = '';

  const flush = () => {
    throttleUpdate(accumulatedText, updateResponseText);
  };

  const maybeFlush = () => {
    const now = Date.now();
    if (now - lastUpdateTime >= THROTTLE_DELAY) {
      flush();
      lastUpdateTime = now;
    }
  };

  const handleEvent = (eventData) => {
    if (!eventData || eventData === '[DONE]') {
      flush();
      return;
    }

    let event;
    try {
      event = JSON.parse(eventData);
    } catch (error) {
      console.error('Could not parse SSE event:', eventData, error);
      return;
    }

    switch (event.type) {
      case 'response.output_text.delta': {
        if (typeof event.delta === 'string') {
          accumulatedText += event.delta;
          maybeFlush();
        }
        break;
      }

      case 'response.output_text.done':
      case 'response.completed':
      case 'response.done': {
        flush();
        break;
      }

      case 'response.failed':
      case 'response.incomplete':
      case 'error': {
        console.error('OpenAI stream error event:', event);
        const message =
            event?.error?.message ||
            event?.response?.error?.message ||
            'OpenAI response failed.';
        updateResponseText(message);
        break;
      }

      default:
        // Ignore lifecycle events like:
        // response.created, response.output_item.added,
        // response.content_part.added, etc.
        break;
    }
  };

  const processChunk = (chunk) => {
    sseBuffer += chunk;

    const events = sseBuffer.split('\n\n');
    sseBuffer = events.pop() || '';

    for (const rawEvent of events) {
      const dataLines = rawEvent
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.startsWith('data:'))
          .map((line) => line.replace(/^data:\s*/, ''));

      if (!dataLines.length) continue;

      handleEvent(dataLines.join('\n'));
    }
  };

  try {
    updateResponseText('');

    const response = await fetch(API_URL, {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        reasoning: { effort: REASONING_EFFORT },
        input: prompt,
        stream: true
      }),
    });

    if (!response.ok) {
      const message = await parseErrorResponse(response);
      console.error('OpenAI request failed:', message);
      updateResponseText(`Error: ${message}`);
      return '';
    }

    if (!response.body) {
      updateResponseText('Error: streaming is not supported in this environment.');
      return '';
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    for (;;) {
      const { value, done } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      processChunk(chunk);
    }

    const finalChunk = decoder.decode();
    if (finalChunk) processChunk(finalChunk);

    if (sseBuffer.trim()) {
      processChunk('\n\n');
    }

    flush();
    return accumulatedText;
  } catch (error) {
    if (error?.name === 'AbortError') {
      console.log('OpenAI stream aborted.');
      return accumulatedText;
    }

    console.error('Error fetching OpenAI response:', error);
    updateResponseText('Error occurred while fetching response.');
    return accumulatedText;
  }
}