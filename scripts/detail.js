$(document).ready(function () {
    let apiPath = getHost();
    let id = window.location.search.split("=")[1];
// 请求接口
    let detailUrl = apiPath + "/wp-posts/detail?id=" + id;

    get(detailUrl, true, displayContent);

    function displayContent(posts) {

        let content = $("body");

        if (posts.code === invokeSuccessCode) {
            content.html(posts.data.postContent);
        } else {
            // 接口调用失败，弹出信息
        }
    }
});

