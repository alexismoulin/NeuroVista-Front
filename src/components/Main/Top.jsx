import RobotButton from "../Reusable/RobotButton.jsx";
import Dropdown from "./Dropdown.jsx";

export default function Top({ selectedData, handleLargePage, series, selectedSeries, setSelectedSeries }) {
    return (
        <div className="flex justify-between items-center w-11/12 bg-white border-b-2 overflow-visible">
            <h3 className="m-6 text-slatey font-opensans uppercase text-xl">
                {selectedData.title}
            </h3>
            <Dropdown series={series} selectedSeries={selectedSeries} setSelectedSeries={setSelectedSeries} />
            <RobotButton className="mx-8 text-2xl" onClick={handleLargePage} />
        </div>
    );
}