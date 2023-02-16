import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Polychromatic() {

    const [image, setImage] = useState([])
    const [images, setImages] = useState([])
    const [time, setTime] = useState('Loading');
    const [date, setDate] = useState('');
    const [coords, setCoords] = useState({});

    const apiKey = "jzW3Qvyu32qy8tjdBc9H5JQE6JhVWvJrJffm5LCw"
    const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`

    const getPolychromaticData = async () => {
        const res = await axios.get(url);
        const data = await res.data;
        console.log(data)

        const caption = data[0].caption;
        const date = data[0].date.split(" ")[0];

        const date_formatted = date.replaceAll("-","/");

        let times = [];
        let images = [];

        for (let i = 0; i < data.length; i++) {
            let time = data[i].date.split(" ")[1];
            let coords = data[i].centroid_coordinates;
            let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${data[i].image}.png`
            
            //console.log(image)
            times.push(time);
            images.push({
                image: image,
                time: time,
                coords: coords
            })
        }

        setDate(date)
        setImages(images)
        
        setImage(images[0].image);
        setTime(times[0])
        setCoords([images[0].coords.lat, images[0].coords.lon])

        console.log(image)
    }

    useEffect(()=> {
        getPolychromaticData();
    }, [])

    return(

        <div className={styles.main}>

            <Head>
                <title>NASA APIs : EPIC </title>
                <link rel="icon" href="https://freepngimg.com/save/23041-nasa-image/2000x1700" />
            </Head>

            <h1>Earth Polychromatic Imaging Camera</h1>
            <p>The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides full disc imagery of the Earth and captures unique perspectives of certain astronomical events such as lunar transits using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain telescope</p>
            <a href='/'> <button className={styles.button}>back</button></a>
            <div className={styles.main}>
                <div className={styles.info}>
                    <div>Time: {time}</div>
                    <div>Coordinates: {coords[0]}, {coords[1]}</div>
                    <img className={styles.epicImage} src={image} alt="image" width={400} height={400} quality={20} loading='lazy' />
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr className={styles.header}>
                            <th>Time <hr /></th>
                            <th>Latitude <hr /></th>
                            <th>Longitude <hr /></th>
                            <th>Image <hr /></th>
                            <th> View <hr /></th>
                        </tr>

                    </thead>
                    <tbody>
                        {images.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <th>{e.time}</th>
                                    <td><code>{e.coords.lat}</code></td>
                                    <td><code>{e.coords.lon}</code></td>
                                    <td><img className={styles.epicImage} src={e.image} alt={i} width={200} height={200} /></td>
                                    <td><button className={styles.button} onClick={() => {
                                        setImage(e.image);
                                        setTime(e.time);
                                        setCoords([e.coords.lat, e.coords.lon])
                                        console.log(images[i].image);
                                        document.body.scrollIntoView();
                                    }}>View</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <footer className={styles.footer}>
                -- Images brought to you by NASA's EPIC API --
            </footer>
        </div>
    )
}