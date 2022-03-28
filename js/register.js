$(document).ready(function () {
 
    $("#registerButton").click(function (event) {
 
        const toClean = ["username", "display_name", "email", "password", "birthday"];

        for(let key in toClean){
            $("#" + toClean[key] +"_e").text("");
        }

        //stop submit the form, we will post it manually.
        event.preventDefault();
 
        // Get form
        var form = $('#registerForm')[0];
 
       // Create an FormData object 
        var data = new FormData(form);

        if (data.get('birthday') === '') {
            data.delete('birthday')
        }
        // TODO Limpar mensagens de erro

       // disabled the submit button
        $("#registerButton").prop("disabled", true);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "https://vipyv-api.herokuapp.com/profiles/",
            data: data,
            crossdomain: true,
            processData: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {
 
                window.location.href = "./verify.html";
 
            },
            error: function (e) {
                const statusCode = e.status;
                $("#registerButton").prop("disabled", false);

                if (statusCode === 404 || statusCode === 500 || statusCode === 400) {
                    const obj = JSON.parse(e.responseText);
                    for(let key in obj){
                        $("#" + key +"_e").text(obj[key]);
                    }
                }
 
            }
        })
 
    });
 
});