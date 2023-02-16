import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {

  const [data, setData]=useState();

  const apiKey = "Nh7ETtTdDbemSTNKXjIZpqIWd6YXYOvFcZkdSq07"
  const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`

  const getTransferData = async () => {
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info);
  }

  useEffect(() => {
    getTransferData()
  }, [])

  return (
    <div className={styles.main}>
      
      <Head>
        <title>NASA APIs : Tech Transfer</title>
        <link rel="icon" href="https://freepngimg.com/save/23041-nasa-image/2000x1700" />
      </Head>

      <h1>Nasa API: <br /> TechTransfer</h1>
      <p>NASA's Technology Transfer Program ensures that innovations developed for exploration and discovery are broadly available to the public.</p>
      <a href='/'> <button className={styles.button}>back</button></a>
      <main className={styles.container}>
        {
          data && data.results.map((tech, index) => {
            return (
              <div key={index}>
                {
                  tech && tech.map((t, ind) => {
                    if (ind == 10) {
                      return (
                        <Image className={styles.Image} src={t} alt={t} key={ind} width={100} height={100} />
                      )
                    }
                  })
                }

              </div>
            )
          })
        }
      </main>
      <footer className={styles.footer}>
        -- Images brought to you by NASA's TechTransfer API --
      </footer>
    </div>
  )
}
