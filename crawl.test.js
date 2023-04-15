const {NormalizaURL} = require('./crawl.js')
const {test,expect} = require('@jest/globals')
test('normalizeURl strip HTTPS Protocol',()=>{
    const input='https://blog.boot.dev/path'
    const actual=NormalizaURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURl strip Trailing slash',()=>{
    const input='https://blog.boot.dev/path/'
    const actual=NormalizaURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURl strip Captial',()=>{
    const input='https://BLOG.boot.dev/path/'
    const actual=NormalizaURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURl strip HTTP protocol',()=>{
    const input='https://blog.boot.dev/path/'
    const actual=NormalizaURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})