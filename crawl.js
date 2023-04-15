const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`actively crawling ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if (resp.status>399) {
            console.log(`error in fetch with status code:${resp.status} on page : ${currentURL}`)
            return
        }
        const contenttype=resp.headers.get('content-type')
        if (!contenttype.includes("text/html")) {
            console.log(`non html response, content type: ${contenttype} on page : ${currentURL}`)
            return
        }
        console.log(await resp.text())
    } catch (err) {
        console.log(`error in fetch ${err.message}`)
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
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

function NormalizaURL(urlString) {
    const urlObject = new URL(urlString);
    const hostpath = `${urlObject.hostname}${urlObject.pathname}`
    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1)
    }
    return hostpath
}


module.exports = {
    NormalizaURL,
    getURLsFromHTML, 
    crawlPage
}