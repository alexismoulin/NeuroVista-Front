import { useContext } from "react";
import { DataContext } from "../../store/store.jsx";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
    const { selectedData } = useContext(DataContext);
    const regionData = selectedData?.data || [];

    // Determine the dynamic label for LHS volume
    const lhsLabel =
        regionData.some((item) => item["LHS Volume (mm3)"])
            ? "LHS Volume (mm³)"
            : regionData.some((item) => item["Volume (mm3)"])
                ? "Volume (mm³)"
                : "Gray Matter Vol (mm³)";

    // Prepare chart data
    const structureNames = regionData.map((item) => item.Structure || item.name);
    const lhsVolumes = regionData.map(
        (item) =>
            item["LHS Volume (mm3)"] ||
            item["Volume (mm3)"] ||
            item["Gray Matter Vol (mm3)"]
    );
    const rhsVolumes = regionData.map((item) => item["RHS Volume (mm3)"]);

    // Filter out empty values for RHS volumes
    const hasRHSData = rhsVolumes.some((volume) => volume != null);

    const barChartData = {
        labels: structureNames,
        datasets: [
            {
                label: lhsLabel, // Dynamic label for LHS
                data: lhsVolumes,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            ...(hasRHSData
                ? [
                    {
                        label: "RHS Volume (mm³)",
                        data: rhsVolumes,
                        backgroundColor: "rgba(153, 102, 255, 0.6)",
                    },
                ]
                : []),
        ],
    };

    return (
        <div className="flex flex-col w-11/12 bg-white border-b-2 overflow-visible">
            <h3 className="m-6 text-slatey font-opensans uppercase text-xl">
                Brain Structure Volumetric Dashboard
            </h3>
            <div className="px-6 py-4">
                <Bar
                    data={barChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                        },
                    }}
                />
            </div>
        </div>
    );
}