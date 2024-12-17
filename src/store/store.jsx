import { createContext, useState, useMemo } from "react";

export const DataContext = createContext({
    type: "cortical",
    setType: () => {
        console.error("setType called outside of CartContextProvider");
    }
});

export default function DataContextProvider({ children }) {
    const [type, setType] = useState("cortical")

    const ctxValue = useMemo(() => ({
        type: type,
        setType: setType
    }), [type]);

    return (
        <DataContext.Provider value={ctxValue}>
            {children}
        </DataContext.Provider>
    );
}