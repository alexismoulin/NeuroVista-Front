import MoonLoader from "react-spinners/MoonLoader";

export default function LoadingStep({stepText}) {
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <p>{stepText}</p>
            <MoonLoader size={20} />
        </div>
    )
}