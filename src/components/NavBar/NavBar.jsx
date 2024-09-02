import "./NavBar.css"

export default function NavBar({ selectedType, selectedData, setSelectedData }) {
    function corticalNavBar() {
        return (
            <ul className="links">
                <li className={selectedData.title === "General Segmentations" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("aseg")}>General Segmentations</a>
                </li>
                <li className={selectedData.title === "General Volumes" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("brain")}>General Volumes</a>
                </li>
                <li className={selectedData.title === "White Matter" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("whiteMatter")}>White Matter</a>
                </li>
                <li className={selectedData.title === "LHS Parcellations" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("lhsParcellation")}>LHS Parcellations</a>
                </li>
                <li className={selectedData.title === "RHS Parcellations" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("rhsParcellation")}>RHS Parcellations</a>
                </li>
            </ul>
        )
    }

    function subCorticalNavBar() {
        return (
            <ul className="links">
                <li className={selectedData.title === "Brain Stem" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("brainStem")}>Brain Stem</a>
                </li>
                <li className={selectedData.title === "Amygdala" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("amygdala")}>Amygdala</a>
                </li>
                <li className={selectedData.title === "Hippocampus" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("hippocampus")}>Hippocampus</a>
                </li>
                <li className={selectedData.title === "Thalamus" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("thalamus")}>Thalamus</a>
                </li>
                <li className={selectedData.title === "Hypothalamus" ? "active" : undefined}>
                    <a onClick={() => setSelectedData("hypothalamus")}>Hypothalamus</a>
                </li>
            </ul>
        )
    }

    return (
        <nav id="nav">
            {selectedType === "cortical" ? corticalNavBar() : subCorticalNavBar()}
        </nav>
    )
}
