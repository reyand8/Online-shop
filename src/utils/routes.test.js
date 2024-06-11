import { ROUTES } from './routes';  // Обновите путь, если необходимо

describe('ROUTES', () => {
    test('should be HOME', () => {
        expect(ROUTES.HOME).toBe('/');
    });

    test('should be BASKET', () => {
        expect(ROUTES.BASKET).toBe('/basket');
    });

    test('should be WISHLIST', () => {
        expect(ROUTES.WISHLIST).toBe('/wishlist');
    });

    test('should be PROFILE', () => {
        expect(ROUTES.PROFILE).toBe('/profile');
    });

    test('should be PRODUCT', () => {
        expect(ROUTES.PRODUCT).toBe('/products/:id');
    });

    test('should be CATEGORY', () => {
        expect(ROUTES.CATEGORY).toBe('/categories/:id');
    });
});
