export default function Header({setPage, setShowForm}) {
    return (
        <section>
            <div id="intro">
                <h1>Welcome to NeuroVista</h1>
                <p>An innovation platform for processing, analyzing, and visualizing human brain MR images</p>
                <ul className="actions">
                    <li>
                        <button onClick={() => setShowForm(true)}>New Study</button>
                    </li>
                    <li></li>
                    <li>
                        <button onClick={() => setPage("main")}>View Results</button>
                    </li>
                </ul>
            </div>
        </section>
    )
}