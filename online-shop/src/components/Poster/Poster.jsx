import React from "react";

import styles from '../../styles/Home.module.css'
import BG from '../../images/computer.png'

const Poster = () => (
    <section className={styles.home}>
        <div className={styles.title}>
            BIG SALE
        </div>
        <div className={styles.product}>
            <div className={styles.text}>
                <div className={styles.subtitle}>Only today</div>
                <h1 className={styles.head}>FLASH SALE! -30%</h1>
                <button className={styles.button}>BUY NOW</button>
            </div>
            <div className={styles.image}>
                <img src={BG} alt="product-img"/>
            </div>
        </div>
    </section>
)

export default Poster