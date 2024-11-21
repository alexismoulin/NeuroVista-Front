import {useState, useEffect} from 'react';
import {handleStream} from "../../helpers/util.js";
import PrimaryButton from "../Reusable/PrimaryButton.jsx";
import Copyright from "../Reusable/Copyright.jsx";
import MarkdownRenderer from "../Main/MarkdownRenderer.jsx";

export default function LargeResultsPage({setPage, data}) {

    const age = 40
    const sex = "Male"

    function createPrompt(data, sex, age) {
        // Loop through each item in the data array and create Markdown for its details
        const markdownList = data.data
            .map(item => {
                // Exclude 'Structure' from the key-value details
                const details = Object.entries(item)
                    .filter(([key]) => key !== "Structure") // Exclude 'Structure'
                    .map(([key, value]) => `  - **${key}**: ${value}`)
                    .join("\n");
                return `- **Structure**: ${item.Structure || "Unknown"}\n${details}`;
            })
            .join("\n\n");

        return `
            This is an MRI analysis of a patient brain. The patient is a ${sex} of ${age} years old.
            You need to analyze the measurements of the patient ${data.title}.
            The following sub-structures were analyzed:
            
            ${markdownList}
            
            Please provide an analysis of these measurements and return this analysis in a Markdown format.`.trim();
    }

    const [responseText, setResponseText] = useState("");


    useEffect(() => {
        handleStream(createPrompt(data, sex, age), setResponseText); // Call the utility function
    }, [data, sex, age]);

    function handleClose() {
        setResponseText("")
        setPage("main")
    }

    console.log(data)

    return (
        <div className="bg-basic flex flex-col items-center">
            <section className="flex items-center flex-col pt-24 pb-12 mb-4 w-full">
                <h1 className="text-white text-7xl tracking-wider uppercase font-bold font-opensans mb-8"
                    aria-label={`${data.title} Analysis`}>
                    {data.title} Analysis
                </h1>
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
                        <MarkdownRenderer markdown={responseText}/>
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