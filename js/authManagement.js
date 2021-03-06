import { getUser, setUser, Request } from "./utils.js";

export function tryRefreshToken(oldRequest) {
  let user = getUser();
  if (!user.tokens.access) {
    window.location.href = "/";
    return;
  }

  const data = {
    refresh: user.tokens.refresh,
  };

  const request = new Request({
    shouldRefreshToken: false,
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    url: "/profiles/refresh/",
    data: JSON.stringify(data),
    crossdomain: true,
    timeout: 800000,
    onSuccess: function (data) {
      user.tokens.access = data.access;
      user.tokens.refresh = data.refresh;
      setUser(user);
      (oldRequest.beforeSend = function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + user.tokens.access);
      }),
        oldRequest.send();
    },
    onError: function (e) {
      document.cookie = "";
      window.location.href = "/";
      console.log('tentando sair')
    },
  });
  request.send();
}
