import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layouts/page'

const NotFoundPage = () => (
  <Layout>
    <h1>404</h1>
    <p>Seems like the absecence of things is still a constant, no matter the world imagined.</p>
    <Link to='/'>Go home?</Link>
  </Layout>
)

export default NotFoundPage
