//http协议模块
var http = require('http');
//url解析模块
var url = require('url');
//文件系统模块
var fs = require("fs");
//路径解析模块
var path = require("path");
// request 请求
var request = require('request');
// images
var images = require("images");
images.setLimit(262144, 262144) //2^18 262144
// map 服务
require("./examples/js/map.js");
// 创建一个服务
var httpServer = http.createServer(function (req, res) {

    var urlStr = req.url
    var reqURL = url.parse(urlStr, true)
    var urlPathname = reqURL.pathname
    var query = reqURL.query
    var pathname = __dirname + urlPathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    switch (urlPathname) {
        case '/map/export':
            try { //一般是 超出图片大小(错误的经纬度范围)
                exportService(res, query)
            } catch (error) {
                console.log(error)
            }
            break;
    }

})

//在指定的端口监听服务
httpServer.listen(8574, function () {
    console.log("[HttpServer][Start]", "a map server runing, port 8574");
});
//
function exportService(res, query) {
    var {provider, bbox, size, format} = query
    if (!size) {
        size = 10
    }
    if (!format) {
        format = 'png'
    }
    var map = new TMap(provider)
    bbox = bbox.split(',')
    var tileLT = map.getTile(parseFloat(bbox[0]), parseFloat(bbox[1]), size) //左上
    var tileRB = map.getTile(parseFloat(bbox[2]), parseFloat(bbox[3]), size) //右下
    //
    var coorLT = tileLT.coordinate
    var minCol = coorLT.column;
    var minRow = coorLT.row;
    //
    var coorRB = tileRB.coordinate
    var maxCol = coorRB.column;
    var maxRow = coorRB.row;
    //
    var provider = tileLT.provider;
    var numRows = maxRow - minRow + 1
    var numCols = maxCol - minCol + 1
    var num = numCols * numRows
    var toImages = {
        num: num,
        count: 0,
        content: images(numRows * 256, numCols * 256),
        export: './service/mapImage/' + new Date().getTime() + '.' + format
    }
    //request google地图禁止访问？ 256*256
    var i = 0
    for (var row = minRow; row <= maxRow; row++) {
        for (var col = minCol; col <= maxCol; col++) {
            var coor = new map.Coordinate(row, col, size)
            var urls = provider.getTileUrls(coor)
            var x = (col - minCol) * 256
            var y = (row - minRow) * 256
            drawImage(urls[0], toImages, x, y)
        }
    }
    res.end(
        '视野范围：' + bbox.toString() + '\n' +
        '切片级别：' + size + '\n' +
        '切片坐标范围：' +
        [minCol, minRow].toString() + ' ' +
        [maxCol, maxRow].toString() + '\n' +
        '切片行数：' + numRows + '\n' +
        '切片列数：' + numCols + '\n' +
        '切片数：' + num + '\n' +
        '导出路径：' + toImages.export
    )
}
//
function drawImage(source, toImages, x, y, reNum = 0) {
    request({
        timeout: 6000, //需要设置超时，因为网络问题和内存问题，需另外考虑分流、分步的机制
        jar: true,//记住 cookie
        encoding: null,//不设置为空，则body为字符串
        url: source
    }, function (error, response, body) {
        var content = toImages.content;
        if (!error && response.statusCode == 200) {
            if (Buffer.isBuffer(body)) {
                toImages.count++
                console.log(toImages.count)
                content.draw(images(body), x, y)
            }else{
                drawImage(source, toImages, x, y, ++reNum)
            }
        } else if (reNum > 130) { //重复请求次数
            console.log('超时错误！')
            toImages.count++
        } else {
            // console.log(error) //一般是timeout
            drawImage(source, toImages, x, y, ++reNum)
        }
        if (toImages.count >= toImages.num) {
            console.log('截取成功！', toImages.count)
            content.save(toImages.export)
            delete toImages.content
            console.log('导出成功!', toImages.export)
        }
    })
}




// if (pathname.charAt(pathname.length - 1) == "/") {
    //     pathname += "index.html";
    // }
    // if (path.isAbsolute(pathname)) {
    //     switch (path.extname(pathname)) {
    //         case ".html":
    //             res.writeHead(200, {
    //                 "Content-Type": "text/html"
    //             });
    //             break;
    //         case ".js":
    //             res.writeHead(200, {
    //                 "Content-Type": "text/javascript"
    //             });
    //             break;
    //         case ".css":
    //             res.writeHead(200, {
    //                 "Content-Type": "text/css"
    //             });
    //             break;
    //         case ".gif":
    //             res.writeHead(200, {
    //                 "Content-Type": "image/gif"
    //             });
    //             break;
    //         case ".jpg":
    //             res.writeHead(200, {
    //                 "Content-Type": "image/jpeg"
    //             });
    //             break;
    //         case ".png":
    //             res.writeHead(200, {
    //                 "Content-Type": "image/png"
    //             });
    //             break;
    //         default:
    //             res.writeHead(200, {
    //                 "Content-Type": "application/octet-stream"
    //             });
    //     }
    //     fs.readFile(pathname, function (err, data) {
    //         if(data){
    //             res.end(data);
    //         }
    //     });
    // } else {
    //     switch (urlPathname) {
    //         default:
    //             res.writeHead(404, {
    //                 "Content-Type": "text/html"
    //             });
    //             res.end("<h1>404 Not Found</h1>");
    //     }
    // }
// }