export function startOAuth2Login(provider: "google" = "google") {
    // proxy + rewrites 쓰는 구조면 상대경로가 정답
    window.location.href = `/oauth2/authorization/${provider}`;
}