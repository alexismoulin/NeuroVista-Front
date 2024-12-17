import { useState, useEffect } from 'react';

import MainPage from "./components/Main/MainPage.jsx";
import ResultsPage from "./components/Results/ResultsPage.jsx";
import LargeResultsPage from "./components/Results/LargeResultsPage.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";
import ProcessingPage from "./components/Processing/ProcessingPage.jsx";

import { initializeData, get_series, SERVER_URL } from "./helpers/data.js"
import DataContextProvider from "./store/store.jsx";

export default function App() {
    const [type, setType] = useState("cortical")
    const [data, setData] = useState(null);
    const [series, setSeries] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState("AVERAGES")
    const [selectedData, setSelectedData] = useState(null)
    const [page, setPage] = useState("landing")
    const [selectedItem, setSelectedItem] = useState()
    const [noData, setNoData] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await initializeData(selectedSeries);
                if (result) {
                    setData(result);
                    setSelectedData(result.aseg);
                    console.log("Data correctly loaded")
                } else {
                    setNoData(true);
                    console.log("No data loaded")
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setNoData(true);
            }
        };

        const fetchSeries = async () => {
            try {
                const result = await get_series(SERVER_URL);
                if (result) {
                    setSeries(result);
                    console.log("series correctly loaded")
                } else {
                    console.log("No series loaded")
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setNoData(true);
            }
        }
        fetchData()
        fetchSeries()
    }, [selectedSeries]);

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
                return <LandingPage setPage={setPage} serverUrl={SERVER_URL} noData={noData} />
            case "processing":
                return <ProcessingPage setPage={setPage} />
            case "main":
                return <MainPage
                    type={type}
                    selectedData={selectedData}
                    handleDefaultType={handleDefaultType}
                    handleSelectedData={handleSelectedData}
                    series={series}
                    selectedSeries = {selectedSeries}
                    setSelectedSeries = {setSelectedSeries}
                    setPage={setPage}
                    setSelectedItem={setSelectedItem}
                />
            case "results":
                return <ResultsPage
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
        <DataContextProvider>
            {renderSwitch(page)}
        </DataContextProvider>
    )
}