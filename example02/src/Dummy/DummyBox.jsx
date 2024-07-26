const DummyBox = (props) => {
    const {args} = props

    const [ref] = useBox(()=>({
        args:args,
        mass:50,
        type:"Dynamic",
        ...props,
    }))

    return (
        <mesh>
            <boxGeometry args={args} />
            <meshBasicMaterial color={"blue"} transparent />
        </mesh>
    )
}

export default DummyBox;