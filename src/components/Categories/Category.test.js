import React from 'react';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Category from './Category';
import { useGetProductsQuery } from '../../features/api/apiSlice';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '9' }),
}));

jest.mock('../../features/api/apiSlice', () => ({
    useGetProductsQuery: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const renderWithProvider = (component, { store }) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/category/9']}>
                <Routes>
                    <Route path="/category/:id" element={component} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe('Category', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            categories: {
                list: [{ id: 9, name: 'Category 9' }],
            },
        });
    });

    test('should render category title', () => {
        useGetProductsQuery.mockReturnValue({
            data: [],
            isLoading: false,
            isSuccess: true,
        })

        renderWithProvider(<Category/>, { store })
        expect(screen.getByText('Category 9')).toBeInTheDocument();
    })

    test('should send search form', async () => {
        useGetProductsQuery.mockReturnValue({
            data: [],
            isLoading: false,
            isSuccess: true,
        });

        renderWithProvider(<Category/>, {store});

        const nameInput = screen.getByPlaceholderText('Product name');
        const minPriceInput = screen.getByTestId("price_min_input");
        const maxPriceInput = screen.getByTestId("price_max_input");

        fireEvent.change(nameInput, {target: {value: 'My Product'}});
        fireEvent.change(minPriceInput, {target: {value: 1}});
        fireEvent.change(maxPriceInput, {target: {value: 10}});

        expect(nameInput.value).toBe('My Product');
        expect(minPriceInput.value).toBe('1');
        expect(maxPriceInput.value).toBe('10');

        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => {
            expect(screen.queryByText('No results')).toBeInTheDocument();
        });


    })
    test('should show loading', () => {
        useGetProductsQuery.mockReturnValue({
            data: [],
            isLoading: true,
            isSuccess: false,
        });

        renderWithProvider(<Category />, { store });

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('should show "No results"', () => {
        useGetProductsQuery.mockReturnValue({
            data: [],
            isLoading: false,
            isSuccess: true,
        });

        renderWithProvider(<Category />, { store });

        expect(screen.getByText('No results')).toBeInTheDocument();
    });


    test('should render products', () => {
        const mockProducts = [
            { id: 10, title: 'Product', category: {name: 'cat'}, images:
                    ['https://i.imgur.com/Ex5x3IU.jpg']},
            { id: 12, title: 'Product1', category: {name: 'cat'},  images:
                    ['https://i.imgur.com/z7wAQwe.jpg',]},
        ];

        useGetProductsQuery.mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isSuccess: true,
        });

        renderWithProvider(<Category />, { store });

        expect(screen.getByText('Product')).toBeInTheDocument();
        expect(screen.getByText('Product1')).toBeInTheDocument();
    });
})