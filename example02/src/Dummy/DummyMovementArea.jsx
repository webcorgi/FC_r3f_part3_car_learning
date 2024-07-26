import { useBox } from "@react-three/cannon";
import { useRef } from "react";

const DummyMovementArea = ({position}) => {

    const [ref, api] = useBox(() => ({ // useBox를 통해서 만드니까 중력과 충돌에 영향 받음
        args:[1,0.2,1],
        position,
        mass:1,
        type:"Kinematic", // 충돌하면 충돌한 물체가 함께 움직임
    }),useRef(null))

    return (
        <mesh ref={ref} onClick={() => api.velocity.set(0,0.1,0)}> {/* 클릭시 서서히 위로 올라감 */}
            <boxGeometry args={[1,0.2,1]} />
            <meshNormalMaterial />
        </mesh>
    )
}

export default DummyMovementArea;