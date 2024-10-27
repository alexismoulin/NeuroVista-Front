import { useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
import LoadingStep from "./LoadingStep.jsx";
import CompletedStep from "./CompletedStep.jsx";

export default function ProcessingPage({setPage, loadedData}) {
    const [response, setResponse] = useState({dicom: false, nifti: false, recon: false, subs: false, json: false});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <header id="intro">
                <h1>Processing Page</h1>
                <p>Your data are being processed by the server <i>(This may take several hours)</i></p>
            </header>

            <section id="main">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3>Total Progress: {Object.values(response).reduce((a, b) => a + b, 0)} / 5</h3>
                    <GridLoader
                        color="#aaa"
                        loading={loading}
                        size={10}
                        data-testid="loader"
                    />
                </div>
                <div>
                    <ol>
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
            </section>

            <div id="intro">
                <ul className="actions">
                    <li>
                        <button onClick={() => {
                            setPage("main")
                        }}>
                            Main Page
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}