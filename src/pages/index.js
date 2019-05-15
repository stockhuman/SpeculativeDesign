import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRender } from 'react-three-fiber'

import View from '../components/canvas/canvas'
import Layout from '../components/layouts'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'
// import Fonts from '../scss/style.js'

// As the user approaches the website, an imposing museum facade looms in the index..
const IndexTemple = () => {

  const loader = new GLTFLoader()
  /*
   * useRender hooks into the three render pipeline, which as set in the View
   * component does not re-render every frame. By using this hook,
   * we call a single re-render when the geometry is loaded.
   */
  useRender(({ gl, scene, camera }) => {
    // note the path is relative to the 'static' directory
    // at the root of the project. .glTF files (or binary, in this case)
    // are not natively supported by webpack, and cannot be imported as the css above.
    loader.load('meshes/SP_index2.glb', gltf => {
      scene.add(gltf.scene)
      gl.render(scene, camera)
    })
  })

  // even though the mesh is added outside of react as it's fully static,
  // return a placeholder mesh within the fiber framework for interactivity
  return (
    <mesh
      position={[0, 1, -4]}
      onClick={e => console.log('click')}>
        <planeBufferGeometry attach="geometry" args={[2, 2]} />
        <meshLambertMaterial attach="material" transparent />
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
