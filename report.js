function PrintReport(pages) {
    console.log("============")
    console.log("REPORT")
    console.log("============")
    const sortedPages=sortPages(pages)
    for (const sortedpage of sortedPages) {
        const url=sortedpage[0]
        const hits=sortedpage[1]
        console.log(`found ${hits} links to ${url}`)
    }
    console.log("============")
    console.log("END OF REPORT")
    console.log("============")
}

function sortPages(pages) {
    const pagesArr=Object.entries(pages);
    pagesArr.sort((a,b)=>{
        aHits=a[1]
        bHits=b[1]
        return b[1]-a[1]
    })
    return pagesArr
}
module.exports ={
    sortPages,
    PrintReport
}