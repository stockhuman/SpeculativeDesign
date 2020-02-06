// via https://codesandbox.io/s/r3f-gamma-correction-kmb9i

import { useMemo, useEffect } from 'react'
import { useLoader, useThree, useFrame } from 'react-three-fiber'
import { BlendFunction, EffectComposer, EffectPass, RenderPass, SSAOEffect, NormalPass } from 'postprocessing'

export default function Post() {
	const { gl, scene, camera, size } = useThree()
	const composer = useMemo(() => {
		const composer = new EffectComposer(gl)
		composer.addPass(new RenderPass(scene, camera))
		const normalPass = new NormalPass(scene, camera)
		const ssaoEffect = new SSAOEffect(camera, normalPass.renderTarget.texture, {
			blendFunction: BlendFunction.MULTIPLY,
			samples: 14,
			rings: 4,
			distanceThreshold: 1, // Render distance depends on camera near&far.
			distanceFalloff: 0.0, // No need for falloff.
			rangeThreshold: 0.05, // Larger value works better for this camera frustum.
			rangeFalloff: 0.01,
			luminanceInfluence: 0.6,
			radius: 30,
			scale: 0.55,
			bias: 0.5
		})
		const effectPass = new EffectPass(camera, ssaoEffect)
		effectPass.renderToScreen = true
		composer.addPass(normalPass)
		composer.addPass(effectPass)
		return composer
	}, [])

	useEffect(() => void composer.setSize(size.width, size.height), [size])
	return useFrame((_, delta) => composer.render(delta), 1)
}
