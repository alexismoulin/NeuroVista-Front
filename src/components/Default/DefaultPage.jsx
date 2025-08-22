import PrimaryButton from "../Reusable/PrimaryButton.jsx";
import Copyright from "../Reusable/Copyright.jsx";

const mode = import.meta.env.VITE_MODE

export default function DefaultPage({ setPage }) {
    return (
        <div className="bg-basic flex flex-col justify-between items-center h-screen">
            <div className="w-11/12 bg-white border-b-2 overflow-visible mt-24">
                <h2 className="m-6 font-opensans uppercase text-xl text-slatey">
                    Backend connection unavailable
                </h2>
                <p className="m-6 font-merriweather text-slatey">
                    {mode === "Prod" ?
                        "The connexion to the backend has failed. Please try again." :
                        "This is a demo application, so uploading and processing MRI series isn’t supported."
                    }
                </p>
                <div className="flex justify-end p-6">
                    <PrimaryButton onClick={() => setPage(mode === "Prod" ? "landing" : "main")}>
                        Proceed
                    </PrimaryButton>
                </div>
            </div>
            <Copyright />
        </div>
    );
}