import React, { useContext } from "react";
import { DataContext } from "../../store/store.jsx";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Tab, Tabs, Typography, Box } from "@mui/material";

export default function Dashboard() {
    // Grab what we need from context
    const {
        data,                 // the entire data object (with aseg, lesions, brain, etc.)
        selectedData,         // the currently selected dataset: { data: [...], title: "...", headers: [...] }
        selectedDataKey,      // the currently selected key (e.g. "aseg", "brain", etc.)
        handleSelectedData,   // function to switch keys
    } = useContext(DataContext);

    // Safely derive the items array (so we can do .map without errors)
    // selectedData = { data: [...], title: "...", headers: [...] }
    const regionData = selectedData?.data || [];

    // If you prefer to show all possible region keys in tabs,
    // just extract the keys from your `data` object:
    const regionKeys = Object.keys(data || {});
    // E.g. ["aseg", "lesions", "brain", "whiteMatter", ...]

    // Prepare chart data
    const structureNames = regionData.map((item) => item.Structure || item.name);
    const lhsVolumes = regionData.map(
        (item) => item["LHS Volume (mm3)"] || item["Volume (mm3)"]
    );
    const rhsVolumes = regionData.map((item) => item["RHS Volume (mm3)"]);

    const barChartData = {
        labels: structureNames,
        datasets: [
            {
                label: "LHS Volume (mm³)",
                data: lhsVolumes,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
                label: "RHS Volume (mm³)",
                data: rhsVolumes || [],
                backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
        ],
    };

    const pieChartData = {
        labels: structureNames,
        datasets: [
            {
                data: lhsVolumes,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    return (
        <div className="flex justify-between items-center w-11/12 bg-white border-b-2 overflow-visible">
            <h3 className="m-6 text-slatey font-opensans uppercase text-xl">
                Brain Structure Volumetric Dashboard
            </h3>

            <Box sx={{ padding: "2rem" }}>
                {  /* Render a Tab for each key in our data object */}
                <Tabs
                    value={selectedDataKey}  // which tab is "active"
                    onChange={(e, newValue) => handleSelectedData(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {regionKeys.map((key) => (
                        <Tab key={key} label={data[key].title} value={key} />
                    ))}
                </Tabs>

                {/* Chart Section */}
                <Box sx={{ marginTop: "2rem" }}>
                        <Box sx={{ width: "60%" }}>
                            <Bar
                                data={barChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: "top" },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "35%" }}>
                            <Pie
                                data={pieChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: "right" },
                                    },
                                }}
                            />
                        </Box>

                </Box>
            </Box>
        </div>
    );
}
