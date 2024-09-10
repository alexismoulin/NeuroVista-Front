import {useState} from 'react'
import "./Table.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import Modal from "../Modal.jsx";

export default function Table({headers, data}) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    function showModal() {
        setModalIsOpen(true);
    }
    function dismissModal() {
        setModalIsOpen(false);
    }

    function tableRow(item) {
        return (
            <>
                <Modal open={modalIsOpen} close={dismissModal} item={item} />
                <tr>
                    {Object.values(item).map((el, index) => <td key={index}>{el}</td>)}
                    <td>
                        <button onClick={showModal}>
                            <FontAwesomeIcon icon={faRobot} size="xl"/>
                        </button>
                    </td>
                </tr>
            </>
        )
    }

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
                </thead>
                <tbody>{ data.map(item => tableRow(item)) }</tbody>
            </table>
        </div>
    );
}