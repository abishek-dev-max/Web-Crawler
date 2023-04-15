const{crawlPage}=require('./crawl.js')
async function main(params) {
if (process.argv.length<3) {
    console.log("no website provided")
    process.exit(1)
}    
const baseURL = process.argv[2]
console.log(`starting crawl of ${baseURL}`)

const pages=await crawlPage(baseURL,baseURL,{})

for (const page of Object.entries(pages)) {
    console.log(page)
}
}
main()