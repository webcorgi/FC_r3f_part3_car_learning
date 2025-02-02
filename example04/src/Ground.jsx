import React, { useEffect } from 'react'
import { usePlane } from "@react-three/cannon";
import { Tree } from './components/Tree';
import { Ball } from './components/Ball';
import HowToPlay from './components/HowToPlay';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { RoadSign } from './components/RoadSign';
import Banner from './components/Banner';
import { MotionStage } from './components/MotionStage';
import { MotionStage2 } from './components/MotionStage2';
import { BoxDrop } from './components/BoxDrop';
import { Road } from './components/Road';

export function Ground() {

  const [meshRef] = usePlane(
    () => ({ args: [15, 15], mass: 1, type: 'Static', rotation: [-Math.PI/2,0,0]}),
  )

  return (
    <group>
      <mesh ref={meshRef} receiveShadow >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="white" opacity={0} transparent/>
      </mesh>

      {/* 나무 */}
      <Tree position={[1,0.5,-1]}/>
      <Tree position={[-1,0.5,-1]}/>
      <Tree position={[3,0.5,-1]}/>
      <Tree position={[-3,0.5,-1]}/>

      <Ball position={[0,0.2,-2]}/>

      <HowToPlay/>

      <RoadSign position={[0,0.5,3]} />

      <Banner position={[0,1,-6]} />

      <MotionStage position={[3,0.55,4]} />
      <MotionStage2 position={[-4,0.55,5.5]} />

      <Road position={[-8.8, -0.06, 1]} rotation-y={Math.PI/2}/>
      <Road position={[-8.8, -0.06, 10]} rotation-y={Math.PI/2}/>
    </group>
  )
}