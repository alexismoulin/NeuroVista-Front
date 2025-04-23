/**
 * @typedef {Object} OpenAIResponse
 * @property {Array<{ delta?: { content?: string } }>} choices
 */

const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'o3-mini';
const THROTTLE_DELAY = 100; // in ms

/**
 * Throttles the UI update.
 * @param {string} text - The new text to update.
 * @param {Function} updateResponseText - Function to update UI.
 */
function throttleUpdate(text, updateResponseText) {
  requestAnimationFrame(() => {
    updateResponseText(text);
  });
}

/**
 * Reads a stream using async iteration.
 * @param {ReadableStream} stream - The stream to read from.
 * @param {Function} onChunk - Callback for each decoded chunk.
 */
async function readStream(stream, onChunk) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } catch (error) {
    console.error('Error reading stream:', error);
  }
}

export async function handleStream(prompt, updateResponseText) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      }),
    });

    if (!response.ok) {
      console.error(`Request failed with status ${response.status} ${response.statusText}`);
      updateResponseText('Error occurred while fetching response.');
      return;
    }

    if (!response.body) {
      console.error('ReadableStream not supported in this environment or no body returned.');
      updateResponseText('Error occurred while fetching response.');
      return;
    }

    let accumulatedText = '';
    let lastUpdateTime = Date.now();

    const processChunk = (chunk) => {
      // Split chunk into lines, filter empty lines, and remove 'data:' prefix
      const lines = chunk
          .split('\n')
          .map(line => line.trim())
          .filter(line => line)
          .map(line => line.replace(/^data:\s*/, ''));

      for (const line of lines) {
        if (line === '[DONE]') {
          // Trigger final update and return early
          throttleUpdate(accumulatedText, updateResponseText);
          return;
        }
        try {
          const json = JSON.parse(line);
          const content = json.choices?.[0]?.delta?.content;
          if (content) {
            accumulatedText += content;
            const now = Date.now();
            if (now - lastUpdateTime >= THROTTLE_DELAY) {
              throttleUpdate(accumulatedText, updateResponseText);
              lastUpdateTime = now;
            }
          }
        } catch (err) {
          console.error('Error parsing line:', err, line);
        }
      }
    };

    await readStream(response.body, processChunk);
    // Final update for any remaining text
    throttleUpdate(accumulatedText, updateResponseText);
  } catch (error) {
    console.error('Error fetching response:', error);
    updateResponseText('Error occurred while fetching response.');
  }
}