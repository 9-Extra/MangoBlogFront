const TOKEN_NAME = "TOKEN"

function set_token(token: string | null){
    if (token != null){
        window.localStorage.setItem(TOKEN_NAME, token)
    } else {
        window.localStorage.removeItem(TOKEN_NAME);
    }
}

function get_token(): string | null{
    return window.localStorage.getItem(TOKEN_NAME)
}

export default {set_token, get_token}