import "./Table.css"
import LLMIcon from "../LLMIcon/LLMIcon.jsx";

/* eslint-disable react/prop-types */
export default function Table({headers, data}) {

    function twoRowsTable(item) {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.volume}</td>
                <td><LLMIcon /></td>
            </tr>
        )
    }

    function threeRowsTable(item) {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.lhs_volume}</td>
                <td>{item.rhs_volume}</td>
                <td><LLMIcon/></td>
            </tr>
        )
    }

    function fiveRowsTable(item) {
        return (
            <tr>
                <td>{item.StructName}</td>
                <td>{item.SurfArea}</td>
                <td>{item.GrayVol}</td>
                <td>{item.ThickAvg}</td>
                <td>{item.MeanCurv}</td>
                <td><LLMIcon/></td>
            </tr>
        )
    }

    function bodyTable(headers) {
        if (headers.length === 3) {
            return data.map(item => twoRowsTable(item))
        }
        else if (headers.length === 4) {
            return data.map(item => threeRowsTable(item))
        }
        else if (headers.length === 6) {
            return data.map(item => fiveRowsTable(item))
        }
    }


    return (
        <div className="table-wrapper">
        <table>
                <thead>
                <tr>
                {headers.map(header => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                { bodyTable(headers) }
                </tbody>
            </table>
        </div>
    );
}