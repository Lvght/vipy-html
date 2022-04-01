import { getUser, replaceClassText } from "../../js/utils.js";
import {loadPostModal} from "./_createPostModal.js";

$(document).ready(function () {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_sidebar.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {

      $("#sidebar").html(client.responseText);
      loadPostModal();

      const user = getUser();
      replaceClassText("currentName", user.display_name);
      replaceClassText("currentUsername", "@" + user.username);

      document.getElementById("currentUserProfileLink").href = "./profile.html?id=" + user.id;
    }
  };
  client.send();
});
