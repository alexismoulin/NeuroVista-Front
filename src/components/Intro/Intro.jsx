import "./Intro.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

export default function Intro({ handleType }) {
    return (
        <div id="intro">
            <h1>Results Analysis</h1>
            <p>MRI Analysis Results for Patient Series</p>
            <ul className="actions">
                <li>
                    <FontAwesomeIcon
                        icon={faBrain}
                        size="4x"
                        className="icon"
                        onClick={() => handleType("cortical")}
                    />
                    <p>Cortical</p>
                </li>
                <li></li>
                <li>
                    <FontAwesomeIcon
                        icon={faBrain}
                        size="4x"
                        rotation={90}
                        onClick={() => handleType("sub-cortical")}
                    />
                    <p>Sub-Cortical</p>
                </li>
            </ul>
        </div>
    );
}
