import api from "./axios_blog";
import popup_message from "./message_popup";
import { upload_flie } from "./file_util";
import type { Ref } from "vue";

export interface User{
    id: number
    nickname: string
    head_image: string
    privilege: string //权限
}

export function get_user_information() {
    return api.post("/me").then(response => {
        if (response.data.code != 0){
            popup_message("无法获取用户信息: " + response.data.message, "error");
            return null;
        }    
        let data_user = response.data.data;

        let user: User = {
            id: data_user.id,
            nickname: data_user.nickname,
            head_image: data_user.head_image,
            privilege: data_user.privilege
        }

        return user;
    }).catch(err => {
        popup_message("网络出错: " + err.message, "error")
        
        return null;
    })
}

export function upload_head_image(file, progress?: Ref<number>){
    return upload_flie(file, "/profile", progress)
}