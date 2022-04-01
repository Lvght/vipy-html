import { deletePost } from "../../js/deletePost.js";
import { createComment } from "../../js/comment.js";
import { listComment } from "../../js/comments.js";

function preparePost(post, postPageString) {
  let postObject = document.createElement("div");

  // Carrega o template como uma string.
  postObject.innerHTML = postPageString;
  postObject = postObject.firstChild;
  postObject.id = "post-" + post.id;
  return postObject;
}

function replacePostClassContent(postId, className, newContent) {
  let post = document.getElementById(postId);
  let content = post.getElementsByClassName(className)[0];
  content.innerText = newContent;
}

function replacePostClassHref(postId, className, newContent) {
  let post = document.getElementById(postId);
  let content = post.getElementsByClassName(className)[0];
  content.setAttribute('href', newContent);
}

function replaceIdComment(postId) {
  let post = document.getElementById(postId);
  let content = post.getElementsByClassName("commentInput")[0];
  content.setAttribute('id', "comment-"+postId);
  content = post.getElementsByClassName("commentCount")[0];
  content.setAttribute('id', "commentCount-"+postId);
}



function replacePostInformation(post) {
  // Não da pra colocar document.getElementById("post-" + post.id)
  // dentro de uma variável
  let postId = "post-" + post.id;

  replacePostClassContent(postId, "name", post.author.display_name);
  replacePostClassContent(postId, "username", "@" + post.author.username);
  replacePostClassContent(postId, "dateSince", getDateSince(post.created_at));
  replacePostClassContent(postId, "postContent", post.content);
  
  replacePostClassHref(postId, "seePost", 'post.html?id=' + post.id);
  replacePostClassHref(postId, "profileLink", 'profile.html?id=' + post.author.id);
  replaceIdComment(postId);

}

function getDateSince(dateString) {
  let currentDate = new Date();
  let date = new Date(dateString);
  let timeSince = currentDate.getTime() / 1000 - date.getTime() / 1000;
  if (timeSince >= 60) {
    if (timeSince / 60 >= 60) {
      if (timeSince / 60 / 60 >= 24) {
        if (timeSince / 60 / 60 / 24 >= 7) {
          const a = date;
          return a.toLocaleDateString();
        } else return parseInt(timeSince / 60 / 60 / 24) + "d atrás";
      } else return parseInt(timeSince / 60 / 60) + "h atrás";
    } else return parseInt(timeSince / 60) + "m atrás";
  } else return parseInt(timeSince) + "s atrás";
}

function addCommentPost(post){
  let addComment = document.getElementById("comment-post-"+post.id);
  addComment.addEventListener ('keypress', (event) => {
    const keyName = event.which;
    console.log(keyName);
    let comment = document.getElementById("comment-post-"+post.id).value;
    let LenghStr = 42 - comment.length;
    document.getElementById("commentCount-post-"+post.id).innerHTML = LenghStr;
    if(keyName == 13 && LenghStr>=0){
      createComment(post.id, comment);
    }
  });
}


export function addPostToTimeline(post) {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_post.html");

  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      $("#timeline").prepend(preparePost(post, client.responseText));
      replacePostInformation(post);
      addCommentPost(post);
    }

  };
  client.send();
}

export function seePost(post, del) {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_seePost.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      
      $("#timeline").prepend(preparePost(post, client.responseText));
      replacePostInformation(post);
      addCommentPost(post);
            
      let btnEditPost = document.getElementById("deletePostButton");
      if (!del) {
        btnEditPost.onclick = function () {
          alert(confirm('Tem certeza disto?') ? (deletePost(post.id)) : window.location.reload());
          modalEditPost.style.display = "block";
        };
      } else {
        btnEditPost.remove();
      }
      listComment(post.id);
      
    }
  };
  client.send();
}

export function addCommentToPost(comment) {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_comment.html");
  console.log(comment.id);
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      $("#commentaries").prepend(preparePost(comment, client.responseText));
      replacePostInformation(comment);
      addCommentPost(comment);
      document.getElementById("deleteCommentButton").remove();
    }
  }
  client.send();
}