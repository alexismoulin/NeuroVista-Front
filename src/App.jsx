import { useState } from 'react';
import Copyright from './components/Copyright/Copyright.jsx';
import Table from "./components/Table/Table.jsx";
import Intro from "./components/Intro/Intro.jsx";

import "./App.css"
import "./assets/css/main.css"
import "./assets/css/noscript.css"
import "./components/NavBar/NavBar.css"
import "./components/Content/Content.css"
import "./components/Intro/Intro.css"

import { aseg , brain, whiteMatter, lhsParcellation, rhsParcellation,
    brainStem, amygdala, hippocampus, thalamus, hypothalamus } from "./data/data.js"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function App() {
    const [type, setType] = useState("cortical")
    const [selectedData, setSelectedData] = useState(aseg)

    function handleDefaultType(defaultType) {
        if (defaultType === "cortical") {
            setType("cortical")
            setSelectedData(aseg)
        }
        else if (defaultType === "sub-cortical") {
            setType("sub-cortical")
            setSelectedData(brainStem)
        }
    }

    function corticalNavBar() {
        return (
            <ul className="links">
                <li className={selectedData.title === "General Segmentations" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(aseg)}>General Segmentations</a>
                </li>
                <li className={selectedData.title === "General Volumes" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(brain)}>General Volumes</a>
                </li>
                <li className={selectedData.title === "White Matter" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(whiteMatter)}>White Matter</a>
                </li>
                <li className={selectedData.title === "LHS Parcellations" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(lhsParcellation)}>LHS Parcellations</a>
                </li>
                <li className={selectedData.title === "RHS Parcellations" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(rhsParcellation)}>RHS Parcellations</a>
                </li>
            </ul>
        )
    }

    function subCorticalNavBar() {
        return (
            <ul className="links">
                <li className={selectedData.title === "Brain Stem" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(brainStem)}>Brain Stem</a>
                </li>
                <li className={selectedData.title === "Amygdala" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(amygdala)}>Amygdala</a>
                </li>
                <li className={selectedData.title === "Hippocampus" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(hippocampus)}>Hippocampus</a>
                </li>
                <li className={selectedData.title === "Thalamus" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(thalamus)}>Thalamus</a>
                </li>
                <li className={selectedData.title === "Hypothalamus" ? "active" : undefined}>
                    <a onClick={() => setSelectedData(hypothalamus)}>Hypothalamus</a>
                </li>
            </ul>
        )
    }

    return (
        <div id="wrapper">
            <Intro enabled={type} handleType={handleDefaultType} />
            <nav id="nav">
                {type === "cortical" ? corticalNavBar() : subCorticalNavBar()}
                <ul className="icons">
                    <FontAwesomeIcon icon={faEnvelope} />
                </ul>
            </nav>
            <div id="main">
                <h3>{selectedData.title}</h3>
                <Table {...selectedData}/>
            </div>
            <Copyright/>
        </div>
    )
}