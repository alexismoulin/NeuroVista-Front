import "./Table.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function Table({headers, data}) {

    function twoRowsTable(item) {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.volume}</td>
                <td><FontAwesomeIcon icon={faRobot} size="xl"/></td>
            </tr>
        )
    }

    function threeRowsTable(item) {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.lhs_volume}</td>
                <td>{item.rhs_volume}</td>
                <td><FontAwesomeIcon icon={faRobot} size="xl"/></td>
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
                <td><FontAwesomeIcon icon={faRobot} size="xl"/></td>
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