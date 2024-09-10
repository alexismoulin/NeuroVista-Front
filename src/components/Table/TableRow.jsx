import Modal from "./Modal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function TableRow({item, headers}) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    function showModal() {
        setModalIsOpen(true);
    }
    function dismissModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            <Modal open={modalIsOpen} close={dismissModal} item={item} headers={headers} />
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