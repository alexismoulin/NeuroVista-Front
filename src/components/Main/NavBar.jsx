import { useContext } from "react";
import { DataContext } from "../../store/store.jsx";

export default function NavBar() {
    const { type, selectedDataKey, setSelectedDataKey } = useContext(DataContext);

    // Define navigation links
    const links = {
        cortical: [
            { title: "General Volumes", data: "brain" },
            { title: "White Matter", data: "whiteMatter" },
            { title: "LHS Parcellations", data: "lhsParcellation" },
            { title: "RHS Parcellations", data: "rhsParcellation" },
        ],
        "sub-cortical": [
            { title: "Brain Stem", data: "brainStem" },
            { title: "Amygdala", data: "amygdala" },
            { title: "Hippocampus", data: "hippocampus" },
            { title: "Thalamus", data: "thalamus" },
            { title: "Hypothalamus", data: "hypothalamus" }
        ],
        general: [
            { title: "General Segmentations", data: "aseg" },
            { title: "Hypointensities", data: "lesions" },
        ]
    };

    const navWidths = {
        cortical: `w-1/${links.cortical.length}`,
        "sub-cortical": "w-1/6",
        general: `w-1/${links.general.length}`,
    };

    const navItemWidth = navWidths[type] || "w-1/5";

    const navItemClass = `px-8 py-4 transition-colors duration-200 cursor-pointer hover:bg-white hover:bg-opacity-10 flex items-center justify-center`;
    const activeNavItemClass = "bg-white text-tahiti";

    function renderNavLinks(section) {
        return (
            <ul className="flex font-black tracking-wider uppercase text-white text-sm list-none mb-0 pl-0 w-full">
                {links[section].map((link) => (
                    <li
                        key={link.title}
                        className={`${navItemClass} ${navItemWidth} ${
                            selectedDataKey === link.data ? activeNavItemClass : ""
                        }`}
                        onClick={() => setSelectedDataKey(link.data)}
                    >
                        <span>{link.title}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <nav
            className="flex transition-transform duration-500 ease-in-out transform-gpu opacity-100 bg-white
            bg-opacity-20 h-16 mx-auto -mt-16 w-11/12 z-20"
        >
            {type === "cortical"
                ? renderNavLinks("cortical")
                : type === "sub-cortical" ? renderNavLinks("sub-cortical")
                : renderNavLinks("general")}
        </nav>
    );
}