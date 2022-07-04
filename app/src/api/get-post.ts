import { Post } from "./models";

export const getPost = async (program: any, publicKey: any) => {
    const account = await program.account.post.fetch(publicKey);
    return new Post(publicKey, account);
};