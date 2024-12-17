import { createContext, useState, useCallback, useEffect, useMemo } from "react";
import { initializeData, get_series, SERVER_URL } from "../helpers/data.js";

export const DataContext = createContext();

export default function DataContextProvider({ children }) {
    const [type, setType] = useState("cortical");
    const [data, setData] = useState(null);
    const [series, setSeries] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState("AVERAGES");
    const [selectedData, setSelectedData] = useState(null);
    const [selectedItem, setSelectedItem] = useState()
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const result = await get_series(SERVER_URL);
                if (result) {
                    setSeries(result);
                    console.log("Series data loaded successfully.");
                } else {
                    console.error("Failed to load series data.");
                }
            } catch (error) {
                console.error("Error fetching series data:", error);
                setNoData(true);
            }
        };

        const fetchData = async () => {
            try {
                const result = await initializeData(selectedSeries);
                if (result) {
                    setData(result);
                    setSelectedData(result.aseg || null);
                    setNoData(false);
                    console.log("Data loaded successfully.");
                } else {
                    setNoData(true);
                    console.error("No data found.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setNoData(true);
            }
        };

        fetchSeries();
        fetchData();
    }, [selectedSeries]);

    const handleDefaultType = useCallback(
        (defaultType) => {
            if (defaultType === "cortical") {
                setType("cortical");
                setSelectedData(data?.aseg || null);
            } else if (defaultType === "sub-cortical") {
                setType("sub-cortical");
                setSelectedData(data?.brainStem || null);
            }
        },
        [data]
    );

    const handleSelectedData = useCallback(
        (selection) => {
            setSelectedData(data?.[selection] || null);
        },
        [data]
    );

    const ctxValue = useMemo(
        () => ({
            type,
            setType,
            data,
            setData,
            series,
            setSeries,
            selectedSeries,
            setSelectedSeries,
            selectedData,
            setSelectedData,
            noData,
            setNoData,
            selectedItem,
            setSelectedItem,
            handleDefaultType,
            handleSelectedData,
        }),
        [type, data, series, selectedSeries, selectedData, selectedItem, noData, handleDefaultType, handleSelectedData]
    );

    return (
        <DataContext.Provider value={ctxValue}>
            {children}
        </DataContext.Provider>
    );
}