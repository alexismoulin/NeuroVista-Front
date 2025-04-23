import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";

export default function FailedStep({stepText}) {
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <p style={{color: "#e74c3c"}}>{stepText}</p>
            <FontAwesomeIcon icon={faCircleXmark} size="xl" color="#e74c3c"/>
        </div>
    )
}