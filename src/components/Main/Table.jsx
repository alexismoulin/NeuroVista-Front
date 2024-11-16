import TableRow from "./TableRow.jsx";

export default function Table({ headers, title, data, setPage, setSelectedItem }) {
    return (
        <div className="w-11/12 bg-white">
            <table className="w-full my-8 border-separate border-spacing-0">
                <thead className="border-b-2 border-gray-200">
                <tr>
                    {headers.map((header) => (
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
                {data.map((item, index) => (
                    <TableRow
                        key={index}
                        item={item}
                        headers={headers}
                        title={title}
                        setPage={setPage}
                        setSelectedItem={setSelectedItem}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}