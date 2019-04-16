import * as React from 'react';
import { json, SetAccessToken } from '../utils/api';
import { RouteComponentProps } from 'react-router-dom';

export default class Login extends React.Component<LoginProps, LoginState>{
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    async componentDidMount() {

    }

    handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value })
    }

    handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        try{
            let result = await json('/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });
            if(result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                if(result.role === 'guest') {
                    this.props.history.replace('/admin');
                } else {
                    this.props.history.push('/');
                }
            } else {
                this.props.history.push('/');
            }
        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <section className="row">
                <section className="col-12"><h1><br /></h1>
                    <h1><br /></h1>
                </section>
                <section className="col-4"></section>
                <section className="col-4">
                    <form>
                        <section className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email</label>
                            <input type="email" className="form-control shadow-sm" id="exampleFormControlInput1" placeholder="Email" value={this.state.email} onChange={this.handleEmail} />
                        </section>
                        <section className="form-group">
                            <label htmlFor="exampleFormControlInput2">Password</label>
                            <input type="password" className="form-control shadow-sm" id="exampleFormControlInput2" placeholder="Password" value={this.state.password} onChange={this.handlePassword} />
                        </section>
                        <button type="submit" className="btn btn-primary mt-3 shadow-lg" onClick={this.handleClick}>Login</button>
                    </form>
                </section>
                <section className="col-4"></section>
            </section>
        )
    }
}

interface LoginProps extends RouteComponentProps {

}

interface LoginState {
    email: string,
    password: string
}