const TOKEN_NAME = "TOKEN"

function set_token(token: string){
    window.localStorage.setItem(TOKEN_NAME, token)
}

function get_token(): string | null{
    return window.localStorage.getItem(TOKEN_NAME)
}

export default {set_token, get_token}