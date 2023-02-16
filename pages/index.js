import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {

  return (
    <div className={styles.homeNav}>
      
      <Head>
        <title>NASA APIs : Tech Transfer</title>
        <link rel="icon" href="https://freepngimg.com/save/23041-nasa-image/2000x1700" />
      </Head>

      <h1>Welcome to Nasa API</h1>

        <ul>
        <h2>Checkout the Following:</h2>
            <a href='/techtransfer'> <button className={styles.button}><h3> Tech Transfer</h3></button></a>
            <a href='/polychromatic'> <button className={styles.button}><h3> EPIC</h3></button></a>
        </ul>


    
    </div>
  )
}
