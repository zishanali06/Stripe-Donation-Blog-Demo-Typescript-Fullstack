import * as React from 'react';
import { injectStripe, CardElement, ReactStripeElements } from 'react-stripe-elements';

class Donateform extends React.Component<DonateformProps, DonateformState> {
    constructor(props: DonateformProps){
        super(props);
        this.state = {
            name: "",
            amount: ""
        }
    }

    handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('test');
        try {
            let { token } = await this.props.stripe.createToken({ name: this.state.name });
            let amount = this.state.amount;
            console.log(token);
            await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ token, amount })
            });
            //redirect, clear inputs, thank alert
        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <form 
                    className="form-group mt-3 border border-primary rounded shadow-lg p-3"
                    onSubmit={this.handleSubmit}
                    >
                    <label>Name</label>
                    <input
                        type="text"
                        className="input-group my-1 p-1 border border-dark"
                        value={this.state.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                    />
                    <label>Amount</label>
                    <input
                        type="text"
                        className="input-group my-1 p-1 border border-dark"
                        value={this.state.amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ amount: e.target.value })}
                    />
                    <label>Credit Card Information:</label>
                    <CardElement className="p-2 border border0-dark" />
                    <button className="btn btn-primary border border-dark mt-3">Charge It!</button>
                </form>
        )
    }
}
interface DonateformProps extends ReactStripeElements.InjectedStripeProps {}
interface DonateformState {
    name: string,
    amount: string
}

export default injectStripe(Donateform);