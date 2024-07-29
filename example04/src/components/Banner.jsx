import { useBox } from "@react-three/cannon";
import { useEffect, useRef, useState } from "react";
import { Html, useTexture } from "@react-three/drei";

const Banner = ({position}) => {
    const texture = useTexture('/assets/images/fastcampus.webp')
    const [info, setInfo] = useState(false);

    const [ref] = useBox(() =>({
        args:[5,2,2],
        position,
        type:"Static",
        onCollide:handlecollsion
    }), useRef(null))

    // 메시지 띄우기
    const handlecollsion=() => {
        setInfo(true)
    }

    // 1초후 메시지 지우기
    useEffect(() => {
        let timeout;
        if(info){
            timeout = setTimeout(() => setInfo(false),1000)
        }
        return () => clearTimeout(timeout)
    }, [info]);

    const onHandleHistory = () => {
        const url = 'https://www.naver.com'
        window.open(url,'_blank')
    }

    return(
        <mesh ref={ref} onClick={onHandleHistory}>
            <boxGeometry args={[5,2,2]} />
            <meshStandardMaterial map={texture} />
            {info &&
                <Html center>
                    <div className="information">마우스를 클릭 해보세요</div>
                </Html>
            }
        </mesh>
    )
}

export default Banner;