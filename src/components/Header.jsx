export default function Header({setPage}) {
    return (
        <section id="header" className="dark">
            <header>
                <h1>Welcome to NeuroVista</h1>
                <p>An innovation platform for processing, analyzing, and visualizing human brain MR images</p>
            </header>
            <footer>
                <a className="button scrolly" onClick={() => setPage("main")}>Process MRI</a>
            </footer>
        </section>
    )
}