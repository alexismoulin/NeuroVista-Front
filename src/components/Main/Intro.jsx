export default function Intro({ handleType }) {
    return (
        <div id="intro">
            <h1>Results Analysis</h1>
            <p>MRI Analysis Results for Patient Series</p>
            <ul className="actions">
                <li>
                    <button onClick={() => handleType("cortical")}>Cortical</button>
                </li>
                <li></li>
                <li>
                    <button onClick={() => handleType("sub-cortical")}>Sub-Cortical</button>
                </li>
            </ul>
        </div>
    );
}
