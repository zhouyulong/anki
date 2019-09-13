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
    let index = 1
    let result = ''
    // 通过功能记忆名字
    let ankiCardTxtFunctToName = ''
    // 通过名字记忆功能、使用方法
    let ankiCardTxtNameToFunct = ''
    $('div[data-render-page="entry"]').each(function (i) {
        let h2Text = $(this).children('h2').text().split(' ').slice(0, 1).join('')  // 每一项标题
        let name = $(this).children('div .signature').text() // 函数声明
        ankiCardTxtNameToFunct = ankiCardTxtNameToFunct + (index++).toString() + '、' + name + '\t'
        let interpretation = _.replace($(this).children('div[data-render-html="/' + h2Text + '"]').text(), '\n', '').replace('\n', '')
        while (_.includes(interpretation, '\n')) {
           interpretation = _.replace(interpretation, '\n', '')
        }
        ankiCardTxtNameToFunct += '"<div>'
        ankiCardTxtNameToFunct += interpretation
        ankiCardTxtNameToFunct += '</div><div><font color=""#0000ff""><b>'
        ankiCardTxtFunctToName = ankiCardTxtFunctToName +  (index++).toString() + '、'
        ankiCardTxtFunctToName += interpretation
        ankiCardTxtFunctToName += '\t'
        ankiCardTxtFunctToName += '"' + name + '"\n'
        let h3Text = $(this).children('h3').text().slice(0,2)
        ankiCardTxtNameToFunct += h3Text
        ankiCardTxtNameToFunct += '</b></font></div>'
        let paramsText = $(this).children('ol').text()
        while (_.includes(paramsText, '\n')) {
            paramsText = _.replace(paramsText, '\n', '')
        }
        ankiCardTxtNameToFunct = ankiCardTxtNameToFunct + '<div>' + paramsText + '</div>'
        let h3Return = $(this).children('h3').text().slice(2, -2) // 返回值
        ankiCardTxtNameToFunct = ankiCardTxtNameToFunct + '<div><font color=""#0000ff""><b>' + h3Return + '</b></font></div>'
        let returnContent = _.replace($(this).children('div .returns').text()).replace('\n', '')
        ankiCardTxtNameToFunct = ankiCardTxtNameToFunct + '<div>' + returnContent + '</div>'
        let exampleTitle = $(this).children('h3').text().slice(-2)  // 示例
        ankiCardTxtNameToFunct = ankiCardTxtNameToFunct + '<div><font color=""#a9a9a9""><b>' + exampleTitle + '</b></font></div>'
        let exampleContent = $(this).children('div[data-render-html="/#synthetic"]').text()
        ankiCardTxtNameToFunct = ankiCardTxtNameToFunct + '<div>' + exampleContent + '</div>"\n'
    })
    result = result + ankiCardTxtNameToFunct + ankiCardTxtFunctToName
    // 写入文件
    fs.open('./temp.txt', 'w', 0o666, (err, fd) => {
        if (err) {
            console.log(err)
        } else {
            fs.writeFile(fd, result, (err) => {
                if (err) {
                    console.log('err', err)
                } else {
                    console.log('-----end-----')
                }
            })
        }
    })
}
res()
