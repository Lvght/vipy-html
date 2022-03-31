import { getUser, Request } from "./utils.js";

export function deletePost(id) {
  const user = getUser();
  const request = new Request({
    type: "DELETE",
    enctype: "multipart/form-data",
    url: "/posts/"+id,
    hasAuth: true,
    crossdomain: true,
    processData: false,
    contentType: false,
    timeout: 800000,
    onSuccess: function (data) {
      window.location = 'home.html';      
    },
    onError: function (e) {
      if (e.status === 401) {
        window.location.href = "/";
      }
    },
  });

  request.send();
};
