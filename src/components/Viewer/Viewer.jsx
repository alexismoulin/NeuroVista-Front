import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Loading from "./Loading.jsx";
import Lights from "./Lights.jsx";

/**
 * Viewer
 * Displays the aseg_all.glb model and a legend of structures + colors.
 *
 * Props:
 *  - url: string (path/import to the GLB)
 *  - background?: string
 *  - showAxes?: boolean
 *  - showGrid?: boolean
 *  - autoRotate?: boolean
 *  - exposure?: number
 *  - showLegend?: boolean
 *  - legendWidth?: number (px)
 */
export default function Viewer({
                                          url = "mockup/Alexis/ST1/VIEWER/MPR_AX_T1/aseg.glb",
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

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', fontFamily: 'system-ui, sans-serif', fontSize: 12 }}>
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
                            url={url}
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
    );
}


function SceneContents({ url, showAxes, showGrid, autoRotate, exposure, structures, setStructures, selectedId }) {
    const groupRef = useRef();
    const gltf = useLoader(GLTFLoader, url);

    // Extract meshes & derive average vertex color for legend
    useEffect(() => {
        if (!gltf.scene) return;
        const newStructs = [];
        let idCounter = 0;
        gltf.scene.traverse(obj => {
            if (obj.isMesh) {
                const geom = obj.geometry;
                const attr = geom.getAttribute('color');

                let rgba = [200, 200, 200, 255];
                if (attr) {
                    // Sample up to 1000 points for speed
                    const n = attr.count;
                    const step = Math.max(1, Math.floor(n / 1000));
                    let r = 0, g = 0, b = 0, a = 0, samples = 0;
                    for (let i = 0; i < n; i += step) {
                        r += attr.getX(i);
                        g += attr.getY(i);
                        b += attr.getZ(i);
                        a += (attr.itemSize > 3 ? attr.getW(i) : 1);
                        samples++;
                    }
                    rgba = [
                        Math.round((r / samples) * 255),
                        Math.round((g / samples) * 255),
                        Math.round((b / samples) * 255),
                        Math.round((a / samples) * 255),
                    ];
                }

                // Ensure material uses vertex colors
                if (obj.material) {
                    obj.material.vertexColors = true;
                    obj.material.side = THREE.DoubleSide;
                }

                obj.userData._structureId = idCounter;
                newStructs.push({
                    id: idCounter,
                    name: obj.name || `Structure ${idCounter}`,
                    color: rgba,
                    visible: true,
                    mesh: obj,
                });
                idCounter++;
            }
        });
        setStructures(newStructs);
    }, [gltf, setStructures]);

    // Apply visibility & selection highlighting
    useEffect(() => {
        structures.forEach(s => {
            if (!s.mesh) return;
            s.mesh.visible = s.visible;
            if (s.id === selectedId) {
                s.mesh.scale.setScalar(1.02);
                if (s.mesh.material) {
                    if (!s.mesh.material.emissive) {
                        // Convert to MeshStandardMaterial if needed
                        const mat = new THREE.MeshStandardMaterial({
                            vertexColors: true,
                            side: THREE.DoubleSide,
                        });
                        s.mesh.material = mat;
                    }
                    s.mesh.material.emissive = new THREE.Color('#ffffff');
                    s.mesh.material.emissiveIntensity = 0.25;
                }
            } else {
                s.mesh.scale.setScalar(1.0);
                if (s.mesh.material && s.mesh.material.emissive) {
                    s.mesh.material.emissive.setRGB(0, 0, 0);
                    s.mesh.material.emissiveIntensity = 0;
                }
            }
        });
    }, [structures, selectedId]);

    // Rotate
    useFrame((_, delta) => {
        if (autoRotate && groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    // Fit camera
    const { camera } = useThree();
    useEffect(() => {
        if (!gltf.scene) return;
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180.0);
        let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
        cameraZ *= 1.4;
        camera.position.set(center.x + maxDim * 0.4, center.y + maxDim * 0.2, cameraZ + center.z);
        camera.near = maxDim / 100;
        camera.far = maxDim * 10;
        camera.updateProjectionMatrix();
        camera.lookAt(center);
    }, [gltf, camera]);

    return (
        <group ref={groupRef}>
            <primitive object={gltf.scene} />
            <Lights exposure={exposure} />
            {showAxes && <axesHelper args={[50]} />}
            {showGrid && <gridHelper args={[100, 40, '#444', '#222']} />}
            <OrbitControls makeDefault />
        </group>
    );
}

// Helper function
function parseLabelName(rawName = '') {
    // Expected formats: "12_Left-Caudate", "12:Left-Caudate", fallback: rawName
    const m = rawName.match(/^(\d+)[_:](.+)$/);
    if (m) {
        return {
            idNum: parseInt(m[1], 10),
            labelName: m[2],
            display: `#${m[1]} ${m[2]}`,
        };
    }
    return { idNum: null, labelName: rawName, display: rawName };
}

// Updated LegendPanel
function LegendPanel({ width, structures, setStructures, filter, setFilter, selectedId, setSelectedId }) {

    // Enrich each structure with parsed naming
    const enriched = useMemo(() => {
        return structures.map(s => {
            const parsed = parseLabelName(s.name);
            return { ...s, ...parsed };
        });
    }, [structures]);

    // Sorting: numeric ID first, else alphabetically
    const sorted = useMemo(() => {
        return [...enriched].sort((a, b) => {
            if (a.idNum != null && b.idNum != null) return a.idNum - b.idNum;
            if (a.idNum != null) return -1;
            if (b.idNum != null) return 1;
            return a.name.localeCompare(b.name);
        });
    }, [enriched]);

    const filtered = useMemo(() => {
        const f = filter.trim().toLowerCase();
        if (!f) return sorted;
        return sorted.filter(s => {
            const idMatch = s.idNum != null && s.idNum.toString().startsWith(f);
            const nameMatch = s.labelName.toLowerCase().includes(f) || s.name.toLowerCase().includes(f);
            return idMatch || nameMatch;
        });
    }, [sorted, filter]);

    function toggleVisibility(id) {
        setStructures(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
    }

    function solo(id) {
        const visibleCount = structures.filter(s => s.visible).length;
        const target = structures.find(s => s.id === id);
        const soloing = !(visibleCount === 1 && target?.visible);
        setStructures(prev =>
            prev.map(s => s.id === id ? { ...s, visible: true } : { ...s, visible: !soloing ? s.visible : false })
        );
    }

    // Bulk operations preserve order & IDs
    function showAll() {
        setStructures(prev => prev.map(s => ({ ...s, visible: true })));
    }
    function hideAll() {
        setStructures(prev => prev.map(s => ({ ...s, visible: false })));
    }

    return (
        <div style={{
            width,
            background: '#1a1a1d',
            color: '#eee',
            padding: '8px 10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #333',
            fontSize: 12
        }}>
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Structures</div>
            <input
                placeholder="Filter by ID or name..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                    background: '#2a2a2e',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: 4,
                    padding: '4px 6px',
                    marginBottom: 6,
                    fontSize: 12
                }}
            />
            <div style={{ flex: 1, overflowY: 'auto', fontSize: 12 }}>
                {filtered.map(s => {
                    const displayName = s.display || s.name;
                    return (
                        <div
                            key={s.id}
                            onClick={() => setSelectedId(s.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '4px 4px',
                                cursor: 'pointer',
                                borderRadius: 4,
                                userSelect: 'none',
                                background: selectedId === s.id ? '#33394a' : 'transparent'
                            }}
                            title="Click to select. Shift+Click to solo. Middle-click to toggle visibility."
                            onMouseDown={e => {
                                if (e.shiftKey) { solo(s.id); e.preventDefault(); }
                                if (e.button === 1) { toggleVisibility(s.id); e.preventDefault(); }
                            }}
                        >
                            <button
                                onClick={e => { e.stopPropagation(); toggleVisibility(s.id); }}
                                style={{
                                    width: 18,
                                    height: 18,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 10,
                                    background: s.visible ? '#2f343a' : '#26262a',
                                    border: '1px solid #444',
                                    borderRadius: 2,
                                    color: s.visible ? '#fff' : '#888',
                                    cursor: 'pointer'
                                }}
                                aria-label={s.visible ? 'Hide structure' : 'Show structure'}
                            >
                                {s.visible ? '👁' : '×'}
                            </button>
                            <div style={{
                                width: 14,
                                height: 14,
                                borderRadius: 2,
                                background: `rgb(${s.color[0]},${s.color[1]},${s.color[2]})`,
                                border: '1px solid #444',
                                flexShrink: 0
                            }} />
                            <div style={{
                                flex: 1,
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {displayName}
                            </div>
                        </div>
                    );
                })}
                {filtered.length === 0 && <div style={{ opacity: 0.6 }}>No matches</div>}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <button onClick={showAll} style={btnStyle}>Show All</button>
                <button onClick={hideAll} style={btnStyle}>Hide All</button>
            </div>
        </div>
    );
}

const btnStyle = {
    flex: 1,
    background: '#2d2f36',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: 4,
    padding: '4px 6px',
    fontSize: 11,
    cursor: 'pointer'
};