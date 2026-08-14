import {jwtDecode} from "jwt-decode";

export function logout(): void {
   localStorage.removeItem("access_token");
}

export function check_token(): string | null {
   let token = localStorage.getItem("access_token");
   if (token) {
      let decodedToken = jwtDecode(token);
      let expiryTime = decodedToken["exp"];

      let currTime = Date.now() / 1000;
      if (expiryTime && expiryTime < currTime) {
         localStorage.removeItem("access_token");
         console.log("Found expired token for " + decodedToken["sub"] + " -- " + expiryTime + " < " + currTime)
         return null;
      } else {
         return token;
      }
   }
   return null;
}

export function successful_login(login_func: () => void, access_token: string): void {
   localStorage.setItem("access_token", access_token);
   login_func();
}
