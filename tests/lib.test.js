const lib = require('../lib')

test('Absolute- should return a positive number if input is positive.', () => {
    const result = lib(1)
    expect(result).toBe(1)
})