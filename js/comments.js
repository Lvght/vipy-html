import { setUser, Request, getUser, Post } from "./utils.js";
import { addCommentToPost } from "../templates/js/_post.js";

export function listComment(id){
  //var data = new FormData(comment);
  console.log('inciando requisicao');
  const user = getUser();
  const request = new Request({
    type: "GET",
    url: "/posts/"+id+"/comments/",
    crossdomain: true,
    processData: false,
    enctype:  "application/json",
    hasAuth: true,
    timeout: 800000,
    
    onSuccess: function (data) {
      for (let i = 0; i < data.length; i++) {
        const comment = new Post(data[i]);
        addCommentToPost(comment);
      }       
    },
    onError: function (e) {
      if (e.status === 401) {
        window.location.href = "/";
        return null;  
      }
    },
  });

  request.send();
} 
;
