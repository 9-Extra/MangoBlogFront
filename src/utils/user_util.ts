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

export function get_user_information(): Promise<User> {
    let user: User | null = null;

    return api.post("/me").then(response => {
        if (response.data.code != 0){
            throw new Error(response.data.message);
        }    
        user = response.data.data;
    }).catch(
        err => {
            return err;
        }
    )
}

export function upload_head_image(file, progress?: Ref<number>){
    return upload_flie(file, "/profile", progress)
}