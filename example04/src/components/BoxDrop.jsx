import { useRecoilValue } from "recoil"; // Recoil 상태 관리를 위한 hook을 가져옵니다.
import { stage2 } from "../utils/atom"; // stage2 atom을 가져옵니다.
import { useEffect, useState } from "react"; // React의 useEffect와 useState hook을 가져옵니다.
import { useBox } from "@react-three/cannon"; // 물리 엔진을 위한 hook을 가져옵니다.
import { useFrame } from "@react-three/fiber"; // 매 프레임마다 호출되는 함수를 위한 hook을 가져옵니다.

// 박스 색상을 정의합니다.
const colors = ['#ff4b91','#ffcd48','#445d48','#ff4525','#ff4b91','#ff8971'];
const MAX_BOX_COUNT = 200; // 최대 박스 개수를 정의합니다.

export function BoxDrop() {
    const flood = useRecoilValue(stage2); // stage2 atom의 값을 가져옵니다.
    const [boxs, setBoxs] = useState([]); // 박스 상태를 관리하는 useState를 사용합니다.

    // 랜덤 박스를 생성하는 함수입니다.
    const generateRandomBox = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // 랜덤 색상을 선택합니다.
        const x = -6 - Math.random() * 5; // 랜덤 x 위치를 설정합니다.
        const y = 3 + Math.random() * 5; // 랜덤 y 위치를 설정합니다.
        const z = -7 + Math.random() * 14; // 랜덤 z 위치를 설정합니다.

        return {
            color: randomColor,
            position: [x, y, z],
            args: [0.2, 0.2, 0.2] // 박스 크기를 설정합니다.
        };
    };

    // 랜덤 박스를 추가하는 함수입니다.
    const addRandomBox = () => {
        if (boxs.length < MAX_BOX_COUNT) { // 현재 박스 개수가 최대 개수보다 적은 경우
            setBoxs((currBoxs) => [...currBoxs, generateRandomBox()]); // 새로운 박스를 추가합니다.
        }
    };

    useEffect(() => {
        if (flood) addRandomBox(); // flood 값이 true인 경우 랜덤 박스를 추가합니다.
    }, [flood]);

    /* useFrame((_, delta) => { // 델타값은 정수로 사용하긴 좀 어렵다. 그래서 아래코드 사용
        console.log(delta)
    }) */
    useFrame(({ clock }) => { // 매 프레임마다 호출됩니다.
        const elapsedTime = Math.floor(clock.getElapsedTime()); // 경과 시간을 정수로 변환합니다.
        console.log(elapsedTime);
        if (flood && elapsedTime % 5 === 0) { // flood 값이 true이고 경과 시간이 5의 배수인 경우
            addRandomBox(); // 랜덤 박스를 추가합니다.
        }
    });

    return boxs.map((boxinfo, i) => <Box key={i} {...boxinfo} />); // 박스를 렌더링합니다.
}

function Box({ color, args, position = [0, 1, 0] }) {
    const [ref] = useBox(() => ({
        mass: 1, // 박스의 질량을 설정합니다.
        args: args, // 박스 크기를 설정합니다.
        position // 박스 위치를 설정합니다.
    }));

    return (
        <mesh ref={ref}> // 박스 메쉬를 생성합니다.
            <boxGeometry args={args} /> // 박스 지오메트리를 설정합니다.
            <meshStandardMaterial color={color} /> // 박스 재질을 설정합니다.
        </mesh>
    );
}
