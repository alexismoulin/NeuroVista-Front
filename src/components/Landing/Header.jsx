import { useState } from "react";
import Login from "./Login.jsx";
import Hero from "./Hero.jsx";

export default function Header({ setPage, setShowForm }) {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <header className="relative flex items-center flex-col pt-24 pb-12 mb-4 w-full">

            <button
                aria-label={showLogin ? "Close login form" : "Open login form"}
                className="absolute top-8 right-16 text-white uppercase font-merriweather text-base border border-transparent hover:text-tahiti transition-colors duration-200 ease-in-out"
                onClick={() => setShowLogin((v) => !v)}
            >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>

            {showLogin? <Login setShowLogin={setShowLogin} /> : <Hero setPage={setPage} setShowForm={setShowForm} />}

        </header>
    );
}