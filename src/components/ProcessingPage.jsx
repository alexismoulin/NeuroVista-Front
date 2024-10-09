import { useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
import LoadingStep from "./LoadingStep";
import CompletedStep from "./CompletedStep";

export default function ProcessingPage({setPage, loadedData}) {
    const [response, setResponse] = useState({dicom: true, nifti: true, recon: false, subs: false, json: false});
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
                            {response.dicom ?
                            <CompletedStep stepText="Dicom upload Completed"/>:
                            <LoadingStep stepText="Dicom upload in Progress"/>}
                        </li>
                        <li>
                            {response.nifti ?
                            <CompletedStep stepText="Nifti creation completed"/>:
                            <LoadingStep stepText="Nifti creation in Progress"/>}
                        </li>
                        <li>
                            {response.recon ?
                            <CompletedStep stepText="Brain reconstruction completed"/>:
                            <LoadingStep stepText="Brain reconstruction in Progress (very long - can take up to 16h)"/>}
                        </li>
                        <li>{response.subs ? "Extra subcortical segmentations completed" : "Extra subcortical segmentations not started"}</li>
                        <li>{response.json ? "Json files created" : "Json files not started"}</li>
                    </ol>
                </div>
            </section>
            <div id="intro"></div>
            <section id="main">
                <h3>Information uploaded</h3>
                <p>{JSON.stringify(loadedData.form_data)}</p>
                <ol>
                    {loadedData.file_names.map((el, index) => (<li key={index}>{el}</li>))}
                </ol>
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