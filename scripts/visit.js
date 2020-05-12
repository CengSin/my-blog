let apiPath = getHost();
let cakeData = [];
let totalVisit = 0;
let colors = [
    "#6B8E23",
    "Crimson",
    "#191970",
    "Chocolate",
    "#9400D3",
    "DarkGoldenRod",
    "DarkMagenta",
    "#8FBC8F",
    "DarkRed",
];

// 查询接口，获取ip数据
get(apiPath + "/visit", true, successCallBack);

function successCallBack(responseBody) {
    if (responseBody.code === invokeSuccessCode) {
        // 如果接口调用成功
        cakeData = responseBody.data.records;
        for (let i = 0; i < cakeData.length; i++) {
            cakeData[i].color = colors[i % colors.length];
        }
        totalVisit = responseBody.data.totalVisit;
    }

    var canvas = document.getElementById("canvas");
    //设置宽高不从css中设置
    canvas.width = 600;//设置canvas宽
    canvas.height = 600;//设置canvas高

    //获取上下文
    var ctx = canvas.getContext("2d");
    //画图
    var x0 = 300, y0 = 300;//圆心
    var x, y;//文字放置位置
    var radius = 100;
    var tempAngle = -90;//画圆的起始角度
    for (var i = 0; i < cakeData.length; i++) {
        var startAngle = tempAngle * Math.PI / 180;//起始弧度
        var angle = cakeData[i].visitCount * 1.0 / totalVisit * 360;
        var endAngle = (tempAngle + angle) * Math.PI / 180;//结束弧度
        var textAngle = tempAngle + 0.5 * angle;//文字放的角度
        x = x0 + Math.cos(textAngle * Math.PI / 180) * (radius + 20);//文字放的X轴
        y = y0 + Math.sin(textAngle * Math.PI / 180) * (radius + 20);//文字放的Y轴
        //如果文字在圆形的左侧，那么让文字 对齐方式为 文字结尾对齐当前坐标。
        if (textAngle > 90 && textAngle < 270) {
            ctx.textAlign = 'end';
        }
        var text = cakeData[i].ip + " " + cakeData[i].visitCount * 1.0 / totalVisit * 100 + "%";
        ctx.fillText(text, x, y);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.fillStyle = cakeData[i].color;
        ctx.arc(x0, y0, radius, startAngle, endAngle);
        ctx.fill();
        tempAngle += angle;
    }
}