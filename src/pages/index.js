/* @meta
	layout: home
*/

import React from 'react'

import View from '../components/canvas/canvas'
import Layout from '../components/layouts/home'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'
// import Fonts from '../scss/style.js'

const IndexPage = () => (
  <Layout>
    <View>
      <mesh visible userData={{ test: "hello" }} position={[1, 0, 3.5]} rotation={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial attach="material" color="indianred" transparent />
      </mesh>
    </View>
  </Layout>
)

export default IndexPage
