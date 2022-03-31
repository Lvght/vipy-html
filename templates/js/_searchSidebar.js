import { User, getUser, replaceClassText, Request } from "../../js/utils.js";

$(document).ready(function () {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_searchSidebar.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      $("#sidebar2").html(client.responseText);
      loadSearchSidebar();
    }
  };
  client.send();
});

function loadSearchSidebar() {
  const search = document.getElementById("searchProfiles");
  const searchResults = document.getElementById("searchResults");
  search.addEventListener("input", updateValue);

  let last = "";
  function updateValue() {
    searchResults.innerHTML = "";
    searchProfiles(search.value);
    last = search.value;
  }

  function searchProfiles(name) {
    const request = new Request({
      type: "GET",
      enctype: "multipart/form-data",
      url: "https://vipyv-api.herokuapp.com/profiles/search/" + name + "/",
      hasAuth: true,
      crossdomain: true,
      processData: false,
      contentType: false,
      timeout: 800000,
      onSuccess: function (data) {
        let inner = "";
        for (let i = 0; i < data.length; i++) {
          const user = new User(data[i]);
          inner += template(user);
        }
        if (name == last) searchResults.innerHTML = inner;
      },
      onError: function (e) {
        searchResults.innerHTML = "";
      },
    });

    request.send();
  }

  function template(user) {
    let aux = `<a id="toProfile" href="profile.html?id=${user.id}">
      <div class="searchProfileLink">
        <div class="postAuthorProfileImage" hidden>
          <div class="userProfilePicture">
            <img alt="profile" src="../assets/pfp.gif" />
          </div>
        </div>
        <div class="searchUserIdentification">
            <h2 class="searchName">${user.display_name}</h2>
            <h3 class="searchUsername">@${user.username}</h3>
        </div>
      </div>
  </a>`;

    console.log(aux);
    return aux;
  }
}
