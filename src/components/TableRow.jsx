import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";

export default function TableRow({item, setPage, setSelectedItem}) {

    function handlePage() {
        setPage("results")
        setSelectedItem(item)
    }

    return (
        <tr>
            {Object.values(item).map((el, index) => <td key={index}>{el}</td>)}
            <td>
                <button onClick={handlePage}>
                    <FontAwesomeIcon icon={faRobot} size="xl"/>
                </button>
            </td>
        </tr>
    )
}