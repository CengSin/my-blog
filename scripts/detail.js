let id = window.location.search.split("=")[1];
let content = document.querySelector("body");

var xhttp = {};
if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
} else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// 请求接口
{
    xhttp.onreadystatechange = function() {
        let posts = JSON.parse(xhttp.responseText);
        if (posts.code === 0) {
            content.innerHTML = posts.data.postContent;
        }
    }
    xhttp.open("GET", "http://localhost:8063/wp-posts/detail?id=" + id, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8');
    xhttp.send();
}