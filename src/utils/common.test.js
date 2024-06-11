import {buildUrl, shuffle, sumBy} from './common';

describe('shuffle', () => {
    test('should return an array with the same elements', () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const shuffled = shuffle(arr);

        expect(shuffled).toHaveLength(arr.length);
        expect(shuffled).toEqual(expect.arrayContaining(arr));
    });

    test('should return a different order of the elements', () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const shuffled = shuffle(arr);

        expect(shuffled).not.toEqual(arr);
    });

    test('should not modify the original array', () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const copyArr = [...arr];
        shuffle(arr);

        expect(arr).toEqual(copyArr);
    });
});

describe('buildUrl', () => {
    test('should return URL without parameters', () => {
        const url = 'http://example.com';
        const params = {};
        const result = buildUrl(url, params);

        expect(result).toBe('http://example.com');
    });

    test('should return URL with one parameter', () => {
        const url = 'http://example.com';
        const params = { ex: 'example' };
        const result = buildUrl(url, params);

        expect(result).toBe('http://example.com?ex=example');
    });

    test('should return URL with more than one parameter', () => {
        const url = 'http://example.com';
        const params = { ex: 'example', new: 'param' };
        const result = buildUrl(url, params);

        expect(result).toBe('http://example.com?ex=example&new=param');
    });
});

describe('sumBy', () => {
    test('return return sum of numbers', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = sumBy(arr);

        expect(result).toBe(15);
    });
});