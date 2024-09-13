import { useRef, useEffect, useState} from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
export default function Modal({open, close, item, headers}) {
    const dialog = useRef()

    const userInput = "Wish me a happy birthday"

    const [chatResponse, setChatResponse] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            dialog.current.showModal()
        } else {
            dialog.current.close()
        }
    }, [open])

    const handleSendMessage = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4", // or use "gpt-3.5-turbo"
                    messages: [{ role: "user", content: userInput }],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            setChatResponse(response.data.choices[0].message.content);
        } catch (error) {
            setChatResponse(`There was an error fetching the response -> ${error}`);
        } finally {
            setLoading(false);
        }
    };

    function zipArrays(arr1, arr2) {
        return arr1.map((element, index) => [element, arr2[index]])
    }

    let zippedValues = zipArrays(headers, Object.values(item)).slice(0, -1)
    let structureName = zippedValues.shift()[1]

    return createPortal(
        <dialog ref={dialog}>
            <div id="main">
            <section>
            <h2>Structure Analyzed: {structureName}</h2>
            </section>
            <section>
            <h3>Key Metrics</h3>
            <ul>
                {zippedValues.map((el, index) => <li key={index}>{el.join(': ')}</li>)}
            </ul>
            </section>
                <section>
                    <h3>Analysis</h3>
                    <div>{chatResponse}</div>
                </section>
                <section>
                    <button className="button primary squared" onClick={close}>Close</button>
                    <button onClick={handleSendMessage} disabled={loading}>
                        {loading ? "Loading..." : "Send"}
                    </button>
                </section>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}