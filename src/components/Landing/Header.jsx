import { useState } from "react";
import Login from "./Login.jsx";
import Hero from "./Hero.jsx";

export default function Header({ setPage, setShowForm }) {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <header className="relative flex items-center flex-col pt-24 pb-12 mb-4 w-full">
            <button
                aria-label={showLogin ? "Close login form" : "Open login form"}
                className="absolute top-8 right-16 text-white uppercase font-merriweather text-base border border-transparent hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out"
                onClick={() => setShowLogin((v) => !v)}
            >
                {showLogin ? "Close" : "Log in"}
            </button>

            {showLogin && <Login />}
            {!showLogin && <Hero setPage={setPage} setShowForm={setShowForm} />}

        </header>
    );
}