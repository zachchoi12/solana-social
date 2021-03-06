import { web3 } from '@project-serum/anchor'
import { CreateNotificationType } from '../notification';
import { Post } from "./models";

export const sendPost = async (workspace: any, topic: string, content: string, notification: any, resetForm: () => void) => {
    const { wallet, program } = workspace;
    const post = web3.Keypair.generate();
    notification.setNotification(CreateNotificationType.loading);
    const tx = await program.methods.sendPost(topic, content).accounts({
        post: post.publicKey,
        author: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
    }).signers([post]).rpc();
    resetForm();
    await program.provider.connection.confirmTransaction(tx);
    const postAccount = await program.account.post.fetch(post.publicKey).then((response: any) => { notification.setNotification(CreateNotificationType.success); return response; }).catch((response: any) => { notification.setNotification(CreateNotificationType.failure); return response });
    return new Post(post.publicKey, postAccount);
}