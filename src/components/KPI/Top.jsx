import TopButton from "../Reusable/TopButton.jsx";
import Dropdown from "./Dropdown.jsx";
import {useContext} from "react";
import {DataContext} from "../../store/store.jsx";

export default function Top({ handleViewer, handleAnalyze }) {

    const {selectedData, series, selectedSeries, setSelectedSeries} = useContext(DataContext)

    return (
        <div className="flex justify-between items-center w-11/12 bg-white border-b-2 overflow-visible">
            <h3 className="m-6 text-slatey font-opensans uppercase text-xl">
                {selectedData.title}
            </h3>
            <Dropdown series={series} selectedSeries={selectedSeries} setSelectedSeries={setSelectedSeries} />
            <div className="pr-4">
                <TopButton
                    className="mx-8 text-2xl"
                    iconType="brain"
                    onClick={handleViewer}
                    hidden={selectedData.title === "Hypointensities"} />
                <TopButton className="mx-8 text-2xl" iconType="robot" onClick={handleAnalyze} />
            </div>
        </div>
    );
}