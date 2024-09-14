// util.js

export const handleStream = async (prompt, updateResponseText) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                stream: true,
            }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let receivedText = '';
        let batchText = ''; // Holds the text to be processed in batches

        const processStream = () => {
            // Update state using requestAnimationFrame for smoother rendering
            requestAnimationFrame(() => {
                if (batchText) {
                    receivedText += batchText;
                    updateResponseText(receivedText);
                    batchText = ''; // Reset the batch after updating the state
                }
            });
        };

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = streamDone;
            if (value) {
                const chunk = decoder.decode(value);
                const parsedLines = chunk
                    .split('\n')
                    .filter((line) => line.trim() !== '')
                    .map((line) => line.replace(/^data: /, ''));

                for (const line of parsedLines) {
                    if (line === '[DONE]') return;

                    try {
                        const json = JSON.parse(line);
                        const content = json.choices[0].delta.content;
                        if (content) {
                            batchText += content;

                            // Throttle state updates for fluid rendering (e.g., every 100ms)
                            if (!done) {
                                setTimeout(processStream, 100); // Adjust time for smoothness
                            }
                        }
                    } catch (error) {
                        console.error('Error parsing line:', error);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        updateResponseText('Error occurred while fetching response.');
    }
};