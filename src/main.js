let $lastLi = $(".ulList>.lastLi");
let hash = JSON.parse(localStorage.getItem("x"));
let hashMap = hash || [
  { logo: "B", url: "baidu.com" },
  { logo: "Y", url: "yaochengjian.com" }
];

/* 渲染数据 */
function hashEach() {
  hashMap.forEach(function(item) {
    $(`          
  <li>
  <a href="${"https://" + item.url}">
    <div>${item.logo}</div>
    <p>${item.url}</p>
  </a>
  <span class="close">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-close"></use>
    </svg>
  </span>
</li>
    `).insertBefore($lastLi);
  });
  remove();
}
hashEach();

/* 点击增加一个标签 */
$(".lastLiTwo").on("click", function() {
  let url1 = window.prompt("请输入你新增的网址");
  let newUrl2 = null;
  let bool = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(
    url1
  );
  let initials;
  /* 匹配是有效网址的话就会进行筛选后面部分 */
  if (bool) {
    newUrl2 = url1.replace(/(https:\/\/)|(http:\/\/)|(www.)/g, "");
    newUrl2 = newUrl2.replace(/(\/.*)/g, "");
    initials = newUrl2[0].toLocaleUpperCase();
  } else {
    alert("无效网址");
    return;
  }

  $(".ulList")
    .find("li:not(.lastLi)")
    .remove();
  hashMap.push({ logo: initials, url: newUrl2 });
  hashEach();
});

/* 网页离开存数据 */
window.onbeforeunload = function() {
  let str = JSON.stringify(hashMap);
  localStorage.setItem("x", str);
  console.log("网页要离开了");
};

/* 删除 */
function remove() {
  let closes = document.querySelectorAll(".close");
  console.log(closes);
  for (let i = 0; i < closes.length; i++) {
    closes[i].onclick = function() {
      hashMap.splice(i, 1);
      $(".ulList")
        .find("li:not(.lastLi)")
        .remove();
      hashEach();
    };
  }
}
remove();
