import PillButton from "../Reusable/PillButton.jsx";
import { useContext } from "react";
import { DataContext } from "../../store/store.jsx";

export default function Header({ setPage, setShowForm }) {
  const { noData } = useContext(DataContext);

  return (
    <section className="relative flex items-center flex-col pt-24 pb-12 mb-4 w-full">
        <button 
        className="absolute top-8 right-16 text-white uppercase font-merriweather text-base hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out"
        onClick={() => {}}
        >Log in</button>

      <h1 className="text-white text-7xl tracking-wider uppercase font-bold font-opensans mb-8">
        Welcome to NeuroVista
      </h1>
      <p className="text-white font-merriweather text-xl mb-8">
        An innovation platform for processing, analyzing, and visualizing human brain MR images
      </p>
      <div className="flex items-center flex-row gap-10">
        <PillButton onClick={() => setShowForm(true)}>New Study</PillButton>
        <PillButton onClick={() => setPage("main")} disabled={noData}>
          View Results
        </PillButton>
      </div>
    </section>
  );
}
