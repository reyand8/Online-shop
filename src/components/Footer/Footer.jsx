import React from 'react';
import {Link} from 'react-router-dom';

import styles from '../../styles/Footer.module.css';
import {ROUTES} from '../../utils/routes';
import LOGO from '../../images/logo.png';
import sprite from '../../images/sprite.svg';
const Footer = () => {
    return (
        <section className={styles.footer}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="logo-img"/>
                </Link>
            </div>
            <div className={styles.rights}>
                Developed by Reyand8
            </div>
            <div className={styles.socials}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={sprite + '#instagram'}/>
                    </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={sprite + '#facebook'}/>
                    </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={sprite + '#youtube'}/>
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default Footer;