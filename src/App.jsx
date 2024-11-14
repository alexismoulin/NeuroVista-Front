import { useState, useEffect } from 'react';

import Copyright from './components/Reusable/Copyright.jsx';
import MainPage from "./components/Main/MainPage.jsx";
import ResultsPage from "./components/Results/ResultsPage.jsx";
import LargeResultsPage from "./components/Results/LargeResultsPage.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";
import ProcessingPage from "./components/Processing/ProcessingPage.jsx";

const SERVER_URL = "http://127.0.0.1:5001"
import { initializeData } from "./helpers/data.js"

export default function App() {
    const [type, setType] = useState("cortical")
    const [data, setData] = useState(null);
    const [selectedData, setSelectedData] = useState(null)
    const [page, setPage] = useState("landing")
    const [selectedItem, setSelectedItem] = useState()
    const [loadedData, setLoadedData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const result = await initializeData();
            setData(result);
            setSelectedData(result.aseg);
            console.log(result);
        };

        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;

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
                return <LandingPage setPage={setPage} serverUrl={SERVER_URL} />
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
        <div>
            {renderSwitch(page)}
        </div>
    )
}