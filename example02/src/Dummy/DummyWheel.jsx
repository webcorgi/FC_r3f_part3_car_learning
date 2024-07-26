
const DummyWheel = ({wheelRef, radius}) => {

    return (
        <group ref={wheelRef}>
            <mesh rotation={[0,0,-Math.PI/2]}>
                <cylinderGeometry args={[radius,radius,0.25,16]} />
                <meshNormalMaterial />
            </mesh>
        </group>
    )
}

export default DummyWheel;