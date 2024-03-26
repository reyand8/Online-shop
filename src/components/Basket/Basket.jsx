import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBasket, removeItemFromBasket,
} from '../../features/user/userSlice';

import styles from '../../styles/Basket.module.css';
import { sumBy } from '../../utils/common';
import {Link} from 'react-router-dom';

const Basket = () => {
    const dispatch = useDispatch();
    const { basket } = useSelector(({ user }) => user);

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToBasket({ ...item, quantity }));
    };

    const removeItem = (id) => {
        dispatch(removeItemFromBasket(id));
    };

    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Your basket</h2>
            {!basket.length ? (
                <div className={styles.empty}>Your shopping basket is empty</div>
            ) : (
                <>
                    <div className={styles.list}>
                        {basket.map((item) => {
                            const { title, category, images, price, id, quantity } = item;
                            return (
                                <div className={styles.item} key={id}>
                                    <Link to={`/products/${id}`} key={id} className={styles.item_link}>
                                        <div
                                            className={styles.image}
                                            style={{ backgroundImage: `url(${images[0]})` }}
                                        />
                                        <div className={styles.info}>
                                            <h3 className={styles.name}>{title}</h3>
                                            <div className={styles.category}>{category.name}</div>
                                        </div>
                                        <div className={styles.price}>{price}$</div>
                                        <div className={styles.quantity}>
                                            <div
                                                className={styles.minus}
                                                onClick={() =>
                                                    changeQuantity(item, Math.max(1, quantity - 1))
                                                }
                                            >
                                                <svg className="icon">
                                                    <use
                                                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                                                    />
                                                </svg>
                                            </div>
                                            <span>{quantity}</span>
                                            <div
                                                className={styles.plus}
                                                onClick={() =>
                                                    changeQuantity(item, Math.max(1, quantity + 1))
                                                }>
                                                <svg className="icon">
                                                    <use
                                                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={styles.total}>{price * quantity}$</div>
                                        <div
                                            className={styles.close}
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <svg className="icon">
                                                <use
                                                    xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.total}>
                            TOTAL PRICE:{' '}
                            <span>
                                {sumBy(basket.map(({ quantity, price }) => quantity * price))}$
                            </span>
                        </div>
                        <button className={styles.proceed}>Proceed to checkout</button>
                    </div>
                </>
            )}
        </section>
    );
};

export default Basket;