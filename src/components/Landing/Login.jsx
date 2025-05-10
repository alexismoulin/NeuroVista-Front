import { useContext } from "react";
import { DataContext } from "../../store/store.jsx";

export default function Login({ setShowLogin }) {
    const { userName, setUserName, openAIApiKey, setOpenAIApiKey } = useContext(DataContext);
    function resetInputs() {
        setUserName("");
        setOpenAIApiKey("");
    }
    return (
        <section className="p-8 w-11/12 mx-auto mt-10 bg-white">
            <header className="text-center mb-6">
                <h2 className="text-3xl font-bold font-opensans uppercase text-slatey mb-2">
                    Login
                </h2>
            </header>

            <div className="space-y-6">
                {/* Username field */}
                <div>
                    <label
                        htmlFor="username"
                        className="block text-slatey mb-2 font-opensans uppercase"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg font-merriweather focus:outline-none focus:ring-2 focus:ring-tahiti"
                    />
                </div>

                {/* API Key field */}
                <div>
                    <label
                        htmlFor="apiKey"
                        className="block text-slatey mb-2 font-opensans uppercase"
                    >
                        Api Key
                    </label>
                    <input
                        type="text"
                        id="apiKey"
                        placeholder="Api Key"
                        value={openAIApiKey}
                        onChange={(e) => setOpenAIApiKey(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg font-merriweather focus:outline-none focus:ring-2 focus:ring-tahiti"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-4 pb-1 pt-6">
                <button
                    className="font-opensans uppercase text-slatey border-slatey border-2 py-3 px-6 text-center bg-white text-sm tracking-widest hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out w-32"
                    onClick={resetInputs}
                >Reset</button>
                <button
                    className="font-opensans uppercase text-white py-3 px-6 text-center bg-slatey text-sm tracking-widest hover:bg-tahiti transition-colors duration-200 ease-in-out w-32"
                    onClick={() => setShowLogin(false)}
                >Validate</button>
            </div>

        </section>
    );
}