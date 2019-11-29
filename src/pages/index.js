import React, { Suspense } from 'react'
import { navigate } from 'gatsby'

// Page Structure
import View from '../components/canvas/canvas'
import Model from '../components/canvas/Model'
import Layout from '../components/layouts/page'
import Sidebar from '../components/layouts/Sidebar'

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
const IndexPage = () => (
  <Layout>
    <View center={[0, 1.3, 8]}>
      <mesh
        position={[0, 1, -4]}
        onClick={ () => navigate("/about/") }>
        <planeBufferGeometry attach="geometry" args={[2, 2]} />
        <meshLambertMaterial attach="material" visible={false} />
      </mesh>
      <Suspense fallback={null}>
        <Model url={'meshes/entrance_facade.003.glb'} />
        <Model url={'meshes/entrance_index.glb'} />
        <Model url={'meshes/entrance_lattice.glb'} />
        <Model url={'meshes/floorplane.glb'} />
      </Suspense>
      <ambientLight intensity={0.1}/>
      <spotLight intensity={4} position={[1, 2, 10]} angle={0.4} penumbra={0.5} castShadow />
      <spotLight intensity={2} position={[3, 4, 10]} angle={2} penumbra={2} />
      <fog attach="fog" args={['black', 0.01, 6000]} />
    </View>
    <Sidebar />
  </Layout>
)

export default IndexPage
