import {faRobot} from "@fortawesome/free-solid-svg-icons";
import {faBrain} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function TopButton({className, iconType, ...props}) {

    let classes = className + " " + "text-slatey hover:text-tahiti transition-colors duration-200 ease-in-out"

    return (
        <button
            className={classes}
            {...props}
        >
            <FontAwesomeIcon icon={iconType === "robot" ? faRobot : faBrain} size="xl"/>
            <p className="font-opensans text-sm">{iconType === "robot" ? "Analyze" : "3D Viewer"}</p>
        </button>
    )
}