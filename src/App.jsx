import { useState } from "react";

import MainPage from "./components/KPI/MainPage.jsx";
import LargeResultsPage from "./components/Results/LargeResultsPage.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";
import ProcessingPage from "./components/Processing/ProcessingPage.jsx";

import DataContextProvider from "./store/store.jsx";
import Viewer from "./components/Viewer/Viewer.jsx";

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
            case "viewer":
                return <Viewer setPage={setPage} />
            case "analyze":
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