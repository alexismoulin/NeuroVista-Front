import Intro from "./Intro/Intro.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import Table from "./Table/Table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";

export default function MainPage({type, handleDefaultType, selectedData, handleSelectedData, setPage, setSelectedItem}) {
    return (
        <>
            <Intro enabled={type} handleType={handleDefaultType} />
            <NavBar selectedType={type} selectedData={selectedData} setSelectedData={handleSelectedData} />
            <div id="main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h3 style={{ margin: 0 }}>{selectedData.title}</h3>
                    <button className="top" onClick={() => {}}>
                        <FontAwesomeIcon icon={faRobot} size="xl"/>
                    </button>
                </div>
                <Table {...selectedData} setPage={setPage} setSelectedItem={setSelectedItem}/>
            </div>
        </>
    )
}