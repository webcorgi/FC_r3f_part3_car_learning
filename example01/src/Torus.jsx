import {useTrimesh} from '@react-three/cannon'
import { useEffect, useMemo } from 'react'
import { TorusGeometry } from 'three'

export function Torus(props){
    const geometry = useMemo(() => new TorusGeometry(0.5,0.2,16,100), [])

    const [ref,api] = useTrimesh(() => ({
        args:[
            geometry.attributes.position.array, // geometry기본 제공 값
            geometry.index.array // geometry기본 제공 값
        ],
        mass:1,
        rotation:[-Math.PI/2,0,0], // 처음 렌더링 될때 안정적으로 바닥에 붙음.
        ...props
    }))

    useEffect(() => {
        console.log(geometry) // geometry기본 제공 값 여기서 확인
    }, [ref]);

    return (
        <mesh ref={ref} 
            geometry={geometry} 
            onPointerDown={() => api.velocity.set(0,2,1)}
        >
            <meshBasicMaterial color="orange"/>
        </mesh>
    )
}