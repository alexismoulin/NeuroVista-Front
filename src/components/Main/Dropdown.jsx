import { useState, useEffect, useRef } from "react";

export default function Dropdown({ series, selectedSeries, setSelectedSeries }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference to the dropdown container

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Handle selection of a series
    function handleSelect(name) {
        setSelectedSeries(name); // Trigger the setSelectedSeries function
        setIsOpen(false); // Close the dropdown
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Helper function to format dimensions
    const formatDimensions = (dimensions) => {
        if (Array.isArray(dimensions)) {
            return dimensions.join(" x ");
        }
        return dimensions.split(",").join(" x ");
    };

    return (
        <div className="relative w-96" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="w-full px-4 py-2 text-center text-slatey font-merriweather
                border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100"
            >
                {selectedSeries ? selectedSeries : "- Select a T1 Series -"}
                <span className="float-right"> ▼ </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul
                    className="absolute z-50 left-0 right-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
                    style={{ top: "100%" }}
                >
                    {Object.entries(series).map(([name, dimensions], index) => (
                        <li
                            key={index}
                            className="px-4 py-2 text-slatey font-merriweather cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(name)}
                        >
                            {name}: {formatDimensions(dimensions)}
                        </li>
                    ))}
                    <li
                        key={-1}
                        className="px-4 py-2 text-slatey font-merriweather cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelect("AVERAGES")}
                    >
                        - CALCULATED AVERAGES -
                    </li>
                </ul>
            )}
        </div>
    );
}