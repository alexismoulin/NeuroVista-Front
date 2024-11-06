import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";

export default function TableRow({ item, headers, setPage, setSelectedItem }) {

    function handlePage() {
        setPage("results");
        setSelectedItem(item);
    }

    return (
        <tr>
            {headers.map((header, index) => (
                header === "Analysis" ? (
                    <td key={index}>
                        <button onClick={handlePage}>
                            <FontAwesomeIcon icon={faRobot} size="xl"/>
                        </button>
                    </td>
                ) : (
                    <td key={index}>{item[header]}</td>
                )
            ))}
        </tr>
    );
}