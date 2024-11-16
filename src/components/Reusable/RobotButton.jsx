import {faRobot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function RobotButton({...props}) {
    return (
        <button
            className="px-4 py-2 text-slatey border-slatey border-2 rounded-full hover:text-tahiti hover:border-tahiti"
            {...props}
        >
            <FontAwesomeIcon icon={faRobot} size="xl"/>
        </button>
    )
}