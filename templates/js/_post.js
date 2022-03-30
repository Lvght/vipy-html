function preparePost(post, postPageString) {
  let postObject = document.createElement("div");
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
  content.setAttribute('href', 'post.html#' + newContent);
}



function replacePostInformation(post) {
  // Não da pra colocar document.getElementById("post-" + post.id)
  // dentro de uma variável
  let postId = "post-" + post.id;

  replacePostClassContent(postId, "name", post.author.display_name);
  replacePostClassContent(postId, "username", "@" + post.author.username);
  replacePostClassContent(postId, "dateSince", getDateSince(post.created_at));
  replacePostClassContent(postId, "postContent", post.content);
  replacePostClassHref(postId, "seePost", post.id);

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
export function addPostToTimeline(post) {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_post.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        $("#timeline").prepend(preparePost(post, client.responseText));
      replacePostInformation(post);
    }
  };
  client.send();
}

export function seePost(post) {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_seePost.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      $("#timeline").prepend(preparePost(post, client.responseText));
      
      replacePostInformation(post);
    }
  };
  client.send();
}
