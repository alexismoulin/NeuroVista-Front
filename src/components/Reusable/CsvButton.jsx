import {faFileCsv} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CsvButton({className, ...props}) {

    let classes = className + " " + "px-4 py-2 text-slatey hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out"

    return (
        <button
            className={classes}
            {...props}
        >
            <FontAwesomeIcon icon={faFileCsv} size="xl"/>
        </button>
    )
}