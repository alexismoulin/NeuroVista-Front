import RobotButton from "../Reusable/RobotButton.jsx";

export default function Top({ selectedData, handleLargePage }) {
    return (
        <div className="flex justify-between items-center w-11/12 bg-white border-b-2">
            <h3 className="m-6 text-slatey font-opensans uppercase text-xl">{selectedData.title}</h3>
            <RobotButton className="mx-8 text-2xl" onClick={handleLargePage} />
        </div>
    );
}