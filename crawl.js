const { NormalizaURL,getURLsFromHTML } =require('./UrlWorks.js')
async function crawlPage(baseURL,currentURL,pages) {
    
    const baseURLobj=new URL(baseURL)
    const currentURLobj=new URL(currentURL)



    if (baseURLobj.hostname !== currentURLobj.hostname) {
        return pages        
    } 
    const normalizedCurrentURL = NormalizaURL(currentURL)
    if (pages[normalizedCurrentURL]>0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL]=1
    console.log(`actively crawling ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if (resp.status>399) {
            console.log(`error in fetch with status code:${resp.status} on page : ${currentURL}`)
            return pages
        }
        const contenttype=resp.headers.get('content-type')
        if (!contenttype.includes("text/html")) {
            console.log(`non html response, content type: ${contenttype} on page : ${currentURL}`)
            return pages
        }
        const htmlBody=await resp.text()
      const nextUrls= getURLsFromHTML(htmlBody,baseURL)

      for (const nexturl of nextUrls) {
        pages=await crawlPage(baseURL,nexturl,pages)
      }
    } catch (err) {
        console.log(`error in fetch ${err.message}`)
    }
    return pages
}



module.exports = { 
    crawlPage
}