import * as path from 'path';
import * as express from 'express';
import * as passport from 'passport';

//importing passport strategies
import './middleware/localstrategy';
import './middleware/bearerstrategy';

//importing router
import routes from './routes';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

let p = path.join(__dirname, '../public');

app.use(express.static(p));

//initialize passport strategies to intercept requests at this point
app.use(passport.initialize());

//adding my api routes to middleware
app.use(routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
