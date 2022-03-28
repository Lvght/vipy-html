export default function injectCreatePostModalCallback() {
  let modalCreatePost = document.getElementById("myModal");

  let btnCreatePost = document.getElementById("myBtn");

  let spanCreatePost = document.getElementsByClassName("close")[0];

  btnCreatePost.onclick = function () {
    console.log("clicado");
    modalCreatePost.style.display = "block";
  };

  spanCreatePost.onclick = function () {
    modalCreatePost.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modalCreatePost) {
      modalCreatePost.style.display = "none";
    }
  };
}
