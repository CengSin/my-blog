let myImage = document.querySelector("img");
let xhttp = {};
let postsList = document.getElementById("posts");
let index = document.getElementById("index");

if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
} else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function getPosts(page, limit) {
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let posts = JSON.parse(xhttp.responseText);
            let i = 0;
            let html = "";
            let indexHtml = "";
            if (posts.code === 0) {
                for (i = 0; i < posts.data.content.length; i++) {
                    html += "<li onclick='getPostDetail(" + posts.data.content[i].id + ")'>" + posts.data.content[i].postTitle + "</li>";
                }
                for (i = 0; i < posts.data.pagesCount; i++) {
                    indexHtml += "<a onclick='getPosts(" + (i + 1) + ", " + 10 + ")'>" + (i + 1) + "</a> ";
                }
            }
            postsList.innerHTML = html;
            index.innerHTML = indexHtml;
        }
    }
    if (page === undefined) page = 1;
    if (limit === undefined) limit = 10;
    xhttp.open("GET", "http://localhost:8063/wp-posts?limit=" + limit + "&page=" + page, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8');
    xhttp.send();
}

// 查询博客
{
    getPosts();
}

// 获取博客详情
function getPostDetail(id) {
    window.location.href = "./detail.html" + "?id=" + id;
}

myImage.onclick = function () {
    let mySrc = myImage.getAttribute("src");
    if (mySrc === "./images/firefox-icon.png") {
        myImage.setAttribute("src", "./images/firefox.jpg");
    } else {
        myImage.setAttribute("src", "./images/firefox-icon.png");
    }
}