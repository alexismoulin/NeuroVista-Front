import {useState, useEffect} from 'react';
import {handleStream} from "../../helpers/util.js";
import PrimaryButton from "../Reusable/PrimaryButton.jsx";
import Copyright from "../Reusable/Copyright.jsx";
import MarkdownRenderer from "../Main/MarkdownRenderer.jsx";

export default function LargeResultsPage({setPage, data}) {

    const age = 40
    const sex = "Male"

    function createPrompt(data, sex, age) {
        // Convert the object to a Markdown unordered list
        const markdownList = data.data.map(el => Object.entries(el)
            .map(([key, value]) => `- **${key}**: ${value}`)
            .join("\n"));

        return `
            This is an MRI analysis of a patient brain. The patient is a ${sex} of ${age} years old.
            You need to analyze the measurements of the patient ${data.title}.
            The measurements of the ${data.title} are :
            ${markdownList}
            
            Please provide an analysis about those measurements and return this analysis in a Markdown format.
            `.trim(); // `.trim()` ensures no extra whitespace at the start or end.
    }

    const [responseText, setResponseText] = useState("");

    /*
    useEffect(() => {
        handleStream(createPrompt(), setResponseText); // Call the utility function
    }, []);
    */

    function handleClose() {
        setResponseText("")
        setPage("main")
    }

    console.log(data)

    return (
        <div className="bg-basic flex flex-col items-center">
            <section className="flex items-center flex-col pt-24 pb-12 mb-4 w-full">
                <h1 className="text-white text-7xl tracking-wider uppercase font-bold font-opensans mb-8">{data.title} Analysis</h1>
                <p className="text-white font-merriweather text-xl mb-8">Full Analysis</p>
            </section>
            <div className="bg-white w-11/12">
                <section className="border-b-2">
                    <h3 className="font-opensans uppercase text-slatey p-6">Key Metrics</h3>
                    <ul className="list-disc px-10 pb-6">
                        <li className="font-merriweather text-slatey">Sex: {sex}</li>
                        <li className="font-merriweather text-slatey">Age: {age}</li>
                    </ul>
                </section>
                <section className="border-b-2">
                    <h3 className="font-opensans uppercase text-slatey pt-6 px-6">Analysis</h3>
                    <div className="p-6 font-merriweather text-slatey">
                        <MarkdownRenderer markdown={createPrompt(data, sex, age)}/>
                    </div>
                </section>
                <section className="flex justify-end p-6">
                    <PrimaryButton onClick={handleClose}>Close</PrimaryButton>
                </section>
            </div>
            <Copyright/>
        </div>
    )
}