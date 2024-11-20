import { useState } from "react"

import Header from "./Header.jsx";
import Infos from "./Infos.jsx";
import MRIUploadForm from "./MRIUploadForm.jsx";
import Copyright from "../Reusable/Copyright.jsx";

export default function LandingPage({ setPage, serverUrl, noData }) {

    const [showForm, setShowForm] = useState(false)

    return (
        <div className="bg-basic">
            <Header setPage={setPage} setShowForm={setShowForm} noData={noData} />
            {showForm && <MRIUploadForm setPage={setPage} serverUrl={serverUrl} />}
            <Infos />
            <Copyright />
        </div>
    )
}