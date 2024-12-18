import TableRow from "./TableRow.jsx";
import { useContext } from "react";
import { DataContext } from "../../store/store.jsx";

export default function Table({ setPage }) {
    const { selectedData } = useContext(DataContext);

    if (!selectedData || !selectedData.headers || !selectedData.data) {
        return <div>No data available.</div>;
    }

    // Select a column to sort by. For example, let's sort by the first header.
    const headerToSortBy = selectedData.headers[0];

    // Make a shallow copy of the data array before sorting.
    const sortedData = [...selectedData.data].sort((a, b) => {
        // Ensure the comparison is done on string values and handle undefined cases.
        const valA = (a[headerToSortBy] || "").toString().toLowerCase();
        const valB = (b[headerToSortBy] || "").toString().toLowerCase();
        return valA.localeCompare(valB);
    });

    return (
        <div className="w-11/12 bg-white">
            <table className="w-full my-8 border-separate border-spacing-0">
                <thead className="border-b-2 border-gray-200">
                <tr>
                    {selectedData.headers.map((header) => (
                        <th
                            key={header}
                            className="text-left font-opensans uppercase font-black text-sm tracking-wider text-slatey px-3 py-2"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {sortedData.length > 0 ? (
                    sortedData.map((item, index) => (
                        <TableRow
                            key={item.id || index}
                            item={item}
                            headers={selectedData.headers}
                            title={selectedData.title}
                            setPage={setPage}
                        />
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={selectedData.headers.length}
                            className="text-center py-4 accent-red-300 font-merriweather"
                        >
                            No data available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}