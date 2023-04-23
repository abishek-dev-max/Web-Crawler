import { html } from 'parse5'
import { NormalizaURL, getURLsFromHTML } from './UrlWorks.js'
import { test, expect } from '@jest/globals'
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
test('getURLsFromHTMl',()=>{
    const HTMLinput=`
    <html>
    <body>
        <a href="https://blog.boot.dev/">
            Boot.dev Blog
        </a>
    </body>
    </html>`
    const inputBaseURL="https://blog.boot.dev/path"
    const actual=getURLsFromHTML(HTMLinput,inputBaseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})
test('getURLsFromHTMl relative',()=>{
    const HTMLinput=`
    <html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
    </html>`
    const inputBaseURL="https://blog.boot.dev"
    const actual=getURLsFromHTML(HTMLinput,inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})
test('getURLsFromHTMl multiple links',()=>{
    const HTMLinput=`
    <html>
    <body>
        <a href='https://blog.boot.dev/path1/'>
            Boot.dev Blog Path One
        </a>
        <a href='https://blog.boot.dev/path2/'>
        Boot.dev Blog Path Two
    </a>
    </body>
    </html>`
    const inputBaseURL="https://blog.boot.dev"
    const actual=getURLsFromHTML(HTMLinput,inputBaseURL)
    const expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})
test('getURLsFromHTMl invlaid URl',()=>{
    const HTMLinput=`
    <html>
    <body>
        <a href="invalid">
            Invalid Url
        </a>
    </body>
    </html>`
    const inputBaseURL="https://blog.boot.dev"
    const actual=getURLsFromHTML(HTMLinput,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})