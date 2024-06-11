module.exports = {
    transform: {
        // '^.+\\.[t|j]sx?$': 'babel-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs"
    },
    testEnvironment: 'jsdom',
};