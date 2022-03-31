import { Request } from './utils.js'

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