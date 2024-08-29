import NavBar from "../NavBar/NavBar.jsx";
import Table from "../Table/Table.jsx";
import "./Content.css"

export default function Content({data, title, headers, onClick}) {
    return (
        <div>
            <NavBar title={title} onClick={onClick} />
            <div id="main">
                <h3>{title}</h3>
                <Table data={data} headers={headers} onClick={onClick} />
            </div>
        </div>
    )
}