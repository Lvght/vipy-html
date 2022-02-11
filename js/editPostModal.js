let modalEditPost = document.getElementById("editModal");

let btnEditPost = document.getElementById("editPostButton");

let spanEditPost = document.getElementsByClassName("close")[1];

btnEditPost.onclick = function () {
  console.log("clicado");
  modalEditPost.style.display = "block";
};

spanEditPost.onclick = function () {
  modalEditPost.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalEditPost) {
    modalEditPost.style.display = "none";
  }
};
