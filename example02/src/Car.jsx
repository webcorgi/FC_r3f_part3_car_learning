import { useControls } from "leva"
import { useBox, useCompoundBody, useRaycastVehicle } from "@react-three/cannon"
import { useRef } from "react"
import useWheels from "./utils/useWheels"
import DummyCarBody from "./Dummy/DummyCarBody"
import DummyWheel from "./Dummy/DummyWheel"
import useVehicleControls from "./utils/useVehicleControls"


const Car = () => {

    // lava
    const chassisBodyValue = useControls('chassisBody', {
        width:{value:0.16, min:0,max:1},
        height:{value:0.12, min:0,max:1},
        front:{value:0.17 * 2, min:0,max:1}
    })

    const position = [0, 0.5, 0]

    let width, height, front, mass, wheelRadius;

    width = 0.16;
    height = 0.12;
    front = 0.17;
    mass = 150;
    wheelRadius = 0.05;

    const chassisBodyArgs = [width, height, front * 2]

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)


    // 충돌체
    const [chassisBody, chassisApi] = useCompoundBody(()=> ({
        // args:chassisBodyArgs,
        position,
        mass,
        rotation:[0,Math.PI,0], // 차체가 나를 바라보게 변경
        shapes: [
            {
                args:chassisBodyArgs,
                position:[0,0,0],
                type:'Box'
            },
            {
                args:[width, height, front],
                position:[0,height,0],
                type:'Box'
            },
        ]
    }),useRef(null))

    // useRaycastVehicle > 물리엔진들을 하나로 합침
    const [vehicle, vehicleApi] = useRaycastVehicle(()=>({
        chassisBody,
        wheelInfos,
        wheels,
    }))

    useVehicleControls(vehicleApi, chassisApi)

    return (
        <group ref={vehicle}>
            {/* // 차체 */}
            <group ref={chassisBody}>
                {/* 차체 바디 */}
                <DummyCarBody
                    width={chassisBodyValue.width}
                    height={chassisBodyValue.height}
                    front={chassisBodyValue.front}
                />
            </group>
            {/* 바퀴 */}
            <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
            <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
            <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
            <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    )
}

export default Car