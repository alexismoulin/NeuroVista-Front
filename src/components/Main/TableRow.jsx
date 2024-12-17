import RobotButton from "../Reusable/RobotButton.jsx";
import { useContext } from "react";
import { DataContext } from "../../store/store.jsx";

export default function TableRow({ item, headers, setPage }) {
    const { setSelectedItem } = useContext(DataContext);

    function handlePage() {
        setPage("results");
        setSelectedItem(item);
    }

    return (
        <tr className="border-y-gray-200 odd:bg-gray-100 even:bg-white">
            {headers.map((header, index) => (
                header.trim().toLowerCase() === "analysis" ? (
                    <td className="w-1/12 px-3 py-2" key={index}>
                        <RobotButton onClick={handlePage} aria-label="Open Analysis Page" />
                    </td>
                ) : (
                    <td
                        className="font-merriweather text-slatey px-3 py-2"
                        key={index}
                    >
                        {item[header]}
                    </td>
                )
            ))}
        </tr>
    );
}