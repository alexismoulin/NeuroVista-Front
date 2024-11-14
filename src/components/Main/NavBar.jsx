export default function NavBar({ selectedType, selectedData, setSelectedData }) {
    function corticalNavBar() {
        const links = [
            { title: "General Segmentations", data: "aseg" },
            { title: "General Volumes", data: "brain" },
            { title: "White Matter", data: "whiteMatter" },
            { title: "LHS Parcellations", data: "lhsParcellation" },
            { title: "RHS Parcellations", data: "rhsParcellation" },
        ]
        const navItemClass =
            `px-8 py-4 transition-colors duration-200 cursor-pointer hover:bg-white hover:bg-opacity-10 
            flex items-center justify-center w-1/${links.length}`;
        const activeNavItemClass = "bg-white text-gray-800";

        return (
            <ul className="flex font-black tracking-wider uppercase text-white text-sm list-none mb-0 pl-0 w-full">
                {links.map((link) => (
                    <li
                        key={link.title}
                        className={`${navItemClass} ${
                            selectedData.title === link.title ? activeNavItemClass : ""
                        }`}
                        onClick={() => setSelectedData(link.data)}
                    >
                        <a>{link.title}</a>
                    </li>
                ))}
            </ul>
        );
    }

    function subCorticalNavBar() {
        const links = [
            { title: "Brain Stem", data: "brainStem" },
            { title: "Amygdala", data: "amygdala" },
            { title: "Hippocampus", data: "hippocampus" },
            { title: "Thalamus", data: "thalamus" },
            { title: "Hypothalamus", data: "hypothalamus" },
            { title: "Cerebellum", data: "cerebellum" },
        ]

        const navItemClass =
            `px-8 py-4 transition-colors duration-200 cursor-pointer hover:bg-white hover:bg-opacity-10 
            flex items-center justify-center w-1/${links.length}`;
        const activeNavItemClass = "bg-white text-gray-800";

        return (
            <ul className="flex font-black tracking-wider uppercase text-white text-sm list-none mb-0 pl-0 w-full">
                {links.map((link) => (
                    <li
                        key={link.title}
                        className={`${navItemClass} ${
                            selectedData.title === link.title ? activeNavItemClass : ""
                        }`}
                        onClick={() => setSelectedData(link.data)}
                    >
                        <a>{link.title}</a>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <nav
            className="flex transition-transform duration-1000 ease-in-out transform-gpu opacity-100 bg-white
            bg-opacity-20 h-16 mx-auto -mt-16 w-11/12 z-20"
        >
            {selectedType === "cortical" ? corticalNavBar() : subCorticalNavBar()}
        </nav>
    );
}