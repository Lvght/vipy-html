import { getUser, Post, Request } from "./utils.js";
import { addPostToTimeline } from "../templates/js/_post.js";

$(document).ready(function () {
  const user = getUser();

  const request = new Request({
    type: "GET",
    enctype: "multipart/form-data",
    url: "https://vipyv-api.herokuapp.com/posts",
    hasAuth: true,
    crossdomain: true,
    processData: false,
    contentType: false,
    timeout: 800000,
    onSuccess: function (data) {
      for (let i = 0; i < data.length; i++) {
        const post = new Post(data[i]);
        addPostToTimeline(post);
      }
    },
    onError: function (e) {
      if (e.status === 401) {
        window.location.href = "./login.html";
      }
    },
  });

  request.send();
});
