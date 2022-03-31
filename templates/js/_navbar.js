$(document).ready(function () {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_navbar.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      $("#navbar").html(client.responseText);
    }
  };
  client.send();
});
