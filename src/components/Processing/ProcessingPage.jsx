import { useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
import LoadingStep from "./LoadingStep.jsx";
import CompletedStep from "./CompletedStep.jsx";
import FailedStep from "./FailedStep.jsx";
import Copyright from "../Reusable/Copyright.jsx";
import PrimaryButton from "../Reusable/PrimaryButton.jsx";
import { SERVER_URL } from "../../helpers/data.js";

export default function ProcessingPage({ setPage }) {
    const steps = [
        { key: "dicom", completedText: "Dicom upload Completed", loadingText: "Dicom upload in Progress" },
        { key: "nifti", completedText: "Nifti creation completed", loadingText: "Nifti creation in Progress" },
        { key: "recon", completedText: "Brain reconstruction completed", loadingText: "Brain reconstruction in Progress (very long - can take up to 16h)" },
        { key: "lesions", completedText: "Potential lesions analysis completed", loadingText: "Potential lesions analysis in Progress" },
        { key: "subs1", completedText: "Subcortical segmentations completed", loadingText: "Subcortical segmentations in Progress" },
        { key: "subs2", completedText: "Extra segmentations completed", loadingText: "Extra segmentations in Progress" },
        { key: "json", completedText: "Json files created", loadingText: "Json files in Progress" },
        { key: "corestats", completedText: "Statistics created", loadingText: "Statistics in Progress" }
    ];

    const failedSteps = [
        { key: "failed_dicom", completedText: "Dicom upload failed" },
        { key: "failed_nifti", completedText: "Nifti creation failed" },
        { key: "failed_recon", completedText: "Brain reconstruction failed" },
        { key: "failed_lesions", completedText: "Potential lesions analysis failed" },
        { key: "failed_subs1", completedText: "Subcortical segmentations failed" },
        { key: "failed_subs2", completedText: "Extra segmentations failed" },
        { key: "failed_json", completedText: "Json files creation failed" },
        { key: "failed_corestats", completedText: "Statistics creation failed" }
    ];

    // Track successful step completions.
    const [response, setResponse] = useState({
        dicom: false,
        nifti: false,
        recon: false,
        lesions: false,
        subs1: false,
        subs2: false,
        json: false,
        corestats: false
    });

    // Track steps that have failed.
    const [failedResponse, setFailedResponse] = useState({
        failed_dicom: false,
        failed_nifti: false,
        failed_recon: false,
        failed_lesions: false,
        failed_subs1: false,
        failed_subs2: false,
        failed_json: false,
        failed_corestats: false
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Create an EventSource to listen to server-sent events from /stream
        const eventSource = new EventSource(`${SERVER_URL}/stream`);

        eventSource.onmessage = (event) => {
            console.log("SSE event received:", event.data);
            const stepKey = event.data;

            // If the stepKey starts with "failed_", update the failedResponse state.
            if (stepKey.startsWith("failed_")) {
                setFailedResponse((prev) => ({
                    ...prev,
                    [stepKey]: true
                }));
            } else {
                // Otherwise, mark the successful completion of the step.
                setResponse((prev) => ({
                    ...prev,
                    [stepKey]: true
                }));
            }
        };

        // Clean up the event source when the component unmounts.
        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        // Stop the loading spinner when all steps have completed successfully,
        // or if any failure has been reported.
        const successDone = Object.values(response).every(Boolean);
        const failureOccurred = Object.values(failedResponse).some(Boolean);
        if (successDone || failureOccurred) {
            setLoading(false);
        }
    }, [response, failedResponse]);

    return (
        <div className="bg-basic flex flex-col items-center">
            <section className="flex items-center flex-col pt-24 pb-12 mb-4 w-full">
                <h1 className="text-white text-7xl tracking-wider uppercase font-bold font-opensans mb-8">
                    Processing Page
                </h1>
                <p className="text-white font-merriweather text-xl mb-8">
                    Your data are being processed by the server <i>(This may take several hours)</i>
                </p>
            </section>

            <section className="bg-white w-11/12">
                <div className="flex justify-between items-center border-b-2">
                    <h3 className="font-opensans uppercase text-slatey text-xl m-6">
                        Total Progress: {Object.values(response).reduce((a, b) => a + (b ? 1 : 0), 0)} / {steps.length}
                    </h3>
                    <div className="m-6">
                        <GridLoader color="#aaa" loading={loading} size={10} data-testid="loader"/>
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
                <div className="border-t-2 mt-4 p-4">
                    <h3 className="font-opensans uppercase text-slatey text-xl m-6">
                        Failed Steps
                    </h3>
                    <ol className="list-decimal text-slatey font-merriweather my-4">
                        {failedSteps.map(({ key, completedText }) => (
                            failedResponse[key] && (
                                <li key={key} className="my-4 mx-8">
                                    <FailedStep stepText={completedText} />
                                </li>
                            )
                        ))}
                    </ol>
                </div>
                <div className="flex justify-center p-6">
                    <PrimaryButton
                        onClick={() => setPage("main")}
                        // Enable the button if either the json step has completed successfully or if the json step failed.
                        disabled={!(response.json || failedResponse.failed_json)}
                    >
                        Proceed
                    </PrimaryButton>
                </div>
            </section>
            <Copyright/>
        </div>
    );
}
