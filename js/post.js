import { getUser, Post, Request } from "./utils.js";
import { seePost } from "../templates/js/_post.js";

$(document).ready(function () {
  const user = getUser();
  const id    = (window.location.href).substring(38);
    const request = new Request({
    type: "GET",
    enctype: "multipart/form-data",
    url: "https://vipyv-api.herokuapp.com/posts/"+id,
    hasAuth: true,
    crossdomain: true,
    processData: false,
    contentType: false,
    timeout: 800000,
    onSuccess: function (data) {
      const post = new Post(data);
      seePost(post);
      let title = document.getElementById("title")
      title.innerText = "Post de @" + post.author.username;
      
    },
    onError: function (e) {
      if (e.status === 401) {
        window.location.href = "./login.html";
      }
    },
  });

  request.send();
});
