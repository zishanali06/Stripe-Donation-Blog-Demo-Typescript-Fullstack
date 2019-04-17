import * as express from 'express';
import * as passport from 'passport';
import * as stripeLoader from 'stripe';
import config from '../../config'

import apiBlogRoutes from './blogs';

const router = express.Router();

const stripe = new stripeLoader(config.stripe.secretapi);

const charge = (token: string, amt: number) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'Charged for Zishans Cosulting Service'
    });
};

router.post('/api/donate', async (req, res, next) => {
    try{
        let data = await charge(req.body.token.id, req.body.amount);
        console.log(data);
        res.status(200).json(`Card Charged for ${req.body.amount}`);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false}, (err, user, info) => {
        if(err) console.log(err);
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/blogs', apiBlogRoutes);

export default router;