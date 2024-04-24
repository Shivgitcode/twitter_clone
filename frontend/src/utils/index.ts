export type Comments = {
    id: string
    comment: string
    img: string
    postId: string
}

type User = {
    id: string
    img: string
    password: string
    email: string
    username: string

}

export interface Post {
    id: string
    date: string
    img: string
    like: boolean;
    title: string;
    userId: string;
    user: User;
    comments: Comments[]
}