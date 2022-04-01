import { setUser, Request, getUser } from "./utils.js";

export function createComment(id, comment){
  //var data = new FormData(comment);
  let data = {content: comment};
  const user = getUser();
  const request = new Request({
    type: "POST",
    url: "/posts/"+id+"/comments/",
    data:JSON.stringify(data),
    crossdomain: true,
    processData: false,
    enctype:  "application/json",
    hasAuth: true,
    timeout: 800000,
    onSuccess: function (response) {
      window.location.reload();
      console.log(response);      
    },
    onError: function (e) {
      if (e.status === 401) {
        window.location.href = "/";
      }
    },
  });

  request.send();
} 
;
