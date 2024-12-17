import { useState } from "react";

import MainPage from "./components/Main/MainPage.jsx";
import ResultsPage from "./components/Results/ResultsPage.jsx";
import LargeResultsPage from "./components/Results/LargeResultsPage.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";
import ProcessingPage from "./components/Processing/ProcessingPage.jsx";

import DataContextProvider from "./store/store.jsx";

export default function App() {
    const [page, setPage] = useState("landing");

    // Render different pages
    function renderSwitch(param) {
        switch (param) {
            case "landing":
                return <LandingPage setPage={setPage} />;
            case "processing":
                return <ProcessingPage setPage={setPage} />;
            case "main":
                return <MainPage setPage={setPage} />;
            case "results":
                return <ResultsPage setPage={setPage} />;
            case "large-results":
                return <LargeResultsPage setPage={setPage} />;
            default:
                return "foo";
        }
    }

    return (
        <DataContextProvider>
            {renderSwitch(page)}
        </DataContextProvider>
    );
}