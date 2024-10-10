import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export default function CompletedStep({stepText}) {
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <p style={{color: "#2ecc71"}}>{stepText}</p>
            <FontAwesomeIcon icon={faCheck} size="xl" color="#2ecc71"/>
        </div>
    )
}