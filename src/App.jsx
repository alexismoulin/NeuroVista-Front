import { useState } from 'react';
import Copyright from './components/Copyright/Copyright.jsx';
import Table from "./components/Table/Table.jsx";
import Intro from "./components/Intro/Intro.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

import "./App.css"
import "./assets/css/main.css"
import "./assets/css/noscript.css"
import "./assets/css/icon.css"
import "./assets/css/image.css"
import "./assets/css/button.css"

import { data } from "./data/data.js"

export default function App() {
    const [type, setType] = useState("cortical")
    const [selectedData, setSelectedData] = useState(data.aseg)

    function handleDefaultType(defaultType) {
        if (defaultType === "cortical") {
            setType("cortical")
            setSelectedData(data.aseg)
        }
        else if (defaultType === "sub-cortical") {
            setType("sub-cortical")
            setSelectedData(data.brainStem)
        }
    }

    function handleSelectedData(selection) {
        setSelectedData(data[selection])
    }

    return (
        <div id="wrapper">
            <Intro enabled={type} handleType={handleDefaultType} />
            <NavBar selectedType={type} selectedData={selectedData} setSelectedData={handleSelectedData} />
            <div id="main">
                <h3>{selectedData.title}</h3>
                <Table {...selectedData}/>
            </div>
            <Copyright/>
        </div>
    )
}