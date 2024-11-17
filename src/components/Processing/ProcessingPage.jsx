import { useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
import LoadingStep from "./LoadingStep.jsx";
import CompletedStep from "./CompletedStep.jsx";
import Copyright from "../Reusable/Copyright.jsx";

export default function ProcessingPage({ setPage }) {
    const [response, setResponse] = useState({dicom: false, nifti: false, recon: false, subs: false, json: false});
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
                    <h3 className="font-opensans uppercase text-slatey text-xl m-6">Total Progress: {Object.values(response).reduce((a, b) => a + b, 0)} / 5</h3>
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
                    <ol className="list-decimal p-4 text-slatey font-merriweather border-b-2">
                        <li>
                            {
                                response.dicom ?
                                    <CompletedStep stepText="Dicom upload Completed"/> :
                                    <LoadingStep stepText="Dicom upload in Progress"/>
                            }
                        </li>
                        <li>
                            {
                                response.nifti ?
                                    <CompletedStep stepText="Nifti creation completed"/> :
                                    <LoadingStep stepText="Nifti creation in Progress"/>
                            }
                        </li>
                        <li>
                            {
                                response.recon ?
                                    <CompletedStep stepText="Brain reconstruction completed"/> :
                                    <LoadingStep
                                        stepText="Brain reconstruction in Progress (very long - can take up to 16h)"/>
                            }
                        </li>
                        <li>
                            {
                                response.subs ?
                                    <CompletedStep stepText="Extra subcortical segmentations completed"/> :
                                    <LoadingStep
                                        stepText="Extra subcortical segmentations in Progress (takes up to 1h)"/>
                            }
                        </li>
                        <li>
                            {
                                response.json ?
                                    <CompletedStep stepText="Json files created"/> :
                                    <LoadingStep
                                        stepText="Json files in Progress"/>
                            }
                        </li>
                    </ol>
                </div>
                <button onClick={() => {
                    setPage("main")
                }}>Main Page
                </button>
            </section>
            <Copyright/>
        </div>
    )
}