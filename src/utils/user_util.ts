import api from "./axios_blog";
import popup_message from "./message_popup";
import { upload_flie } from "./file_util";
import type { Ref } from "vue";

export interface User{
    id: number
    nickname: string
    age: number
    headImageUrl: string
    privilege: string //权限
}

export function get_user_information(): Promise<User> {
    return api.post("/me").then(response => {
        if (response.data.code != 0){
            throw new Error(response.data.message);
        }    
        return response.data.data;
    }).catch(
        err => {
            return err;
        }
    )
}

//获取其他用户的信息
export function get_user_information_by_id(id: number): Promise<User> {
    return api.get(`/user/${id}`).then(response => {
        if (response.data.code != 0){
            throw new Error(response.data.message);
        }    
        return response.data.data;
    }).catch(
        err => {
            return err;
        }
    )
}

export function upload_head_image(file, progress?: Ref<number>){
    return upload_flie(file, "/profile", progress)
}