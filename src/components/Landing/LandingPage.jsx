import {useState} from "react"

import Header from "./Header.jsx";
import Infos from "./Infos.jsx";
import MRIUploadForm from "./MRIUploadForm.jsx";

import styles from "../../assets/css/landing.module.css"

export default function LandingPage({ setPage, setLoadedData }) {

    const [showForm, setShowForm] = useState(false)

    return (
        <div>
            <Header setPage={setPage} setShowForm={setShowForm}/>
            {showForm && <MRIUploadForm setPage={setPage} styles={styles} setLoadedData={setLoadedData}/>}
            <Infos styles={styles} />
        </div>
    )
}