const http = require('http')
const cherrio = require('cheerio')
const fs = require('fs')
const _ = require('lodash')



const getDefer = () => {
    let defer = {}
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

const originData = async (url) => {
    let deferred = await getDefer()
    http.get(url, (res) => {
        let data = ''
        res.on('data', (value) => {
           data += value
        })
        res.on('end', () => {
            deferred.resolve(data)
        })
    })
    return deferred.promise
}
let res = async () => {
    let data = await originData('http://lodash.think2011.net/all')
    let $ = await cherrio.load(data)
    let length = $('div[data-render-page="entry"]').each()
    // https://cheerio.js.org/
    console.log(length)

    // fs.open('./temp.txt', 'w', 0o666, (err, fd) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         fs.writeFile(fd, data, (err) => {
    //             console.log(err)
    //         })
    //     }
    // })
}
res()
