import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layouts/page'
import Sidebar from '../components/layouts/Sidebar'
import Text from '../components/canvas/Text'
import View from '../components/canvas/canvas'

const NotFoundPage = () => (
  <Layout>
    <View center={[0, 0, 0]} background={'#000'}>
      <mesh onClick={() => navigate('/')} position={[0,0,0]}>
        <planeBufferGeometry args={[20, 20]} attach="geometry"/>
        <meshBasicMaterial attach="material" visible={false} />
      </mesh>
      <directionalLight intensity={2} position={[0, 2, 2]} />
      <Text
        string={'?'}
        options={
          {
            position: [0, 0, 0],
            color: 'white'
          }
        }
        size={2 + (Math.random() / 1.5)}
        bevelEnabled={true}
        height={0.1}
        bevelThickness={0.2}
        bevelSize={0.01}
        bevelSegments={4}
        curveSegments={8}

      />
    </View>
    <Sidebar intro={'Seems like the absecence of things is still a constant, no matter the world imagined. [404]'}/>
  </Layout>
)

export default NotFoundPage
