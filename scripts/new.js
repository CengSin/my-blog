let content = document.getElementById("contentId");
let transformData = document.getElementById("transformData");

content.addEventListener("input", function() {
    debugger;
    transformData.innerHTML = marked(content.value);
});