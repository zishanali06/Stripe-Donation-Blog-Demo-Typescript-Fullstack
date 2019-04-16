import * as mysql from 'mysql';
import auth from '../config';

//importing table queries
import Blogs from './queries/blogs';
import Users from './queries/users';
import AccessTokens from './queries/accesstokens';

export const Connection = mysql.createConnection(auth.mysql);

export const Query = (query: string, values?: Array<number | string>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, [values], (err, results) => {
            if(err) console.log(err);
            return resolve(results);
        });
    });
};

export default {
    Blogs,
    Users,
    AccessTokens
};

