import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";

export default function Top({ selectedData, handleLargePage }) {
    return (
        <div className="flex justify-between items-center w-11/12 bg-white border-b-2">
            <h3 className="m-4 text-slatey font-opensans uppercase text-2xl">{selectedData.title}</h3>
            <button className="p-2 m-4 text-3xl" onClick={handleLargePage}>
                <FontAwesomeIcon icon={faRobot} />
            </button>
        </div>
    );
}