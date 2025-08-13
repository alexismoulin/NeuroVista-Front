import {Html, useProgress} from "@react-three/drei";

export default function Loading() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{ color: 'white', fontFamily: 'sans-serif', fontSize: 14 }}>
                Loading {progress.toFixed(1)}%
            </div>
        </Html>
    );
}