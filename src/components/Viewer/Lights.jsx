export default function Lights({ exposure }) {
    return (
        <>
            <ambientLight intensity={0.25 * exposure} />
            <directionalLight
                position={[1.5, 2.5, 2.0]}
                intensity={0.9 * exposure}
            />
            <directionalLight
                position={[-2.0, 1.0, -1.5]}
                intensity={0.4 * exposure}
            />
            <directionalLight
                position={[0.0, 2.0, -3.0]}
                intensity={0.5 * exposure}
            />
        </>
    );
}