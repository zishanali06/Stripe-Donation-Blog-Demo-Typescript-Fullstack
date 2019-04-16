import * as React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import './scss/app';
import Blog from './components/Blog';
import Onepost from './components/Onepost';
import Admin from './components/Admin';
import Changepost from './components/Changepost';
import Login from './components/Login';
import Donations from './components/Donations';

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            name: null, blogposts: [{
                id: null,
                title: null,
                content: null,
                authorid: null,
                _created: null
            }]
        };
    }

    async componentWillMount() {
        let r1 = await fetch('/api/blogs');
        let name1 = await r1.json();
        this.setState({ blogposts: name1 });
    }

    render() {
        return (
            <Router>
                <main className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary nav-bar">
                        <Link to="/" className="navbar-brand">Zishan's Blog</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/admin' className="nav-link">Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/donate' className="nav-link font-weight-bold text-success border">Donate</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={Blog}></Route>
                        <Route exact path='/admin' component={Admin}></Route>
                        <Route exact path='/blog/edit' component={Changepost}></Route>
                        <Route exact path='/login' component={Login}></Route>
                        <Route exact path='/blog/:id' component={Onepost}></Route>
                        <Route exact path='/donate' component={Donations}></Route>
                    </Switch>
                </main>
            </Router>
        )
    }
}

interface IAppProps {

}

interface IAppState {
    name: string;
    blogposts: [{
        id: number,
        title: string,
        content: string,
        authorid: number,
        _created: string
    }];
}