import Header from "./Header.jsx";
import Infos from "./Infos.jsx";
import MRIUploadForm from "./MRIUploadForm.jsx";

import styles from "../assets/css/landing.module.css"

export default function LandingPage({ setPage }) {
    return (
        <div>
            <Header setPage={setPage} styles={styles} />
            <MRIUploadForm setPage={setPage} styles={styles}/>
            <Infos styles={styles} />
        </div>
    )
}