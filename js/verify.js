import { getUser, setUser, Request } from "./utils.js";

$(document).ready(function () {
  $("#verifyButton").click(function (event) {
    //stop submit the form, we will post it manually.
    event.preventDefault();

    // Get form
    var form = $("#verifyForm")[0];

    // Create an FormData object
    var data = new FormData(form);

    $("#output").text("");

    // disabled the submit button
    $("#verifyButton").prop("disabled", true);

    const request = new Request({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://vipyv-api.herokuapp.com/profiles/verify/",
      data: data,
      crossdomain: true,
      processData: false,
      contentType: false,
      timeout: 800000,
      onSuccess: function (data) {
        let user = getUser();
        user.tokens = data.tokens;
        setUser(user);

        window.location.href = "./home.html";
      },
      onError: function (e) {
        $("#verifyButton").prop("disabled", false);

        $("#output").text("Wrong or Invalid code");
      },
    });
    request.send();
  });
});
