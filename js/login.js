import { setUser, Request, getUser } from "./utils.js";

$(document).ready(function () {
  $("#loginButton").click(function (event) {
    //stop submit the form, we will post it manually.
    event.preventDefault();

    // Get form
    var form = $("#loginForm")[0];

    // Create an FormData object
    var data = new FormData(form);

    // disabled the submit button
    $("#loginButton").prop("disabled", true);

    $("#output").text("");

    const request = new Request({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://vipyv-api.herokuapp.com/profiles/login/",
      data: data,
      crossdomain: true,
      processData: false,
      contentType: false,
      timeout: 800000,
      onSuccess: function (data) {
        setUser(data);
        window.location.href = "./home.html";
      },
      onError: function (e) {
        const statusCode = e.status;
        $("#loginButton").prop("disabled", false);

        if (statusCode === 404 || statusCode === 403 || statusCode === 400) {
          $("#output").text("Username or password is incorrect");
        }
      },
    });
    console.log(request);
    request.send();
  });
});
