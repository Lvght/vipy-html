$(document).ready(function () {
  var client = new XMLHttpRequest();
  client.open("GET", "/templates/html/_navbar.html");
  client.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      $("#navbar").html(client.responseText);
      $("#logoutIcon").click(function (event) {
        document.cookie =
          "user=;path=/pages;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=" +
          location.host;
        window.location.href = "/";
      });
    }
  };
  client.send();
});
