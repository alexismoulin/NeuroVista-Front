import {useEffect} from "react";
import Intro from "./Intro.jsx";
import NavBar from "./NavBar.jsx";
import Table from "./Table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import Copyright from "../Reusable/Copyright.jsx";

export default function MainPage({type, handleDefaultType, selectedData, handleSelectedData, setPage, setSelectedItem}) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function handleLargePage() {
        setPage("large-results")
    }

    return (
        <div className="bg-basic">
            <Intro enabled={type} handleType={handleDefaultType}/>
            <NavBar selectedType={type} selectedData={selectedData} setSelectedData={handleSelectedData}/>
            <div id="main">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <h3 style={{margin: 0}}>{selectedData.title}</h3>
                    <button className="top" onClick={handleLargePage}>
                        <FontAwesomeIcon icon={faRobot} size="xl"/>
                    </button>
                </div>
                <Table {...selectedData} setPage={setPage} setSelectedItem={setSelectedItem}/>
            </div>
            <Copyright />
        </div>
    )
}