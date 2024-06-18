import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import {getProducts, productsSlice} from './productsSlice';

jest.mock('axios');


const middlewares = [thunk];
const mockedStore = configureMockStore(middlewares);

describe('productsSlice', () => {
    let store;
    beforeEach(() => {
        store = mockedStore({ products: { list: [], filtered: [], related: [], isLoading: false } });
    });

    test('should fetch products', async () => {
        const mockProducts =
            [   { id: 1, name: 'Product One', price: 11 },
                { id: 2, name: 'Product Two', price: 12 },
                { id: 3, name: 'Product Three', price: 13 },
            ];
        axios.mockResolvedValueOnce({ data: mockProducts });

        await store.dispatch(getProducts());
        const actions = store.getActions();

        expect(actions[0].type).toEqual(getProducts.pending.type);
        expect(actions[1].type).toEqual(getProducts.fulfilled.type);
        expect(actions[1].payload).toEqual(mockProducts);
        expect(actions[1].meta.arg).toBeUndefined();
    });

    test('should be error', async () => {
        const error = 'Rejected';
        axios.mockRejectedValueOnce(new Error(error));

        await store.dispatch(getProducts());
        const actions = store.getActions();

        expect(actions[0].type).toEqual(getProducts.pending.type);
        expect(actions[1].type).toEqual(getProducts.rejected.type);
        expect(actions[1].error.message).toEqual(error);
    });
});