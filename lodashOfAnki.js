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
    let result = ''
    let length = $('div[data-render-page="entry"]').each(function (index) {
        let h2Text = $(this).children('h2').text().split(' ').slice(0, 1).join('')  // 每一项标题
        result += h2Text
        result += '\n'
        console.log(h2Text)
        let name = $(this).children('div .signature').text() // 函数声明
        result += name
        result += '\n'
        console.log(name)
        let interpretation = _.replace($(this).children('div[data-render-html="/' + h2Text + '"]').text(), '\n', '').replace('\n', '')
        while (_.includes(interpretation, '\n')) {
           interpretation = _.replace(interpretation, '\n', '')
        }
        result += interpretation
        result += '\n'
        console.log(interpretation)
        let h3Text = $(this).children('h3').text().slice(0,2)
        result += h3Text
        result += '\n'
        console.log(h3Text)
        let paramsText = $(this).children('ol').text()
        while (_.includes(paramsText, '\n')) {
            paramsText = _.replace(paramsText, '\n', '')
        }
        result += paramsText
        result += '\n'
        console.log(paramsText)
        let h3Return = $(this).children('h3').text().slice(2, -2) // 返回值
        result += h3Return
        result += '\n'
        console.log(h3Return)
        let returnContent = _.replace($(this).children('div .returns').text()).replace('\n', '')
        result += returnContent
        result += '\n'
        console.log(returnContent)
        let exampleTitle = $(this).children('h3').text().slice(-2)  // 示例
        result += exampleTitle
        result += '\n'
        console.log(exampleTitle)
        let exampleContent = $(this).children('div[data-render-html="/#synthetic"]').text()
        result += exampleContent
        result += '\n----itemEnd-\n'
        console.log(exampleContent)
    })
    // 写入文件
    fs.open('./temp.txt', 'w', 0o666, (err, fd) => {
        if (err) {
            console.log(err)
        } else {
            fs.writeFile(fd, result, (err) => {
                console.log(err)
            })
        }
    })
}
res()
