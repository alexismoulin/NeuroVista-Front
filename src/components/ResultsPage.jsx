import {useState, useEffect} from 'react';
import {handleStream} from "../util.js";

export default function ResultsPage({item, headers, title, setPage, setSelectedItem}) {

    const age = 40
    const sex = "Male"

    function createPrompt(item) {
        const elements = zippedValues.map(el => el.join(': '))
        return `This is an MRI analysis of a patient brain. The patient is a ${sex} of ${age} years old.` + "\n" +
            "You need to analyse the measurements of the patient " + title + "\n" +
            `The ${title} sub-structure analyzed is: ${item.name}` + "\n" +
            `The measurements of the ${item.name} are:` + "\n" +
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
                <p>Structure Analyzed: <b>{structureName}</b></p>
            </div>
            <div id="main">
                <section>
                    <h3>Key Metrics</h3>
                    <ul>
                        <li>Sex: {sex}</li>
                        <li>Age: {age}</li>
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