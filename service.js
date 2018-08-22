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
var currentImages
function exportService(res, query) {
  if (currentImages) {
    res.end("正在导出，请勿重复执行！")
    return;
  }
  var { provider, bbox, zoom, format } = query;
  provider = provider || 'GaoDeProvider_ROAD';
  zoom = zoom || 10;
  format = format || 'png';
  bbox = (bbox && bbox.split(',')) || [115.802, 40.21, 117.04, 39.6173]

  var map = new TMap(provider)

  var tileLT = map.getTile(parseFloat(bbox[0]), parseFloat(bbox[1]), zoom) //左上
  var tileRB = map.getTile(parseFloat(bbox[2]), parseFloat(bbox[3]), zoom) //右下
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

  var tiles = [];
  //request google地图禁止访问？ 256*256
  for (var row = minRow; row <= maxRow; row++) {
    for (var col = minCol; col <= maxCol; col++) {
      var coor = new map.Coordinate(row, col, zoom)
      var urls = provider.getTileUrls(coor)
      var x = (col - minCol) * 256
      var y = (row - minRow) * 256
      tiles.push({ url: urls[0], x: x, y: y });
      //drawImage(urls[0], x, y)
    }
  }
  var num = tiles.length;
  var filtPath = './dist/mapImage/' + new Date().getTime() + '.' + format;
  if (num < 10000) { //大于10000的时候 内存不够
    currentImages = {
      num: num,
      count: 0,
      reqNum: 128,//128:250k/s
      tiles: tiles,
      content: images(numRows * 256, numCols * 256),//内存问题
      export: filtPath
    }
    reqImages();
  }
  res.writeHead(200, { 'Content-Type': 'html' });
  // res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

  res.write(`
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>nodejs-dmap</title>
        </head>
      <body>${
    '视野范围：' + bbox.toString() + "<br/>" +
    '切片级别：' + zoom + "<br/>" +
    '切片坐标范围：' +
    [minCol, minRow].toString() + ' ' +
    [maxCol, maxRow].toString() + "<br/>" +
    '切片行数：' + numRows + "<br/>" +
    '切片列数：' + numCols + "<br/>" +
    '切片数：' + num + "<br/>" +
    '导出路径：' + `<a href="${filtPath}">${filtPath}</a>`
    }
        </body>
      </html>
      `);

  res.end(

  )
}

function reqImages() {
  var tiles = currentImages.tiles;
  var reqNum = currentImages.reqNum;
  currentImages.toCount = currentImages.count > 0 ? currentImages.count + reqNum : reqNum / 2;
  var i = 0;
  console.log(currentImages.count, currentImages.toCount)
  while (i < reqNum && tiles.length > 0) {
    i++;
    var tile = tiles.shift();
    tile.reNum = 0;
    drawImage(tile);
  }
}


//
function drawImage(tile) {
  request({
    timeout: 3000, //需要设置超时，因为网络问题
    jar: true,//记住 cookie
    encoding: null,//不设置为空，则body为字符串
    url: tile.url
  }, function (error, response, body) {
    var content = currentImages.content;
    if (!error && response.statusCode == 200) {
      if (Buffer.isBuffer(body)) {
        currentImages.count++
        content.draw(images(body), tile.x, tile.y)
        if (currentImages.count >= currentImages.toCount) {
          reqImages();
        }
      } else {
        tile.reNum++;
        drawImage(tile)
      }
    } else if (tile.reNum > 128) { //重复请求次数
      console.log('超时错误！')
      currentImages.count++
    } else {
      console.log(error) //一般是timeout
      drawImage(tile)
    }
    if (currentImages.count >= currentImages.num) {
      console.log('截取成功！', currentImages.count)
      content.save(currentImages.export)
      console.log('导出成功!', currentImages.export)
      //为什么只有下次请求的时候才会释放内存？内存没变化的话不做gc?
      currentImages.content = null
      currentImages = null
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