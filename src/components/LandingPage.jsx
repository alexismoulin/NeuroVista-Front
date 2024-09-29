import Header from "./Header.jsx";
import Infos from "./Infos.jsx";
import MRIUploadForm from "./MRIUploadForm.jsx";

import "../assets/css/landing.css"

export default function LandingPage({ setPage }) {
    return (
        <div>
            <Header setPage={setPage} />
            <MRIUploadForm />
            <Infos />
        </div>
    )
}