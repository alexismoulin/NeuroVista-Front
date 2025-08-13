export default function TableRow({ item, headers }) {

    return (
        <tr className="h-16 border-y-gray-200 odd:bg-gray-100 even:bg-white">
            {headers.map((header, index) => (
                <td className="font-merriweather text-slatey px-3 py-2" key={index}>
                    {item[header]}
                </td>
            ))}
        </tr>
    );
}