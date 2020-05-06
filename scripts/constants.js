// 获取host
function getHost() {
    return "http://localhost:8063";
}

// 调用成功code
let invokeSuccessCode = "0";

function get(url, async, successCallback) {
    // XMLHttpRequest对象
    var xhttp = getXMLHttpRequest();
    xhttp.open("GET", url, async);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8');

    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let posts = JSON.parse(xhttp.responseText);
            successCallback(posts);
        }
    }
}

function post(url, body, async, successCallback) {
    // XMLHttpRequest对象
    var xhttp = getXMLHttpRequest();
    xhttp.open("POST", url, async);
    //Send the proper header information along with the request
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhttp.send(body);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let posts = JSON.parse(xhttp.responseText);
            successCallback(posts);
        }
    }
}

function getXMLHttpRequest() {
    var xhttp = {};
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhttp;
}
