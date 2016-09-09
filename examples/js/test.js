const ALLProviders = [
    //谷歌地图
    "GoogleProvider_AERIAL",
    "GoogleProvider_HYBRID",
    "GoogleProvider_ROAD",
    //天地图
    "BaiduProvider_AERIAL",
    "BaiduProvider_ROAD",
    //天地图
    "TianDiProvider_AERIAL",
    "TianDiProvider_ROAD",
    //高德地图
    "GaoDeProvider_AERIAL",
    "GaoDeProvider_ROAD",
    "GaoDeProvider_LABEL"
]
function handleClick(event) {
    var val = document.getElementById("inputText").value;
    var vals = val.split(",")
    if (vals.length > 1) {
        var lon = parseFloat(vals[0]);
        var lat = parseFloat(vals[1]);
        var zoom = vals[2];
        ALLProviders.forEach(function (provider,index) {
            var server = new MapServer(provider);
            var tile = server.getMapTile(lon, lat, zoom);
            document.getElementById("msg"+index).innerText = tile.toString()
            var urls = tile.getUrls();
            if (urls) {
                document.getElementById("tile"+index).src = urls[0];
            } else {
                document.getElementById("tile"+index).src = null;
            }

        }, this);
    }
}