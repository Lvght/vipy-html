import { User, getUser, setUser, Request } from './utils.js'

function getPersonalityText(personality) {
    switch (personality) {
        case 1: return "ISTJ"
        case 2: return "ISFJ"
        case 3: return "INFJ"
        case 4: return "INTJ"
        case 5: return "ISTP"
        case 6: return "ISFP"
        case 7: return "INFP"
        case 8: return "INTP"
        case 9: return "ESTP"
        case 10: return "ESFP"
        case 11: return "ENFP"
        case 12: return "ENTP"
        case 13: return "ESTJ"
        case 14: return "ESFJ"
        case 15: return "ENFJ"
        case 16: return "ENTJ"
        default: return "Não definido"
    }
}

$(document).ready(function () {
    const request = new Request({
        type: "GET",
        hasAuth: true,
        url: "/profiles/" + window.location.href.split('?id=')[1] + "/",

        onSuccess: (responseData) => {
            console.log(responseData);

            const user = new User(responseData)
            const oldUser = getUser()
            
            user.tokens = oldUser.tokens

            setUser(user)

            document.getElementById('displayName').innerText = user.display_name;
            document.getElementById('username').innerText = '@' + user.username;
            document.getElementById('biography').innerText = user.biography;
            document.getElementById('almaMater').innerText = user.alma_mater;
            document.getElementById('city').innerText = user.city;
            document.getElementById('contactNumber').innerText = user.contact_number;
            document.getElementById('personality').innerText = getPersonalityText(user.personality)

            // Injeta os valores iniciais no formulário de edição de perfil.
            document.getElementById('edit-displayName').value = user.display_name;
            document.getElementById('edit-birthday').value = user.birthday
            document.getElementById('edit-almaMater').value = user.alma_mater;
            document.getElementById('edit-biography').value = user.biography;
            document.getElementById('edit-city').value = user.city;

            const dropdown = document.getElementById('edit-personality')
            dropdown.value = user.personality
            
            document.getElementById('edit-contactNumber').value = user.contact_number;
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