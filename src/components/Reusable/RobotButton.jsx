import {faRobot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function RobotButton({className, ...props}) {

    let classes = className + " " + "px-4 py-2 text-slatey border-slatey border-2 rounded-full hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out"

    return (
        <button
            className={classes}
            {...props}
        >
            <FontAwesomeIcon icon={faRobot} size="xl"/>
        </button>
    )
}