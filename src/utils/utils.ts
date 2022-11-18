import api from "./axios_blog";

export interface CodeInfo<T> {
    code:number
    message: string
    data : T
}
export interface Blog{
    id: number;
    authorid: number;
    status: number;//0 new&&!save//1 save //2 publish
    description: string;
    content: string;
}

export const enum BLOG_OPERATION {
    NEW = "new",//新建空白Blog
    SAVE = "save",//保存到草稿箱
    POST = "post",
    EDIT = "edit",
    DELETE = "delete",
    REVODE = "revoke"
}
interface BlogOperation{
    blog_id: number;
    blog? : Blog;
    operation: string;
}


export function blog_operation(blog_id: number, operation: BLOG_OPERATION, blog? : Blog){
    let op: BlogOperation = {
        blog_id,
        operation,
        blog
    }

    return api.post("/post", op);
}
