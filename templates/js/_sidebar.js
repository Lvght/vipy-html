import { User, getUser, replaceClassText } from "../../js/utils.js";
import openModalCallback from "../../js/createPostModal.js";

$(document).ready(function () {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_sidebar.html");
  client.onreadystatechange = function () {
    $("#sidebar").html(client.responseText);

    const user = getUser();

    openModalCallback();

    replaceClassText("currentName", user.display_name);
    replaceClassText("currentUsername", "@" + user.username);
  };
  client.send();
});
