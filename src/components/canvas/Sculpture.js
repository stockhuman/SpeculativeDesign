import React from 'react'
import { DoubleSide } from 'three/src/constants';

export default function Sculpture ({ seed = 'default' }) {

	let s = 1000
	for (let i = 0; i < seed.length; i++) {
		s % seed.charCodeAt(i)
	}

	const fn = (a, b, target) => {
		let x = -Math.random() * a  + Math.random() * a
		let y = -Math.random() * a + Math.random() * b
		let z = (Math.sin(s * Math.PI) + Math.sin(s * Math.PI)) * -a/b + Math.random()

		target.set(x, y, z)
	}

	return (
		<mesh>
			<parametricGeometry attach="geometry" args={[fn, 25, 25]} />
			<meshPhysicalMaterial attach="material" side={DoubleSide}/>
		</mesh>
	)
}

// Useful inspiration
// http://www.smartjava.org/ltjs3/src/chapter-10/22-canvas-texture.html
// https://mattdesl.svbtle.com/shaping-curves-with-parametric-equations
