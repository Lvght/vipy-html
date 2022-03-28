export function getUser() {
  const userString = document.cookie.split("user=")[1];
  const user = JSON.parse(userString);
  return new User(user);
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

export function replaceClassText(className, text) {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].innerText = text;
  }
}
