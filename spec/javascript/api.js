export function APIRequest() {
    return fetch('/spotify.json').then(res => res.json())
}