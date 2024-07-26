// width, height, front, radius
// [wheels, wheelInfos]

import { useCompoundBody } from "@react-three/cannon"
import { useRef } from "react"

const useWheels = (width, height, front, radius) => {

    const wheels = [useRef(null),useRef(null),useRef(null),useRef(null),]

    const wheelInfo = { // 차의 각종 속성 값
        radius,
        directionLocal:[0,-1,0],
        axleLocal:[1,0,0],
        suspensionStiffness:25,
        suspensionRestLength:0.1,
        frictionSlip:5,
        dampingRelaxation:1,
        dampingCompression:1,
        maxSuspensionForce:100000,
        rollInfluence:0.01,
        maxSuspensionTravel:0.3,
        customSlidingRotationalSpeed:-30,
        useCustomSlidingRotationalSpeed:true,
        sleepSpeedLimit:0.01,
    }

    // 바퀴 4개 위치
    const wheelInfos = [
        {
            ...wheelInfo,
            chassisConnectionPointLocal:[-width * 0.65, height * 0.3, front] // 휠의 위치
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal:[width * 0.65, height * 0.3, front]
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal:[-width * 0.65, height * 0.3, -front]
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal:[width * 0.65, height * 0.3, -front]
        }
    ]

    const wheelFunc = () => ({
        collisionFilterGroup:0, // collision(충돌) 그룹을 만들지 않는다는 뜻 => 요소간 서로 충돌이 일어나지 않는다.
        mass:50,
        shapes:[
            {
                args:[wheelInfo.radius, wheelInfo.radius, 0.25, 16],
                rotation:[0, 0, -Math.PI/2],
                type:"Cylinder"
            }
        ]
        // ,onCollide:(e) => console.log(e.collisionFilters) // 요소간 충돌이 일어나는지 볼 수 있음
    })

    useCompoundBody(wheelFunc, wheels[0])
    useCompoundBody(wheelFunc, wheels[1])
    useCompoundBody(wheelFunc, wheels[2])
    useCompoundBody(wheelFunc, wheels[3])

    return [wheels, wheelInfos]
}
export default useWheels