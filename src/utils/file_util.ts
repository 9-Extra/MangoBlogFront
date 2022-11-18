import type { Ref } from "vue";
import api from "./axios_blog";
import popup_message from "./message_popup";

export function upload_flie(file, interface_url: string, progress?: Ref<number>){

    let formData = new FormData()
    formData.append('file', file)

    return api.post(interface_url, formData, {
        headers: {
            'Content-Type':'multipart/form-data'
        },
        transformRequest: [function (data) {
            return data
        }],
        onUploadProgress: progressEvent => {
            if (progress && progressEvent.total){
                progress.value = progressEvent.loaded / progressEvent.total
            }
        }
    })
}