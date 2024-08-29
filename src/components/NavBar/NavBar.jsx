import "./NavBar.css"

export default function NavBar({title, onClick}) {

    return (
        <nav id="nav">
            <ul className="links">
                <li className={title === "General Segmentations"  ? "active" : undefined}>
                    <a onClick={() => onClick(0)}>General Segmentations</a>
                </li>
                <li className={title === "General Volumes"  ? "active" : undefined}>
                    <a onClick={() => onClick(1)}>General Volumes</a>
                </li>
                <li className={title === "White Matter"  ? "active" : undefined}>
                    <a onClick={() => onClick(2)}>White Matter</a>
                </li>
                <li className={title === "LHS Parcellations"  ? "active" : undefined}>
                    <a onClick={() => onClick(3)}>LHS Parcellations</a>
                </li>
                <li className={title === "RHS Parcellations"  ? "active" : undefined}>
                    <a onClick={() => onClick(4)}>RHS Parcellations</a>
                </li>
            </ul>
            <ul className="icons">
                <li><a href="#" className="icon brands fa-hospital-user"><span className="label">Twitter</span></a></li>
            </ul>
        </nav>
    );
}