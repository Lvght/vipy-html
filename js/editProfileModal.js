let modalEditProfile = document.getElementById("editProfileModal");
let btnEditProfile = document.getElementById("editProfileButton");
let spanEditPost = document.getElementsByClassName("close")[0];

btnEditProfile.onclick = function () {
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
