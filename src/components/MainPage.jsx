import Intro from "./Intro/Intro.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import Table from "./Table/Table.jsx";

export default function MainPage({type, handleDefaultType, selectedData, handleSelectedData, setPage, setSelectedItem}) {
    return (
        <>
            <Intro enabled={type} handleType={handleDefaultType} />
            <NavBar selectedType={type} selectedData={selectedData} setSelectedData={handleSelectedData} />
            <div id="main">
                <h3>{selectedData.title}</h3>
                <Table {...selectedData} setPage={setPage} setSelectedItem={setSelectedItem} />
            </div>
        </>
    )
}