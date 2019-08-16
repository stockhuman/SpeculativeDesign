// import React from 'react'

// // Page Structure
// import View from '../components/canvas/canvas'
// import Layout from '../components/layouts'
// import Model from '../components/canvas/Model'

import Log from '../components/log'


// // Styles
// import '../scss/main.scss'
// import '../scss/layout/_base.scss'


// const Guestbook = () => {

// 	// const loader = new TextureLoader()

// 	// const textures = useMemo(
// 	// 	() => fetch('https://api.arthem.com/jars/v1/records/SP_test', {cors: 'no-cors'})
// 	// 	.then(response => response.json())
// 	// 	.then(json => json.forEach(
// 	// 		item => loader.load('data:image/jpg,' + item.data))), [textures])

// 	return (
// 		<Layout>
// 			<View center={[0,0,0]} debug={true} maxPolarAngle={Math.PI} minPolarAngle={0} far={1000}>
// 				<mesh position={[0, 0, -10]}>
// 					<sphereBufferGeometry attach="geometry" args={[2, 32, 31]} />
// 					<meshLambertMaterial attach="material" color="red" />
// 				</mesh>
// 				<Model url={'meshes/entrance_index.glb'} />
// 				<mesh>
// 					<planeBufferGeometry attach="geometry" args={[1, 1]} />
// 					<meshLambertMaterial attach="material" color="blue"/>
// 				</mesh>
// 				<ambientLight intensity={0.2} color="blue" />
// 				<spotLight intensity={2} position={[1, 2, 10]} angle={0.4} penumbra={0.5} castShadow />
// 			</View>
// 			<Log />
// 		</Layout>
// 	)
// }




import React, { useMemo } from 'react'
import { navigate } from 'gatsby'

// Page Structure
import View from '../components/canvas/canvas'
import Model from '../components/canvas/Model'
import Layout from '../components/layouts'
import Caption from '../components/caption'

// Materials and Loaders from Three
import { MeshPhysicalMaterial } from "three/src/materials/MeshPhysicalMaterial";
import { MeshNormalMaterial } from 'three/src/materials/MeshNormalMaterial'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'
// import Fonts from '../scss/style.js'

// As the user approaches the website, an imposing museum facade looms in the index..

// note the path is relative to the 'static' directory
// at the root of the project. .glTF files (or binary, in this case)
// are not natively supported by webpack, and cannot be imported as the css above.
const Guestbook = () => (
	<Layout>
		<View center={[0, 0.2, 8]}>
			<mesh
				position={[0, 1, -4]}
				onClick={() => navigate("/about/")}>
				<planeBufferGeometry attach="geometry" args={[2, 2]} />
				<meshLambertMaterial attach="material" visible={false} />
			</mesh>
			<Model url={'meshes/entrance_index.glb'} />
			<Model url={'meshes/entrance_lattice.glb'} material={new MeshNormalMaterial()} />
			<Model url={'meshes/floorplane.glb'} material={new MeshPhysicalMaterial({ color: 0x2194ce, roughness: 0.9 })} />

			<directionalLight intensity={0.5} position={[-25, 25, -25]} />
			<spotLight intensity={2} position={[1, 2, 10]} angle={0.4} penumbra={0.5} castShadow />
		</View>
		<Caption />
		<Log />
	</Layout>
)

export default Guestbook
