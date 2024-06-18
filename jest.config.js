module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs",
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
};