import {useState, useEffect} from 'react';
import {handleStream} from "../util.js";
import ReactMarkdown from 'react-markdown';

export default function LargeResultsPage({setPage, data}) {

    const age = 40
    const sex = "Male"

    function zipArrays(arr1, arr2) {
        return arr1.map((element, index) => [element, arr2[index]])
    }

    function createPrompt() {
        const elements = data.data.map(el => zipArrays(data.headers.slice(0, -1), Object.values(el)))
        const formattedElements = elements.map(el => el.join(" - ")).map(el => el.replaceAll(",", ": "))
        return `This is an MRI analysis of a patient brain. The patient is a ${sex} of ${age} years old.` + "\n" +
            "You need to analyse the measurements of the patient " + data.title + "\n" +
            `The measurements of the ${data.title} sub-structures are:` + "\n" +
            formattedElements.join('\n') + "\n" +
            "Please provide an analysis about those measurements"
    }

    const [responseText, setResponseText] = useState("");

    useEffect(() => {
        handleStream(createPrompt(), setResponseText); // Call the utility function
    }, []);

    function handleClose() {
        setResponseText("")
        setPage("main")
    }

    return (
        <>
            <div id="intro">
                <h1>{data.title} Analysis</h1>
                <p>Full Analysis</p>
            </div>
            <div id="main">
                <section>
                    <h3>Key Metrics</h3>
                    <ul>
                        <li>Sex: {sex}</li>
                        <li>Age: {age}</li>
                    </ul>
                </section>
                <section>
                    <h3>Analysis</h3>
                    <ReactMarkdown>{responseText}</ReactMarkdown>
                </section>
                <section>
                    <button className="button primary squared" onClick={handleClose}>Close</button>
                </section>
            </div>
        </>
    )
}