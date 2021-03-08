import React from 'react'
// import { useFrame } from 'react-three-fiber'

import {
	Vector3,
	CatmullRomCurve3,
	ExtrudeGeometry,
	Shape
} from 'three'


export default function Sculpture() {

	return (
		<group position={[0, 1, 0]}>
			<Template />
		</group>
	)
}

// Useful inspiration
// http://www.smartjava.org/ltjs3/src/chapter-10/22-canvas-texture.html
// https://mattdesl.svbtle.com/shaping-curves-with-parametric-equations
// https://machines.chromeexperiments.com/

function Template (props) {
	// This reference will give us direct access to the mesh
	// const mesh = useRef()

	// Rotate mesh every frame, this is outside of React without overhead
	// useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

	return (
		<mesh
			{...props}
			// ref={mesh}
			geometry={new Spring(Math.random()*0.3, Math.random(), 1)}
			>
			<meshNormalMaterial attach="material" />
		</mesh>
	)
}

//	makes a circle three.js shape
function makeCircleShape(radius, segments) {
	var s = new Shape();
	var p = segments;
	var d = 360 / p;
	var r = radius;

	s.moveTo(r, 0);
	for (var a = d; a < 360; a += d) {
		var ang = a * 0.0174532925;
		var x = Math.cos(ang) * r;
		var y = Math.sin(ang) * r;
		s.lineTo(x, y);
	}
	return s;
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

function Spring(size, height, iterations) {
	let _size = size ? size : 1;
	let _height = height ? height : 1;
	let path = [];
	let len = 0;
	let radius = _size;
	let _iterations = iterations ? iterations : 6;
	let detail = 8;
	let lenSpace = _height / _iterations / detail;
	for (let t = 0; t < _iterations; t++) {
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
	let ribbon = new Ribbon(path, shape, _iterations * (detail * detail) * 0.5);
	return ribbon;
}
