import RobotButton from "../Reusable/RobotButton.jsx";

export default function TableRow({ item, headers, setPage, setSelectedItem }) {

    function handlePage() {
        setPage("results");
        setSelectedItem(item);
    }

    return (
        <tr className="border-t border-gray-200 even:bg-gray-100">
            {headers.map((header, index) => (
                header === "Analysis" ? (
                    <td className="w-1/12 px-3 py-2" key={index}>
                        <RobotButton onClick={handlePage} />
                    </td>
                ) : (
                    <td className="font-merriweather text-slatey px-3 py-2" key={index}>{item[header]}</td>
                )
            ))}
        </tr>
    );
}