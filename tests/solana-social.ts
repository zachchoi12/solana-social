import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaSocial } from "../target/types/solana_social";
import * as assert from "assert";
import * as bs58 from "bs58";

describe("solana-social", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaSocial as Program<SolanaSocial>;

  it('can send a new post', async () => {
    const post = anchor.web3.Keypair.generate();
    await program.methods.sendPost('noop', 'hi dis is yam').accounts({ 
        post: post.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([post]).rpc();

    const postAccount = await program.account.post.fetch(post.publicKey);
  	assert.equal(postAccount.author.toBase58(), provider.wallet.publicKey.toBase58());
    assert.equal(postAccount.topic, 'noop');
    assert.equal(postAccount.content, 'hi dis is yam');
    assert.ok(postAccount.timestamp);
  });

  it('can send a new post without a topic', async () => { 
    const post = anchor.web3.Keypair.generate();
    await program.methods.sendPost('', 'hi dis is yam').accounts({
        post: post.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([post]).rpc();

    const postAccount = await program.account.post.fetch(post.publicKey);
  	assert.equal(postAccount.author.toBase58(), provider.wallet.publicKey.toBase58());
    assert.equal(postAccount.topic, '');
    assert.equal(postAccount.content, 'hi dis is yam');
    assert.ok(postAccount.timestamp);
  });

  it('can send a new post from a different author', async () => {
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    const blockHash = await program.provider.connection.getLatestBlockhash();
    await program.provider.connection.confirmTransaction({
      blockhash: blockHash.blockhash, 
      lastValidBlockHeight: blockHash.lastValidBlockHeight,
      signature: signature
    });
    
    const post = anchor.web3.Keypair.generate();
    await program.methods.sendPost('noop', 'hi dis is yam').accounts({
        post: post.publicKey,
        author: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([post, otherUser]).rpc();

    const postAccount = await program.account.post.fetch(post.publicKey);
  	assert.equal(postAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(postAccount.topic, 'noop');
    assert.equal(postAccount.content, 'hi dis is yam');
    assert.ok(postAccount.timestamp);
  });

  it('cannot provide a topic with more than 50 characters', async () => {
    try {
      const post = anchor.web3.Keypair.generate();
      const topicWith51Chars = 'x'.repeat(51);
      await program.methods.sendPost(topicWith51Chars, 'hi dis is yam').accounts({
        post: post.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).signers([post]).rpc();
    }
    catch (error) {
      assert.equal(error.error.errorMessage, 'The provided topic should be 50 characters long maximum.');
      return;
    }
    assert.fail('The instruction should have failed with a 51-character topic.');
  });

  it('cannot provide a content with more than 280 characters', async () => {
    try {
      const post = anchor.web3.Keypair.generate();
      const contentWith281Chars  = 'x'.repeat(281);
      await program.methods.sendPost('noop', contentWith281Chars).accounts({
        post: post.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).signers([post]).rpc();
    }
    catch (error) {
      assert.equal(error.error.errorMessage, 'The provided content should be 280 characters long maximum.');
      return;
    }
    assert.fail('The instruction should have failed with a 281-character content.');
  });

  it('can fetch all posts', async () => {
    const postAccounts = await program.account.post.all();
    assert.equal(postAccounts.length, 3);
  });

  it('can filter post by author', async () => {
    const authorPublicKey = provider.wallet.publicKey
    const postAccounts = await program.account.post.all([
        {
            memcmp: {
                offset: 8,
                bytes: authorPublicKey.toBase58(),
            }
        }
    ]);

    assert.equal(postAccounts.length, 2);
    assert.ok(postAccounts.every(postAccount => {
      return postAccount.account.author.toBase58() === authorPublicKey.toBase58()
    }))
  });

  it('can filter posts by topics', async () => {
    const postAccounts = await program.account.post.all([
        {
            memcmp: {
                offset: 8 +
                    32 +
                    8 +
                    4,
                bytes: bs58.encode(Buffer.from('noop')),
            }
        }
    ]);

    assert.equal(postAccounts.length, 2);
    assert.ok(postAccounts.every(tweetAccount => {
        return tweetAccount.account.topic === 'noop'
    }))
  });
});
