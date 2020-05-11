let content = document.getElementById("contentId");
let transformData = document.getElementById("transformData");
let submitBtn = document.getElementById("savePost");
let titleEl = document.getElementById("titleId");
let apiPath = getHost();

// 进入页面即时进行转换
{
    transformMk();
}

// 事件区
content.addEventListener("input", transformMk);

// 方法区
function transformMk() {
    transformData.innerHTML = marked(content.value);
}

function createPostObj() {
    var post = {};
    // postAuthor 目前默认是本人的作者id
    post.postAuthor = 1;
    // postContent为transform中的html内容
    post.postContent = transformData.innerHTML;
    // 设置post title
    post.postTitle = titleEl.value;
    // 设置postExcerpt
    post.postExcerpt = "";
    // 设置博客状态
    post.postStatus = "publish";
    // 设置评论状态
    post.commentStatus = "open";
    // 设置ping status
    post.pingStatus = "open";
    // 设置post password
    post.postPassword = "";
    // 设置post name title -》 uri转码
    post.postName = encodeURI(post.postTitle);
    // 设置to_pint , pinged
    post.toPing = "";
    post.pinged = "";
    // 设置content filter
    post.postContentFiltered = content.value;
    // 设置post type
    post.postType = "post";
    return post;
}

submitBtn.onclick = function () {
    var postInfo = createPostObj();

    let createPostUrl = apiPath + "/wp-posts";
    post(createPostUrl, JSON.stringify(postInfo), true, function () {
        // 跳转回详情页进行查询
        window.location.href = "./index.html";
    });
}



