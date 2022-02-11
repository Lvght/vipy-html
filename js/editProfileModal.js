let modalEditProfile = document.getElementById("editProfileModal");

let btnEditPost = document.getElementById("editProfileButton");

let spanEditPost = document.getElementsByClassName("close")[1];

btnEditPost.onclick = function () {
  console.log("clicado");
  modalEditProfile.style.display = "block";
};

spanEditPost.onclick = function () {
  modalEditProfile.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalEditProfile) {
    modalEditProfile.style.display = "none";
  }
};
