import { Post, Request } from "./utils.js";
import { addPostToTimeline } from "../templates/js/_post.js";

// Obtém os posts vistos na Timeline.
$(document).ready(function () {
  const request = new Request({
    type: "GET",
    enctype: "multipart/form-data",
    url: "/posts",
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
        window.location.href = "/";
      }
    },
  });

  request.send();
});
