import { Text, Text3D } from "@react-three/drei"

const HowToPlay = () => {

    const fontUrl = '/assets/fonts/Pretendard.json' // 반드시 json 파일로 되어야한다.

    const fontStyle={
        font:fontUrl,
        size:0.15,
        letterSpacing:0.01,
        height:0.02,
        lineHeight:1,
        fontSize:1,
        /* 
        bevelEnabled={true} // bevel: 글자를 부드럽게 만듦
        bevelOffset={0.01} // bevel: 글자를 부드럽게 만듦
        bevelThickness={0.1} // bevel: 글자를 부드럽게 만듦
            */
    }

    return(
        <group position={[0.5,0,1.2]} rotation={[-Math.PI/2,0,0]}>
            <Text3D {...fontStyle}>
                How To Play
                <meshNormalMaterial/>
            </Text3D>
            <group position={[0.3,-0.5,0]}>
                <Text3D position={[0.2,0.2,0]} {...fontStyle}>
                    ↑
                    <meshNormalMaterial/>
                </Text3D>
                <Text3D {...fontStyle}>
                    ←↓→
                    <meshNormalMaterial/>
                </Text3D>
            </group>
        </group>
    )
}
export default HowToPlay