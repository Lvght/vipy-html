import { User, getUser, replaceClassText, Post, Request } from "../../js/utils.js";
import { addPostToTimeline } from "./_post.js";
import openModalCallback from "../../js/createPostModal.js";

export function loadPostModal(){
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_createPostModal.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      $("#createPostModal").html(client.responseText);

      const user = getUser();

      openModalCallback();

      replaceClassText("currentName", user.display_name);
      replaceClassText("currentUsername", "@" + user.username);
      sendPost();
    }
  };
  client.send();
}

function sendPost(){
  $("#createPostBtn").click(function (event) {
    //stop submit the form, we will post it manually.
    event.preventDefault();

    // Get form
    var form = $("#createPostForm")[0];

    // Create an FormData object
    var data = new FormData(form);

    // disabled the submit button
    $("#createPostBtn").prop("disabled", true);


    const request = new Request({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://vipyv-api.herokuapp.com/posts/",
      data: data,
      crossdomain: true,
      processData: false,
      contentType: false,
      hasAuth: true,
      timeout: 800000,
      onSuccess: function (data) {
        const post = new Post(data)
        addPostToTimeline(post);
        document.getElementById("myModal").style.display = "none";
      }
    });
    console.log(request);
    request.send();
  });
}