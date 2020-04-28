let myHeading = document.querySelector("h1");
let myButton = document.getElementById("checkUser");
let myImage = document.querySelector("img");
let xhttp = {};
let getBlogsBtn = document.getElementById("loadPosts");
let postsList = document.getElementById("posts");

myHeading.textContent = "Hello World!";

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    let storedName = localStorage.getItem("name");
    myHeading.textContent = "Mozilla 酷毙了，" + storedName;
}

if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
} else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

getBlogsBtn.onclick = function() {
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var posts = JSON.parse(xhttp.responseText);
            var i = 0;
            var html = "";
            if (posts.code == 0) {
                for (i = 0; i < posts.data.content.length; i++) {
                    html += "<li>" + posts.data.content[i].postTitle + "</li>";
                }
            }
            postsList.innerHTML = html;
        }
    }
    xhttp.open("GET", "http://localhost:8063/wp-posts?limit=10&page=1", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8')
    xhttp.send();
}

myImage.onclick = function () {
    let mySrc = myImage.getAttribute("src");
    if (mySrc == "./images/firefox-icon.png") {
        myImage.setAttribute("src", "./images/firefox.jpg");
    } else {
        myImage.setAttribute("src", "./images/firefox-icon.png");
    }
}

function setUserName() {
    let myName = prompt("请输入你的名字：");
    if (!myName || myName === null) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = "Mozilla 酷毙了，" + myName;
    }
}

myButton.onclick = function () {
    setUserName();
}