import { tryRefreshToken } from "./authManagement.js";

export function getUser() {
  const userString = document.cookie.split("user=")[1].split(";")[0];
  const user = JSON.parse(userString);
  return new User(user);
}

export function setUser(user) {
  document.cookie = "user=" + JSON.stringify(user);
}

export class User {
  constructor(dict) {
    this.alma_mater = dict.alma_mater;
    this.biography = dict.biography;
    this.birthday = dict.birthday;
    this.city = dict.city;
    this.contact_number = dict.contact_number;
    this.display_name = dict.display_name;
    this.email = dict.email;
    this.gender = dict.gender;
    this.id = dict.id;
    this.personality = dict.personality;
    this.tokens = dict.tokens;
    this.username = dict.username;
    this.workplace = dict.workplace;
    this.zodiac_sign = dict.zodiac_sign;
  }
}

export class Post {
  constructor(dict) {
    this.id = dict.id;
    this.content = dict.content;
    this.comment_of = dict.comment_of;
    this.attached_post = dict.attached_post;
    this.created_at = dict.created_at;
    this.reactions = dict.reactions;
    this.author = new User(dict.author);
  }
}

export class Request {
  constructor(dict) {
    this.url = dict.url;
    this.type = dict.type;
    this.enctype = dict.enctype;
    this.data = dict.data;
    this.crossdomain = dict.crossdomain;
    this.processData = dict.processData;
    this.contentType = dict.contentType;
    this.timeout = dict.timeout;
    this.hasAuth = dict.hasAuth;
    this.beforeSend = dict.beforeSend;
    this.onSuccess = dict.onSuccess;
    this.onError = dict.onError;
  }

  send() {
    const request = this;
    $.ajax({
      type: this.type,
      enctype: "multipart/form-data",
      url: this.url,
      data: this.data,
      crossdomain: this.crossdomain,
      processData: this.processData,
      contentType: this.contentType,
      timeout: this.timeout,
      beforeSend: function (xhr) {
        if (request.hasAuth) {
          const token = getUser().tokens.access;
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
        if (request.beforeSend) {
          request.beforeSend;
        }
      },
      success: this.onSuccess,
      error: function (e) {
        const statusCode = e.status;
        if (statusCode === 401) {
          tryRefreshToken(request);
        } else {
          request.onError(e);
        }
      },
    });
  }
}

export function replaceClassText(className, text) {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].innerText = text;
  }
}
