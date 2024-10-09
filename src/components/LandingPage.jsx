import Header from "./Header.jsx";
import Infos from "./Infos.jsx";
import MRIUploadForm from "./MRIUploadForm.jsx";

import styles from "../assets/css/landing.module.css"

export default function LandingPage({ setPage, setLoadedData }) {
    return (
        <div>
            <Header setPage={setPage} styles={styles} />
            <MRIUploadForm setPage={setPage} styles={styles} setLoadedData={setLoadedData}/>
            <Infos styles={styles} />
        </div>
    )
}