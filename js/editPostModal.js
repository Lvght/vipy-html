var modal = document.getElementById("editModal");

var btn = document.getElementById("editPostButton");

var span = document.getElementsByClassName("close")[1];

btn.onclick = function () {
  console.log("clicado");
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
