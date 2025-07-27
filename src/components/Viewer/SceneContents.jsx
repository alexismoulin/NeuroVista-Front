import {useEffect, useRef} from "react";
import {useFrame, useLoader, useThree} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import Lights from "./Lights.jsx";
import {OrbitControls} from "@react-three/drei";

export default function SceneContents({ url, showAxes, showGrid, autoRotate, exposure, structures, setStructures, selectedId }) {
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