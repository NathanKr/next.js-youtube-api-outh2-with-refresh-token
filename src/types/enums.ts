export enum LoginStatus {
  LoginSuccess,
  LoginFailure,
  LoginRequired,
}

export enum Pages {
  Login = "/login",
  Home = "/",
  Videos = "/videos",
}

export enum ApiUrl {
  Login = "/api/authlogin",
  AuthCallback = "/api/oauth2callback", // not used by this enum, call from auth
  Videos = "/api/videos",
  RefreshToken = "/api/refresh-token",
  UserInfo = "/api/user-info",
}
