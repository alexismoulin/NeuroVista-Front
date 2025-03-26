import {useEffect} from "react";
import Intro from "./Intro.jsx";
import NavBar from "./NavBar.jsx";
import Table from "./Table.jsx";
import Copyright from "../Reusable/Copyright.jsx";
import Top from "./Top.jsx";
import Dashboard from "./Dashboard.jsx";

export default function MainPage({setPage}) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function handleLargePage() {
        setPage("large-results")
    }

    return (
        <div className="bg-basic flex flex-col items-center">
            <Intro />
            <NavBar />
            <Top handleLargePage={handleLargePage} />
            <Dashboard />
            <Table />
            <Copyright />
        </div>
    )
}