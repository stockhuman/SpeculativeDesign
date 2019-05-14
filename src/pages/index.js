/* @meta
	layout: home
*/

import React from 'react'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import View from '../components/canvas/canvas'
import Layout from '../components/layouts/home'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'
// import Fonts from '../scss/style.js'

// As the user approaches the website, an imposing museum facade looms in the index..
const IndexTemple = () => {
  // const obj = useMemo(() => new GLTFLoader().load('../assets/meshes/icosphere.glb', gltf => gltf))

  return (
    <mesh visible userData={{ test: "hello" }} position={[1, 2, 3]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial attach="material" color="indianred" transparent />
    </mesh>
  )
}


const IndexPage = () => (
  <Layout>
    <View>
      <IndexTemple />
    </View>
  </Layout>
)

export default IndexPage
