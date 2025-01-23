export const handleStream = async (prompt, updateResponseText) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "o1-mini",
          messages: [{ role: 'user', content: prompt }],
          stream: true,
        }),
      });
  
      // Check for errors or lack of streaming support
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status} ${response.statusText}`);
      }
      if (!response.body) {
        throw new Error('ReadableStream not yet supported in this environment or no body returned.');
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
  
      let receivedText = '';
      let batchText = ''; // Accumulate chunks between UI updates
  
      // For throttling updates
      let lastUpdate = 0;
      const throttleDelay = 100; // ms - adjust as needed for smooth rendering
  
      // Helper function to append and render accumulated text
      const processStream = () => {
        requestAnimationFrame(() => {
          if (batchText) {
            receivedText += batchText;
            batchText = ''; // Reset for the next batch
            updateResponseText(receivedText);
          }
        });
      };
  
      // Read the stream
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
  
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
  
          // Each chunk can contain multiple lines split by newlines
          const parsedLines = chunk
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line !== '')
            .map((line) => line.replace(/^data:\s*/, '')); // Remove "data: " prefix if present
  
          for (const line of parsedLines) {
            if (line === '[DONE]') {
              // When "[DONE]" is received, break out of the loop
              done = true;
              break;
            }
  
            try {
              const json = JSON.parse(line);
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                batchText += content;
  
                // Throttle updates to avoid calling setState/render too frequently
                const now = Date.now();
                if (now - lastUpdate >= throttleDelay) {
                  processStream();
                  lastUpdate = now;
                }
              }
            } catch (err) {
              // Not all lines can be valid JSON, so just log and continue
              console.error('Error parsing line:', err, line);
            }
          }
        }
      }
  
      // Do a final update in case any text remains unrendered
      processStream();
    } catch (error) {
      console.error('Error fetching response:', error);
      updateResponseText('Error occurred while fetching response.');
    }
  };
