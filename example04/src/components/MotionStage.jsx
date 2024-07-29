import React, { useRef } from 'react'
import { Html, useGLTF, useTexture } from '@react-three/drei'
import Picture from './Picture'
import { useBox } from '@react-three/cannon'
import {motion} from 'framer-motion-3d'
import { useRecoilValue } from 'recoil'
import { stage1 } from '../utils/atom'

useGLTF.preload('/assets/models/popup.glb')

export function MotionStage({position}) {
  const { nodes, materials } = useGLTF('/assets/models/popup.glb')
  const texture = useTexture('/assets/images/github.png')
  const stage = useRecoilValue(stage1)

  const [ref] = useBox(() => ({
    args:[1,1,0.3],
    position,
    type:"Static",
  }), useRef(null))

  const x = position[0];
  const y = position[1];
  const z = position[2];

  return (
    <group>
      <motion.mesh
        scale={0.5}
        position={[x,y-0.5,z+1]}
        rotation-x={-Math.PI/2}
        animate={!stage?
            {
              opacity:[0.3,0.5],
              y:[0.05,0.5,0.05],
              transition:{
                duration:2,
                ease:'easeInOut',
                delay:0.3,
                repeat:Infinity
              }
          }:{
            y:0.05,
            transition:{
              duration:2,
              ease:'easeInOut',
            }
          }
        }
      >
        <circleGeometry args={[1,32]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} />
      </motion.mesh>
      <mesh scale={0.5} position={[x,y-0.5, z+1]} rotation-x={-Math.PI/2}>
        <circleGeometry args={[1,32]} position={[x,y,z+1]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} />
      </mesh>

      <group ref={ref} scale={0.3}>
        <mesh geometry={nodes.body.geometry} material={materials.Material} position={[0.004, 0.2, 0.065]} scale={[1.957, -1.036, 0.135]} />
        <Picture nodes={nodes} texture={texture} />
        {
          stage &&
          <Html center>
            <div className="information enter">
              <img alt="enter" src={'/assets/images/enter.png'} />
              <p>Enter</p>
            </div>
          </Html>
        }
      </group>
    </group>
  )
}

