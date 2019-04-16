import { Query } from '../index';

const all = async () => Query('select * from blogs');

const one = async (id: number) => Query('select blogs.id, blogs.title, blogs.content, authors.name as author, blogs._created from blogs join authors on authors.id = blogs.authorid where blogs.id=?', [id]);

const addpost = async (post: {
    title: string,
    content: string,
    tagid: number
}) => {
    let {insertId}: any = await Query(`insert into blogs (title, content, authorid) values (?)`, [post.title, post.content, 1]);
    Query(`insert into blogtags (blogid, tagid) values (?)`, [insertId, post.tagid]);
}

//changepost
const changepost = async (id: number, post: {title: string, content: string}) => {
    Query(`update blogs set title = "${post.title}", content ="${post.content}" where id=${id}`);
}

//remove
const remove = async (id: number) => {
    await Query(`delete from blogtags where blogid=${id}`);
    Query(`delete from blogs where id=${id}`);
}

const getTags = (id: number) => {
    return Query(`call spBlogTags(${id})`);
}

const allTags = async () => Query('select name from tags');

const all333: any = 0;

export default {
    all,
    one,
    addpost,
    changepost,
    remove,
    getTags,
    allTags
}