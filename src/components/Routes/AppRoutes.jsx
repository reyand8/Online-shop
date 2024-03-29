import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '../../utils/routes';

import Home from '../Home/Home';
import SingleProduct from '../Products/SingleProduct';
import Profile from '../Profile/Profile';
import SingleCategory from '../Categories/SingleCategory';
import Basket from '../Basket/Basket';
import Wishlist from '../Wishlist/Wishlist';

const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
        <Route path={ROUTES.BASKET} element={<Basket />} />
        <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
    </Routes>
);

export default AppRoutes;