import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'


export default function Sculpture({ seed = 'default' }) {

	return (
		<group position={[0, 1, 0]}>
			<Box />
		</group>
	)
}

// Useful inspiration
// http://www.smartjava.org/ltjs3/src/chapter-10/22-canvas-texture.html
// https://mattdesl.svbtle.com/shaping-curves-with-parametric-equations
// https://machines.chromeexperiments.com/

function Template ({}) {
	return (
		<mesh>
			<meshBasicMaterial attach="material" color={0x000000} />
		</mesh>
	)
}

function Box(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef()

	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)

	// Rotate mesh every frame, this is outside of React without overhead
	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
			onClick={e => setActive(!active)}
			onPointerOver={e => setHover(true)}
			onPointerOut={e => setHover(false)}>
			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			<meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

function Ribbon(path, shape, steps) {
	let _steps = steps ? steps : 32;
	let splineCurve = new CatmullRomCurve3(path);
	let extrudeSettings = {
		bevelEnabled: false,
		steps: _steps,
		extrudePath: splineCurve,
	}
	let geometry = new ExtrudeGeometry([shape], extrudeSettings);

	return geometry;
}

function Spring(size = 1, height = 1, iterations = 6) {
	let path = [];
	let len = 0;
	let radius = size;
	let detail = 8;
	let lenSpace = height / iterations / detail;

	for (let t = 0; t < iterations; t++) {
		for (let i = 0; i < detail; i++) {
			let ang = i / detail * Math.PI * 2;
			let x = Math.cos(ang) * radius;
			let y = Math.sin(ang) * radius;
			let z = len;
			len += lenSpace;
			path.push(new Vector3(x, y, z));
		}
	}
	let shape = makeCircleShape(1, 4);
	let ribbon = new Ribbon(path, shape, iterations * (detail * detail) * 0.5);
	return ribbon;
}
