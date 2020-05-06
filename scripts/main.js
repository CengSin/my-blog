let apiPath = getHost();
let myImage = document.querySelector("img");
let postsList = document.getElementById("posts");
let index = document.getElementById("index");

// 进入首页自动查询博客
getPosts();

function getPosts(page, limit) {
    if (page === undefined) page = 1;
    if (limit === undefined) limit = 10;

    let url = apiPath + "/wp-posts?limit=" + limit + "&page=" + page;

    get(url, true, displayTitles);
}

function displayTitles(responseBody) {
    let i = 0;
    let html = "";
    let indexHtml = "";
    if (responseBody.code === invokeSuccessCode) {
        for (i = 0; i < responseBody.data.content.length; i++) {
            html += "<li onclick='getPostDetail(" + responseBody.data.content[i].id + ")'>" + responseBody.data.content[i].postTitle + "</li>";
        }
        for (i = 0; i < responseBody.data.pagesCount; i++) {
            indexHtml += "<a onclick='getPosts(" + (i + 1) + ", " + 10 + ")'>" + (i + 1) + "</a> ";
        }
        postsList.innerHTML = html;
        index.innerHTML = indexHtml;
    } else {
        // 接口调用失败，弹出信息
    }
}

// 跳转到获取博客详情页面
function getPostDetail(id) {
    window.location.href = "./detail.html" + "?id=" + id;
}

// 图标展示转换
// myImage.onclick = function () {
//     let mySrc = myImage.getAttribute("src");
//     if (mySrc === "./images/sun.jpg") {
//         myImage.setAttribute("src", "./images/firefox.jpg");
//     } else {
//         myImage.setAttribute("src", "./images/sun.jpg");
//     }
// }

function jumpWriteBlogsPage() {
    window.location.href = "./new.html";
}