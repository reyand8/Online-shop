import {thunk} from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

import userReducer, {
    createUser,
    loginUser,
    addItemToWishlist,
    removeItemFromWishlist,
    addItemToBasket,
    removeItemFromBasket,
    toggleForm,
    toggleFormType,
} from './userSlice';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
    currentUser: null,
    wishlist: [],
    basket: [],
    isLoading: false,
    formType: 'signup',
    showForm: false,
};

describe('userSlice', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: initialState,
        });
    });

    describe('test async actions', () => {
        test('should create user', async () => {
            const mockUser = { id: 1, name: 'User User'};
            axios.post.mockResolvedValueOnce({ data: mockUser });

            await store.dispatch(createUser(mockUser));
            const actions = store.getActions();

            expect(actions[0].type).toEqual(createUser.pending.type);
            expect(actions[1].type).toEqual(createUser.fulfilled.type);
            expect(actions[1].payload).toEqual(mockUser);
        });

        test('should log in', async() => {
            const mockLoginToken = { access_token: 'mockToken' };
            const mockUser = { id: 1,  name: 'User User' };
            axios.post.mockResolvedValueOnce({ data: mockLoginToken });
            axios.mockResolvedValueOnce({ data: mockUser });

            await store.dispatch(loginUser({ username: 'john', password: 'doe' }));
            const actions = store.getActions();

            expect(actions[0].type).toEqual(loginUser.pending.type);
            expect(actions[1].type).toEqual(loginUser.fulfilled.type);
            expect(actions[1].payload).toEqual(mockUser);
        });
    });

    describe('reducers', () => {
        test('should add item to wishlist', () => {
            const action = addItemToWishlist({ id: 1, name: 'My Product'});
            const state = userReducer(initialState, action);

            expect(state.wishlist).toEqual([{id: 1, name: 'My Product', quantity: 1}]);
        });
        test('should remove item from wishlist', () => {
            const modifiedState = {
                ...initialState,
                wishlist: [{id: 1, name: 'My Product', quantity: 1}],
            };
            const action = removeItemFromWishlist(1);
            const state = userReducer(modifiedState, action);

            expect(state.wishlist).toEqual([]);
        });

        test('should add item to basket', () => {
            const action = addItemToBasket({ id: 1, name: 'My Product' });
            const state = userReducer(initialState, action);

            expect(state.basket).toEqual([{ id: 1, name: 'My Product', quantity: 1 }]);
        });

        test('should remove item from basket', () => {
            const modifiedState = {
                ...initialState,
                basket: [{ id: 1, name: 'My Product', quantity: 1 }],
            };
            const action = removeItemFromBasket(1);
            const state = userReducer(modifiedState, action);

            expect(state.basket).toEqual([]);
        });

        test('should handle toggleForm', () => {
            const action = toggleForm(true);
            const state = userReducer(initialState, action);

            expect(state.showForm).toBe(true);
        });

        test('should toggle form type', () => {
            const action = toggleFormType('login');
            const state = userReducer(initialState, action);

            expect(state.formType).toBe('login');
        });
    });
});