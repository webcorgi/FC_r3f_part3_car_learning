import { useEffect, useState } from "react";

const useVehicleControls = (vehicleApi, chassisApi) => {
    const [controls, setControls] = useState({});

    useEffect(() => {
        const keyDownPressHandler = (e) => {
            setControls((controls) => ({
                ...controls, [e.key] : true,
            }))
            console.log('Down', e) // 키보드 눌러보면 콘솔에 잘찍힘. 상하좌우 파악가능
        }
        const keyUpPressHandler = (e) => {
            setControls((controls) => ({
                ...controls, [e.key] : false,
            }))
            console.log('Up', e) // 키보드 눌러보면 콘솔에 잘찍힘. 상하좌우 파악가능
        }

        window.addEventListener('keydown', keyDownPressHandler)
        window.addEventListener('keyup', keyUpPressHandler)

        return () => {
            window.removeEventListener('keydown', keyDownPressHandler)
            window.removeEventListener('keyup', keyUpPressHandler)
        }
    }, []);

    // 상하좌우 버튼 누를 시
    useEffect(() => {
        console.log(vehicleApi)
        if(controls.ArrowUp){
            vehicleApi.applyEngineForce(120, 2)
            vehicleApi.applyEngineForce(120, 3)
        }else if(controls.ArrowDown){
            vehicleApi.applyEngineForce(-120, 2)
            vehicleApi.applyEngineForce(-120, 3)
        }
        /* else if(controls.Enter){ // Brake
            vehicleApi.setBrake(1, 2)
            vehicleApi.setBrake(1, 3)
        } */
        else{
            vehicleApi.applyEngineForce(0, 2)
            vehicleApi.applyEngineForce(0, 3)
        }

        if(controls.ArrowLeft){
            vehicleApi.setSteeringValue(-0.1,0)
            vehicleApi.setSteeringValue(-0.1,1)
            vehicleApi.setSteeringValue(0.35,2)
            vehicleApi.setSteeringValue(0.1,3)
        }else if(controls.ArrowRight){
            vehicleApi.setSteeringValue(0.1,0)
            vehicleApi.setSteeringValue(0.1,1)
            vehicleApi.setSteeringValue(-0.35,2)
            vehicleApi.setSteeringValue(-0.1,3)
        }else{
            for(let i=0; i<4; i++){
                vehicleApi.setSteeringValue(0,i)
            }
        }


    }, [controls, vehicleApi, chassisApi]);

    return controls
}

export default useVehicleControls