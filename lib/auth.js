import isJwtTokenExpired from "jwt-check-expiry";


export function isAuthenticated() {
  return false;
}


export const checkTokenExpiry = (token = "") => {
  try {
    return !isJwtTokenExpired(token);
  } catch (error) {
    console.log("error in check login", error);
    return false;
  }
};