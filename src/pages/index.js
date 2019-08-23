import React, { useMemo } from 'react'
import { navigate } from 'gatsby'

// Page Structure
import View from '../components/canvas/canvas'
import Model from '../components/canvas/Model'
import Layout from '../components/layouts/page'
import Log from '../components/log'

// Materials and Loaders from Three
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshPhysicalMaterial } from "three/src/materials/MeshPhysicalMaterial";
import { MeshMatcapMaterial } from 'three/src/materials/MeshMatcapMaterial'
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
    <View center={[0, 0.2, 8]}>
      <mesh
        position={[0, 1, -4]}
        onClick={ () => navigate("/about/") }>
        <planeBufferGeometry attach="geometry" args={[2, 2]} />
        <meshLambertMaterial attach="material" visible={false} />
      </mesh>
      <Model
        url={'meshes/entrance_facade.glb'}
        material={new MeshMatcapMaterial({
          matcap: useMemo(() => new TextureLoader().load('textures/Bronze.png'), ['textures/Shiny_Fire_1c.png'])
          })
      } />
      <Model url={'meshes/entrance_index.glb'} />
      <Model url={'meshes/entrance_lattice.glb'} material={new MeshNormalMaterial()} />
      <Model url={'meshes/floorplane.glb'} material={new MeshPhysicalMaterial({color:0x2194ce, roughness: 0.9})}/>

      <directionalLight intensity={0.5} position={[-25, 25, -25]} />
      <spotLight intensity={2} position={[1, 2, 10]} angle={0.4} penumbra={0.5} castShadow />
    </View>
    <Log />
  </Layout>
)

export default IndexPage
