import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Donateform from './Donateform';


export default class Donations extends React.Component<DonationsProps, DonationsState> {
    constructor(props: DonationsProps) {
        super(props);
        this.state = {
            name: "",
            amount: ""
        };
    }
    render() {
        return (
            <section className="row">
                <section className="col-12"><h1><br /></h1>
                    <h1><br /></h1>
                </section>
                <section className="col-12 text-center text-success"><h1>Please Donate To Keep this Blog Active</h1></section>
                <section className="col-3"></section>
                <section className="col-6">
                    <StripeProvider apiKey="pk_test_8hdBBnvqcTf29c9JgcftXz9b00ZND2xBT9">
                        <Elements>
                            <Donateform />
                        </Elements>
                    </StripeProvider>
                </section>
                <section className="col-3"></section>

            </section>
        );
    }
}

export interface DonationsProps {

}

export interface DonationsState {

}