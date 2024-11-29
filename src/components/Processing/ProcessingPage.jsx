import { useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
import LoadingStep from "./LoadingStep.jsx";
import CompletedStep from "./CompletedStep.jsx";
import Copyright from "../Reusable/Copyright.jsx";
import PrimaryButton from "../Reusable/PrimaryButton.jsx";

export default function ProcessingPage({ setPage }) {

    const steps = [
        { key: "dicom", completedText: "Dicom upload Completed", loadingText: "Dicom upload in Progress" },
        { key: "nifti", completedText: "Nifti creation completed", loadingText: "Nifti creation in Progress" },
        { key: "recon", completedText: "Brain reconstruction completed", loadingText: "Brain reconstruction in Progress (very long - can take up to 16h)" },
        { key: "lesions", completedText: "Potential lesions analysis completed", loadingText: "Potential lesions analysis in Progress" },
        { key: "subs1", completedText: "Subcortical segmentations completed (1/2)", loadingText: "Subcortical segmentations in Progress (1/2)" },
        { key: "subs2", completedText: "Subcortical segmentations completed (2/2)", loadingText: "Subcortical segmentations in Progress (2/2)" },
        { key: "json", completedText: "Json files created", loadingText: "Json files in Progress" },
    ];

    const [response, setResponse] = useState({dicom: true, nifti: false, recon: false, lesions: false, subs1: false, subs2: false, json: false});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="bg-basic flex flex-col items-center">
            <section className="flex items-center flex-col pt-24 pb-12 mb-4 w-full">
                <h1 className="text-white text-7xl tracking-wider uppercase font-bold font-opensans mb-8">Processing
                    Page</h1>
                <p className="text-white font-merriweather text-xl mb-8">Your data are being processed by the server <i>(This
                    may take several hours)</i></p>
            </section>

            <section className="bg-white w-11/12">
                <div className="flex justify-between items-center border-b-2">
                    <h3 className="font-opensans uppercase text-slatey text-xl m-6">Total Progress: {Object.values(response).reduce((a, b) => a + b, 0)} / 7</h3>
                    <div className="m-6">
                        <GridLoader
                            color="#aaa"
                            loading={loading}
                            size={10}
                            data-testid="loader"
                        />
                    </div>
                </div>
                <div>
                    <ol className="list-decimal text-slatey font-merriweather border-b-2 my-4">
                        {steps.map(({ key, completedText, loadingText }) => (
                            <li key={key} className="my-4 mx-8">
                                {response[key] ? (
                                <CompletedStep stepText={completedText} />
                                ) : (
                                <LoadingStep stepText={loadingText} />
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex justify-center p-6">
                    <PrimaryButton onClick={() => {setPage("main")}} /*disabled={!response.json}*/>Proceed</PrimaryButton>
                </div>
            </section>
            <Copyright/>
        </div>
    )
}