import { useContext, useMemo } from "react";
import { DataContext } from "../../store/store.jsx";

export default function NavBar() {
    const { type = 'general', selectedDataKey, setSelectedDataKey } = useContext(DataContext);

    // Define navigation links
    const links = useMemo(
        () => ({
            cortical: [
                { title: "White Matter", data: "whiteMatter" },
                { title: "LHS Parcellations", data: "lhsParcellation" },
                { title: "RHS Parcellations", data: "rhsParcellation" }
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
                { title: "Hypointensities", data: "lesions" }
            ],
        }),
        []
    );

    // Fallback for unknown types
    const currentLinks = links[type] || links.general;

    return (
        <nav
            className="flex bg-white/20 h-16 w-11/12 mx-auto -mt-16 z-20 transition-transform duration-500 ease-in-out transform-gpu opacity-100"
            aria-label="Data navigation"
        >
            <ul className="flex w-full list-none p-0 m-0 uppercase font-black text-white text-sm tracking-wider">
                {currentLinks.map(({ title, data }) => {
                    const isActive = selectedDataKey === data;
                    return (
                        <li
                            key={data}
                            role="button"
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() => setSelectedDataKey(data)}
                            className={`flex-1 px-4 py-4 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                                isActive ? 'bg-white/100 text-tahiti' : 'bg-white/0'
                            } hover:bg-white/10`}
                        >
                            {title}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
