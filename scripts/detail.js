let apiPath = getHost();

let id = window.location.search.split("=")[1];
let content = document.querySelector("body");

// 请求接口
let detailUrl = apiPath + "/wp-posts/detail?id=" + id;

get(detailUrl, true, displayContent);

function displayContent(posts) {
    if (posts.code === invokeSuccessCode) {
        content.innerHTML = posts.data.postContent;
    }
    else {
        // 接口调用失败，弹出信息
    }
}
