import { useState } from 'react';
import Copyright from './components/Copyright/Copyright.jsx';
import Table from "./components/Table/Table.jsx";

import "./App.css"
import "./assets/css/main.css"
import "./assets/css/fontawesome-all.min.css"
import "./assets/css/noscript.css"
import "./components/NavBar/NavBar.css"
import "./components/Content/Content.css"
import "./components/Intro/Intro.css"

import { aseg , brain, whiteMatter, lhsParcellation, rhsParcellation,
    brainStem, amygdala, hippocampus, thalamus, hypothalamus } from "./data/data.js"


export default function App() {
    const [selectedType, setSelectedType] = useState(true)
    const [selectedData, setSelectedData] = useState(aseg);

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
            <div id="intro">
                <h1>Results Analysis</h1>
                <p>MRI Analysis Results for Patient Serie</p>
                <ul className="actions">
                    <li>
                        <a
                            className="button icon solid solo fa-solid fa-brain"
                            onClick={() => {
                                setSelectedType(true)
                                setSelectedData(aseg)
                            }}
                        />
                    </li>
                    <li></li>
                    <li>
                        <a
                            className="button icon solid solo fa-expand-alt"
                            onClick={() => {
                                setSelectedType(false)
                                setSelectedData(brainStem)
                            }}
                        />
                    </li>
                </ul>
            </div>
            <nav id="nav">
                {selectedType ? corticalNavBar() : subCorticalNavBar()}
                <ul className="icons">
                    <li><a href="#" className="icon brands fa-hospital-user"><span className="label">Twitter</span></a>
                    </li>
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