import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from '../../styles/Header.module.css'
import LOGO from '../../images/logo.png'
import AVATAR from '../../images/avatar.svg'

import {ROUTES} from "../../utils/routes";
import {useGetProductsQuery} from "../../features/api/apiSlice";
import { toggleForm } from "../../features/user/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });
    const { currentUser, basket, wishlist } = useSelector(({ user }) => user);
    const { data, isLoading } = useGetProductsQuery({ title: searchValue });


    useEffect(() => {
        if (!currentUser) return;
        setValues(currentUser);
    }, [currentUser]);

    const handleClick = () => {
        if (!currentUser)
            dispatch(toggleForm(true));
        else navigate(ROUTES.PROFILE);
    };

    const handleSearch = ({ target: { value } }) => {
        setSearchValue(value);
    };

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="logo-img"/>
                </Link>
            </div>
            <div className={styles.info}>
                <form className={styles.form}>
                    <div className={styles.icon}>
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}/>
                        </svg>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search..."
                            autoComplete="off"
                            onChange={handleSearch}
                            value={searchValue}
                        />
                    </div>
                    {searchValue && (
                        <div className={styles.box}>
                            {isLoading ? "Loading" : !data.length ? "No results"
                                : data.map(({ title, images, id }) => {
                                    return (
                                        <Link
                                            key={id}
                                            onClick={() => setSearchValue("")}
                                            className={styles.item}
                                            to={`/products/${id}`}>
                                            <div
                                                className={styles.image}
                                                style={{ backgroundImage: `url(${images[0]})` }}
                                            />
                                            <div className={styles.title}>{title}</div>
                                        </Link>
                                    );
                                })}
                        </div>
                    )}
                </form>
                <div className={styles.account}>
                    <Link to={ROUTES.WISHLIST} className={styles.favourites}>
                        <svg className={styles["icon-fav"]}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}/>
                        </svg>
                        {!!wishlist.length && (
                            <span className={styles.count }>{wishlist.length}</span>
                        )}
                    </Link>
                    <Link to={ROUTES.BASKET} className={styles.cart}>
                        <svg className={styles["icon-cart"]}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                        </svg>
                        {!!basket.length && (
                            <span className={styles.count}>{basket.length}</span>
                        )}
                    </Link>
                    <div className={styles.user} onClick={handleClick}>
                        <div className={styles.avatar}
                            style={{backgroundImage: `url(${values.avatar})`}}/>
                        <div className={styles.username}>{values.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;