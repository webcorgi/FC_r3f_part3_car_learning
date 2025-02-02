import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Physics, Debug } from "@react-three/cannon";
import Car from "./Car";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { isStartScene } from "./utils/atom";
import { Stats, StatsGl } from "@react-three/drei";

function Scene() {
  const isStart = useRecoilValue(isStartScene)
  useEffect(()=>{ console.log(isStart)},[isStart])
  return (
    <>
      <Canvas camera={{ fov:45, position:[1.5, 2, 4]}}>
        <ambientLight/>
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            {isStart && <Car/>}
            <Ground />
          </Debug>
        </Physics>
        
        {/* <Stats showPanel={0} /> */}
        {/*
          0: FPS
          1: MS
          2: MB
        */}
        <StatsGl className="work" />
      </Canvas>
    </>
  );
}

export default Scene;
