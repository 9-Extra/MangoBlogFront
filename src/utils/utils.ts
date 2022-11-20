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
    status?: number;

    description?: string;
    content?: string;

    operation: string;
}

//申请新的博客
export function blog_new(){
    let op: BlogOperation = {
        blog_id: 0,
        operation: BLOG_OPERATION.NEW
    }
    console.log(op)
    return api.post("/post", op);
}

//修改博客的状态
export function blog_modify(blog_id: number, status: number){
    let op: BlogOperation = {
        blog_id,
        status,
        operation: BLOG_OPERATION.REVODE
    }

    return api.post("/post", op);
}

//修改博客的内容
export function blog_edit(blog_id: number, description: string, content: string){
    let op: BlogOperation = {
        blog_id,
        description,
        content,
        operation: BLOG_OPERATION.EDIT
    }

    return api.post("/post", op);
}

export function get_blog_content(blog_id: number){
    return api.get("/private/blog?id=" + blog_id)
}
