import {useEffect} from "react";
import Intro from "./Intro.jsx";
import NavBar from "./NavBar.jsx";
import Table from "./Table.jsx";
import Copyright from "../Reusable/Copyright.jsx";
import Top from "./Top.jsx";

export default function MainPage({type, handleDefaultType, selectedData, handleSelectedData, 
    series, selectedSeries, setSelectedSeries, setPage, setSelectedItem}) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function handleLargePage() {
        setPage("large-results")
    }

    return (
        <div className="bg-basic flex flex-col items-center">
            <Intro enabled={type} handleType={handleDefaultType}/>
            <NavBar selectedType={type} selectedData={selectedData} setSelectedData={handleSelectedData}/>
            <Top selectedData={selectedData} series={series} selectedSeries={selectedSeries} setSelectedSeries={setSelectedSeries} handleLargePage={handleLargePage}/>
            <Table {...selectedData} setPage={setPage} setSelectedItem={setSelectedItem}/>
            <Copyright />
        </div>
    )
}