import { Suspense, useContext, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Loading from "./Loading.jsx";
import LegendPanel from "./LegendPanel.jsx";
import SceneContents from "./SceneContents.jsx";
import PrimaryButton from "../Reusable/PrimaryButton.jsx";
import Copyright from "../Reusable/Copyright.jsx";
import { DataContext } from "../../store/store.jsx";
import { getModelUrl , SERVER_URL, DEFAULT_PATIENT, DEFAULT_STUDY } from "../../helpers/data.js";

/**
 * Viewer
 * Displays the aseg_all.glb model and a legend of structures + colors.
 */
export default function Viewer({
                                          setPage,
                                          background = '#111',
                                          showAxes = true,
                                          showGrid = false,
                                          autoRotate = false,
                                          exposure = 2,
                                          showLegend = true,
                                          legendWidth = 260,
                                      }) {
    const [structures, setStructures] = useState([]); // {id,name,color:[r,g,b,a],visible,mesh}
    const [filter, setFilter] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const { selectedData, selectedSeries } = useContext(DataContext);

    let modelUrl = getModelUrl(SERVER_URL, DEFAULT_PATIENT, DEFAULT_STUDY, selectedSeries, selectedData.model);
    function subtitleTransformer(subtitle) {
        if (subtitle.includes("Parcellations")) {
            return "LHS & RHS Parcellations";
        }
        if (subtitle.includes("Amygdala") || subtitle.includes("Hippocampus")) {
            return "Amygdala & Hippocampus"
        }
        return subtitle;
    }

    return (
        <div className="bg-basic flex flex-col items-center">
            <header className="flex items-center flex-col pt-12 pb-6 w-full">
                <h1 className="text-white text-7xl tracking-wider uppercase font-bold font-opensans mb-8">
                    3D Viewer
                </h1>
                <p className="text-white text-xl font-merriweather mb-8">{subtitleTransformer(selectedData.title)} - {selectedSeries}</p>
            </header>
            <div style={{ display: 'flex', position: 'relative', height: '600px' }} className="w-11/12 font-merriweather">
                {showLegend && (
                    <LegendPanel
                        width={legendWidth}
                        structures={structures}
                        setStructures={setStructures}
                        filter={filter}
                        setFilter={setFilter}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                    />
                )}
                <div style={{ flex: 1 }}>
                    <Canvas
                        shadows
                        gl={{ antialias: true }}
                        onCreated={({ scene, gl }) => {
                            scene.background = new THREE.Color(background);
                            gl.outputColorSpace = THREE.SRGBColorSpace;
                        }}
                    >
                        <Suspense fallback={<Loading />}>
                            <SceneContents
                                url={modelUrl}
                                showAxes={showAxes}
                                showGrid={showGrid}
                                autoRotate={autoRotate}
                                exposure={exposure}
                                structures={structures}
                                setStructures={setStructures}
                                selectedId={selectedId}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
            <div className="py-1"></div>
            <section className="flex justify-end p-6 bg-white w-11/12">
                <PrimaryButton onClick={() => setPage("main")}>Close</PrimaryButton>
            </section>
            <Copyright />
        </div>
    );
}