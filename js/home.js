import { getUser, Post } from "./utils.js";
import { addPostToTimeline } from "../templates/js/_post.js";

$(document).ready(function () {
  const user = getUser();

  $.ajax({
    type: "GET",
    enctype: "multipart/form-data",
    url: "https://vipyv-api.herokuapp.com/posts",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + user.tokens.access);
    },
    crossdomain: true,
    processData: false,
    contentType: false,
    timeout: 800000,
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const post = new Post(data[i]);
        console.log(post);
        addPostToTimeline(post);
      }
    },
    error: function (e) {},
  });
});
