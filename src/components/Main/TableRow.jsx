import RobotButton from "../Reusable/RobotButton.jsx";

export default function TableRow({ item, headers, setPage, setSelectedItem }) {

    function handlePage() {
        setPage("results");
        setSelectedItem(item);
    }

    return (
        <tr className="border-y-gray-200 odd:bg-gray-100 even:bg-white">
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