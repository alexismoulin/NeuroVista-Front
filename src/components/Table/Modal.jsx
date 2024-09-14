import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {handleStream} from "../../util.js";

export default function Modal({open, close, item, headers, title}) {
    const dialog = useRef()

    function createPrompt(item) {
        const elements = zippedValues.map(el => el.join(': '))
        return "This is an MRI analysis of a patient brain. You need to analyse the measurements of the patient " + title + "\n" +
            `Structure analyzed: ${item.name}` + "\n" +
            elements.join('\n') + "\n" +
            "Please provide an analysis about those measurements"
    }

    useEffect(() => {
        if (open) {
            dialog.current.showModal()
        } else {
            dialog.current.close()
        }
    }, [open])

    function zipArrays(arr1, arr2) {
        return arr1.map((element, index) => [element, arr2[index]])
    }

    let zippedValues = zipArrays(headers, Object.values(item)).slice(0, -1)
    let structureName = zippedValues.shift()[1]

    const [responseText, setResponseText] = useState('');

    const handleSubmit = () => {
        handleStream(createPrompt(item), setResponseText); // Call the utility function
    };

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
                    <div className="gpt">{responseText || 'Waiting for response...'}</div>
                </section>
                <section>
                    <button className="button primary squared" onClick={close}>Close</button>
                    <button onClick={handleSubmit}>
                        Send
                    </button>
                </section>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}