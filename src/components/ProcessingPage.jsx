import { useState } from "react";
import GridLoader from "react-spinners/GridLoader";

const override = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "#aaa",
};

export default function ProcessingPage({setPage}) {
    const [response, setResponse] = useState({dicom: false, nifti: false, recon: false, subs: false, json: false});
    const [loading, setLoading] = useState(true);
    return (
        <>
            <div id="intro">
                <h1>Processing Page</h1>
                <p>Your data are being processed by the server <i>(This may take several hours)</i></p>
            </div>
            <div id="main">
                <div className="row">
                    <h3>Total Progress: {Object.values(response).reduce((a, b) => a + b, 0)} / 5</h3>
                    <GridLoader
                        color="#aaa"
                        loading={loading}
                        cssOverride={override}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                    <ol>
                        <li>{response.dicom ? "Dicom upload completed" : "Dicom upload in Progress"}</li>
                        <li>{response.nifti ? "Nifti creation completed" : "Nifti creation in Progress"}</li>
                        <li>{response.recon ? "Brain reconstruction completed" : "Brain reconstruction in Progress (very long - can take up to 16h)"}</li>
                        <li>{response.subs ? "Extra subcortical segmentations completed" : "Extra subcortical segmentations in Progress"}</li>
                        <li>{response.json ? "Json files created" : "Json files in Progress"}</li>
                    </ol>
                </div>
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