import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Post } from "./models";

export const fetchPosts = async (program: any, filters = []) => {
    const posts = await program.account.post.all(filters);
    return posts.map((post: any) => new Post(post.publicKey, post.account));
};

export const authorFilter = (authorBase58PublicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    }
});

export const topicFilter = (topic: string) => ({
    memcmp: {
        offset: 8 + // Discriminator.
            32 + // Author public key.
            8 + // Timestamp.
            4, // Topic string prefix.
        bytes: bs58.encode(Buffer.from(topic)),
    }
});