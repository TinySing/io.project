import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';
const ExpiresInKey = 'Admin-Expires-In';
const UserName = 'Admin-User-Name';
const NickName = 'Admin-Nick-Name';
const AdminType = 'Admin-Type-Level';
const AdminSex = 'Admin-User-Sex';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1;
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time);
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey);
}

export function setUsername(username) {
  return Cookies.set(UserName, username);
}

export function getUsername() {
  return Cookies.get(UserName);
}

export function removeUsername() {
  return Cookies.remove(UserName);
}

export function setNickname(nickname) {
  return Cookies.set(NickName, nickname);
}

export function getNickname() {
  return Cookies.get(NickName);
}

export function removeNickname() {
  return Cookies.remove(NickName);
}
export function setAdminType(type) {
  return Cookies.set(AdminType, type);
}

export function getAdminType() {
  return Cookies.get(AdminType);
}

export function removeAdminType() {
  return Cookies.remove(AdminType);
}
export function setAdminSex(type) {
  return Cookies.set(AdminSex, type);
}

export function getAdminSex() {
  return Cookies.get(AdminSex);
}

export function removeAdminSex() {
  return Cookies.remove(AdminSex);
}
