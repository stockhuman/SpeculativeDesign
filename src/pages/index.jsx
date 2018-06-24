import React from 'react'
import Link from 'gatsby-link'

import HomeCanvas from '../components/home-canvas'

const IndexPage = ({data}) => (
  <div>
    <HomeCanvas/>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
