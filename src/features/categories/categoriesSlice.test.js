import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { getCategories } from './categoriesSlice';

jest.mock('axios');


const middlewares = [thunk];
const mockedStore = configureMockStore(middlewares);

describe('getCategories thunk', () => {
    let store;
    beforeEach(() => {
        store = mockedStore({ categories: { list: [], isLoading: false } });
    });

    test('should dispatch fulfilled action', async () => {
        const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
        axios.mockResolvedValueOnce({ data: mockCategories });

        await store.dispatch(getCategories());
        const actions = store.getActions();

        expect(actions[0].type).toEqual(getCategories.pending.type);
        expect(actions[1].type).toEqual(getCategories.fulfilled.type);
        expect(actions[1].payload).toEqual(mockCategories);
        expect(actions[1].meta.arg).toBeUndefined();
    });

    test('should be error', async () => {
        const error = 'Rejected';
        axios.mockRejectedValueOnce(new Error(error));

        await store.dispatch(getCategories());
        const actions = store.getActions();

        expect(actions[0].type).toEqual(getCategories.pending.type);
        expect(actions[1].type).toEqual(getCategories.rejected.type);
        expect(actions[1].error.message).toEqual(error);
    });
});
