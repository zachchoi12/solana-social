import dayjs from "dayjs";

export class Post {
    publicKey: any;
    author: any;
    timestamp: any;
    topic: any;
    content: any;
    constructor (publicKey: any, accountData: any) {
        this.publicKey = publicKey;
        this.author = accountData.author;
        this.timestamp = accountData.timestamp.toString();
        this.topic = accountData.topic;
        this.content = accountData.content;
    }
    get key () {
        return this.publicKey.toBase58();
    }
    get author_display () {
        return this.author.toBase58();
    }
    get created_at () {
        return dayjs.unix(this.timestamp).format('lll');
    }
    get created_ago () {
        return dayjs.unix(this.timestamp).fromNow();
    }
}