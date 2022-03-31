let modalEditPost = document.getElementById("editModal");


let spanEditPost = document.getElementsByClassName("close")[1];


spanEditPost.onclick = function () {
  modalEditPost.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalEditPost) {
    modalEditPost.style.display = "none";
  }
};
