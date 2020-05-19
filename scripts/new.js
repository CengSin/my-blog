$(document).ready(function () {

    let content = $("#contentId");
    let transformData = $("#transformData");
    let submitBtn = $("#savePost");
    let titleEl = $("#titleId");
    let apiPath = getHost();

    //进入页面首先验证，之后进行即时进行转换
    sendAuthenticationEmail();
    var inputValue = prompt("暗号：");
    validInputValue(inputValue);

    function sendAuthenticationEmail() {
        // 调用后端发送验证邮件接口，并且拿到后端校验
        get(apiPath + "/sendEmail", true, function (responseBody) {
            if (responseBody.code !== invokeSuccessCode) {
                alert('验证邮件发送失败，将返回首页');
                comebackIndex();
            }
        })
    }

    function validInputValue(inputValue) {
        // 调用后端发送验证邮件接口，并且拿到后端校验
        get(apiPath + "/sendEmail/valid?captcha=" + inputValue, true, function (responseBody) {
            if (responseBody.code !== invokeSuccessCode) {
                alert("这不是你该来的地方！");
                comebackIndex();
            } else if (responseBody.code !== invokeSuccessCode) {
                transformMk();
            }
        })
    }


    function comebackIndex() {
        window.location.href = "./index.html";
    }


    // 事件区
    content.on("input", transformMk);

// 方法区
    function transformMk() {
        transformData.html(marked(content.val()));
    }

    function createPostObj() {
        var post = {};
        // postAuthor 目前默认是本人的作者id
        post.postAuthor = 1;
        // postContent为transform中的html内容
        post.postContent = transformData.html();
        // 设置post title
        post.postTitle = titleEl.val();
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
        post.postContentFiltered = content.val();
        // 设置post type
        post.postType = "post";
        return post;
    }

    submitBtn.click(function () {
        var postInfo = createPostObj();

        let createPostUrl = apiPath + "/wp-posts";
        post(createPostUrl, JSON.stringify(postInfo), true, function () {
            // 跳转回详情页进行查询
            comebackIndex();
        });
    });

});







