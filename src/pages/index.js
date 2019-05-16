import React from 'react'
import { navigate } from 'gatsby'

import View from '../components/canvas/canvas'
import Scene from '../components/canvas/scene'
import Layout from '../components/layouts'
import Caption from '../components/caption'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'
// import Fonts from '../scss/style.js'

// As the user approaches the website, an imposing museum facade looms in the index..

// note the path is relative to the 'static' directory
// at the root of the project. .glTF files (or binary, in this case)
// are not natively supported by webpack, and cannot be imported as the css above.
const IndexPage = () => (
  <Layout>
    <View>
      <mesh
        position={[0, 1, -4]}
        onClick={ () => navigate("/people/") }>
        <planeBufferGeometry attach="geometry" args={[2, 2]} />
        <meshLambertMaterial attach="material" transparent />
      </mesh>
      <Scene url={'meshes/SP_index3.glb'} />
    </View>
    <Caption />
  </Layout>
)

export default IndexPage
