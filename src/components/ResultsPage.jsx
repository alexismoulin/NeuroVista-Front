import {useState, useEffect} from 'react';
import {handleStream} from "../util.js";

export default function ResultsPage({item, headers, title, setPage, setSelectedItem}) {

    function createPrompt(item) {
        const elements = zippedValues.map(el => el.join(': '))
        return "This is an MRI analysis of a patient brain. You need to analyse the measurements of the patient " + title + "\n" +
            `Structure analyzed: ${item.name}` + "\n" +
            elements.join('\n') + "\n" +
            "Please provide an analysis about those measurements"
    }

    function zipArrays(arr1, arr2) {
        return arr1.map((element, index) => [element, arr2[index]])
    }

    let zippedValues = zipArrays(headers, Object.values(item)).slice(0, -1)
    let structureName = zippedValues.shift()[1]

    const [responseText, setResponseText] = useState('');

    useEffect(() => {
        handleStream(createPrompt(item), setResponseText); // Call the utility function
    }, []);

    function handleClose() {
        setResponseText('')
        setPage("main")
        setSelectedItem(undefined)
    }

    return (
        <>
            <div id="intro">
                <h1>{title} Analysis</h1>
                <p>Structure Analyzed: {structureName}</p>
            </div>
            <div id="main">
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
                    <button className="button primary squared" onClick={handleClose}>Close</button>
                </section>
            </div>
        </>
    )
}