import { JSDOM } from 'jsdom'

export function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObject = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObject.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }

        } else {
            //absolute
            try {
                const urlObject = new URL(linkElement.href)
                urls.push(urlObject.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }

    }
    return urls

}
export 
function NormalizaURL(urlString) {
    const urlObject = new URL(urlString);
    const hostpath = `${urlObject.hostname}${urlObject.pathname}`
    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1)
    }
    return hostpath
}
export default{
    NormalizaURL,
    getURLsFromHTML
}