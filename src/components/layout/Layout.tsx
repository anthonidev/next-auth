import Head from "next/head"
import { Props } from '../../types/types';
import React from 'react'


const Layout: React.FC<Props> = ({ title, content, children }) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Head>

      <main>{children}</main>
    </>
  )
}


Layout.defaultProps = {
  title: 'Surf',
  content: 'Surf'
}
export default Layout