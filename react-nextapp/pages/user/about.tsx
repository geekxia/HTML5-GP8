import { NextPage } from 'next'

import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'

import styles from './style.module.scss'


const About: NextPage = () => {

  const jqueryLoaded = () => {
    console.log('--$', $)
  }

  return (
      <div className={styles.about}>

        <Head>
          <title>关于我</title>
        </Head>

        <Script 
          src='https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'
          strategy='lazyOnload'
          onLoad={jqueryLoaded}
        />

        <Image src='/images/you.png' width={150} height={150} />

        <h1>关于我</h1>
      </div>
  )
}

export default About