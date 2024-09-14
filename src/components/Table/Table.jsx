import "./Table.css"
import TableRow from "./TableRow.jsx";

export default function Table({headers, title, data}) {

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
                </thead>
                <tbody>
                    { data.map((item, index) => <TableRow key={index} item={item} headers={headers} title={title} /> ) }
                </tbody>
            </table>
        </div>
    );
}