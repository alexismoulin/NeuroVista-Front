import { useState } from 'react';

import Copyright from './components/Main/Copyright.jsx';
import MainPage from "./components/Main/MainPage.jsx";
import ResultsPage from "./components/Results/ResultsPage.jsx";
import LargeResultsPage from "./components/Results/LargeResultsPage.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";

import "./App.css"
import "./assets/css/main.css"
import "./assets/css/noscript.css"
import "./assets/css/intro.css"
import "./assets/css/icon.css"
import "./assets/css/image.css"
import "./assets/css/button.css"
import "./assets/css/copyright.css"
import "./assets/css/input.css"

import { data } from "./data/data.js"
import ProcessingPage from "./components/Processing/ProcessingPage.jsx";

export default function App() {
    const [type, setType] = useState("cortical")
    const [selectedData, setSelectedData] = useState(data.aseg)
    const [page, setPage] = useState("landing")
    const [selectedItem, setSelectedItem] = useState()
    const [loadedData, setLoadedData] = useState()

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

    function renderSwitch(param) {
        switch(param) {
            case "landing":
                return <LandingPage setPage={setPage} setLoadedData={setLoadedData} />
            case "processing":
                return <ProcessingPage setPage={setPage} loadedData={loadedData} />
            case "main":
                return <MainPage
                    type={type}
                    selectedData={selectedData}
                    handleDefaultType={handleDefaultType}
                    handleSelectedData={handleSelectedData}
                    setPage={setPage}
                    setSelectedItem={setSelectedItem}
                />
            case "results":
                return <ResultsPage
                    headers={selectedData.headers}
                    title={selectedData.title}
                    item={selectedItem}
                    setPage={setPage}
                    setSelectedItem={setSelectedItem}
                />
            case "large-results":
                return <LargeResultsPage setPage={setPage} data={selectedData} />
            default:
                return 'foo';
        }
    }

    return (
        <div id="wrapper">
            {renderSwitch(page)}
            <Copyright/>
        </div>
    )
}