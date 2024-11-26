import PillButton from "../Reusable/PillButton.jsx";

export default function Intro({ handleType }) {
    return (
        <section className="flex items-center flex-col pt-24 pb-12 mb-20 w-full">
            <h1 className="text-white text-7xl tracking-wider uppercase font-bold font-opensans mb-8">Results
                Analysis</h1>
            <p className="text-white text-xl font-merriweather mb-8">MRI Analysis Results for Patient Series</p>
            <div className="flex items-center flex-row gap-10">
                <PillButton onClick={() => handleType("cortical")}>Cortical</PillButton>
                <PillButton onClick={() => handleType("sub-cortical")}>SubCortical</PillButton>
            </div>
        </section>
);
}
