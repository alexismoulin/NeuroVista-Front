export default function LargeResultsPage({setPage, data}) {

    const age = 40
    const sex = "Male"

    function createPrompt() {
        return `This is an MRI analysis of a patient brain. The patient is a ${sex} of ${age} years old.` + "\n" +
            "You need to analyse the measurements of the patient " + data.title + "\n" +
            `The measurements of the ${data.title} sub-structures are:` + "\n" +
            data +
            "Please provide an analysis about those measurements"
    }

    function handleClose() {
        setPage("main")
    }

    return (
        <>
            <div id="intro">
                <h1>{data.title} Analysis</h1>
                <p>Full Analysis</p>
            </div>
            <div id="main">
                <section>
                    <h3>Key Metrics</h3>
                    <ul>
                        <li>Sex: {sex}</li>
                        <li>Age: {age}</li>
                    </ul>
                </section>
                <section>
                    <h3>Analysis</h3>
                    <div style={{whiteSpace: "pre-line"}}>
                        {createPrompt()}
                    </div>
                </section>
                <section>
                    <button className="button primary squared" onClick={handleClose}>Close</button>
                </section>
            </div>
        </>
    )
}