import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { ROUTES } from '../../utils/routes';

import styles from '../../styles/Product.module.css';

import { addItemToBasket, addItemToWishlist } from '../../features/user/userSlice';

const SIZES = [3.5, 4, 4.5, 5];

const Product = (item) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(({ user }) => user);
    const { title, price, images, description } = item;
    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setCurrentSize] = useState();

    useEffect(() => {
        if (!images.length) return;
        setCurrentImage(images[0]);
    }, [images]);

    const addToBasket = () => {
        if (!currentUser) {
            navigate('/profile');
        } else {
            dispatch(addItemToBasket(item));
        }
    };

    const addToWishlist = () => {
        if (!currentUser) {
            navigate('/profile');
        } else {
            dispatch(addItemToWishlist(item));
        }
    };

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div
                    className={styles.current}
                    style={{ backgroundImage: `url(${currentImage})` }}
                />
                <div className={styles['images-list']}>
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className={styles.image}
                            style={{ backgroundImage: `url(${image})` }}
                            onClick={() => setCurrentImage(image)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}$</div>
                <div className={styles.color}>
                    <span>Color:</span> Green
                </div>
                <div className={styles.sizes}>
                    <span>Sizes:</span>
                    <div className={styles.list}>
                        {SIZES.map((size) => (
                            <div
                                onClick={() => setCurrentSize(size)}
                                className={`${styles.size} ${
                                    currentSize === size ? styles.active : ''}`}
                                key={size}>
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.actions}>
                    <button
                        onClick={addToBasket}
                        className={styles.add}
                        disabled={!currentSize}>
                        Add to cart
                    </button>
                    <button
                        onClick={addToWishlist}
                        disabled={!currentSize}
                        className={styles.favourite}>Add to favourites</button>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.purchase}>12 people purchased</div>
                    <Link to={ROUTES.HOME}>Return to shop</Link>
                </div>
            </div>
        </section>
    );
};

export default Product;