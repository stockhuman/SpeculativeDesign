// https://github.com/react-spring/react-three-fiber/discussions/440#discussioncomment-20655
// https://github.com/youroff/planet_disco

import React, { useRef, useEffect } from 'react'
import { Vector3, Matrix4, Quaternion, MathUtils } from 'three'
import { useThree, useFrame } from 'react-three-fiber'
import { useGesture } from 'react-use-gesture'
import { useSpring, a } from '@react-spring/three'

export function Controls({
	speed = 5,
	maxDist = 8,
	minDist = 1.5,
	distance = 5,
	phi = Math.PI / 2,
	theta = 2 * Math.PI,
}) {
	const camera = useRef()
	const { gl, setDefaultCamera } = useThree()
	const [{ props }, set] = useSpring(() => ({
		props: [distance || maxDist, phi, theta],
	}))

	const calcPosition = (d, phi, theta) => {
		const ext = new Vector3().setFromSphericalCoords(
			d - 1,
			phi + ((1 - (d - minDist) / (maxDist - minDist)) * Math.PI) / 3,
			theta
		)
		return getPoi(phi, theta).add(ext).toArray()
	}

	useGesture(
		{
			onDrag: ({ dragging, velocities: [x, y] }) => {
				if (dragging) {
					const [distance, phi, theta] = props.get()
					const k = Math.sqrt(distance + 100) / speed
					const p = MathUtils.clamp(phi - y / k, 0.1, Math.PI - 0.1)
					const t = theta - x / k
					set({ props: [distance, p, t] })
				}
			},
			onPinch: ({ movement: [y] }) => {
				const [distance, phi, theta] = props.get()
				const k = 1 + (Math.sign(y) * Math.min(8 * Math.abs(y), 20)) / (20 + 10)
				const d = MathUtils.clamp(k * distance, minDist, maxDist)
				set({ props: [d, phi, theta] })
			},
			onWheel: ({ velocities: [, y] }) => {
				const [distance, phi, theta] = props.get()
				const k = 1 + (Math.sign(y) * Math.min(8 * Math.abs(y), 20)) / (20 + 10)
				const d = MathUtils.clamp(k * distance, minDist, maxDist)
				set({ props: [d, phi, theta] })
			},
		},
		{ domTarget: gl.domElement }
	)
	useEffect(() => void setDefaultCamera(camera.current))
	useFrame(() => camera.current.updateMatrixWorld())
	useEffect(() => void set({ props: [distance, phi, theta], delay: 400 }), [
		distance,
		phi,
		theta,
	])
	return (
		<a.perspectiveCamera
			ref={camera}
			position={props.to(calcPosition)}
			quaternion={props.to((distance, phi, theta) => {
				const poi = getPoi(phi, theta)
				const pos = new Vector3(...calcPosition(distance, phi, theta))
				const up = pos.clone().sub(poi).dot(new Vector3(poi.x, 0, poi.z))
				const m = new Matrix4().lookAt(
					pos,
					poi,
					new Vector3(0, Math.sign(up), 0)
				)
				return new Quaternion().setFromRotationMatrix(m).toArray()
			})}
		/>
	)
}

const getPoi = (phi, theta) =>
	new Vector3().setFromSphericalCoords(1, phi, theta)
