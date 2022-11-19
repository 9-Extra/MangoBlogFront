import api from "./axios_blog";
import popup_message from "./message_popup";
import { upload_flie } from "./file_util";
import type { Ref } from "vue";

interface User{
    id: number
    nick_name: string
    head_image: string
    privilege: string //权限
}

export async function get_user_information(): Promise<User | null> {
    return api.post("/me").then(response => {
        if (response.data.code != 0){
            popup_message(response.data.message, "error");
            return null;
        }    
        let data_user = response.data.data;

        let user: User = {
            id: data_user.id,
            nick_name: data_user.nick_name,
            head_image: data_user.head_image,
            privilege: data_user.privilege
        }

        return user;
    }).catch(err => {
        popup_message("网络出错", "error")
        return null;
    })
}

export function upload_head_image(file, progress?: Ref<number>){
    return upload_flie(file, "/profile", progress)
}