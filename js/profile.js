import { getUser, Request } from './utils.js'

$(document).ready(function () {
    const request = new Request({
        type: "GET",
        hasAuth: true,
        url: "/profiles/" + window.location.href.split('?id=')[1] + "/",

        onSuccess: (responseData) => {
            console.log(responseData);
            
            document.getElementById("displayName").innerText = responseData.display_name;
            document.getElementById("username").innerText = '@' + responseData.username;
        },
        onError: (error) => {
            console.log(error)
        }
    })

    request.send()
})

// Envia o formulário de edição de perfil.
$(document).on('click', '#submitEditProfileButton', function (e) {

    const request = new Request({
        type: "PATCH",
        hasAuth: true,
        url: "/profiles/" + window.location.href.split('?id=')[1] + "/",
        data: JSON.stringify(Object.fromEntries(new FormData(document.getElementById('editProfileForm')).entries())),
        onSuccess: (responseData) => {
            console.log(responseData);
            window.location.href = "./profile.html?id=" + getUser().id;
        },
        onError: (error) => {
            console.error(error)
        }
    })

    request.send()
})