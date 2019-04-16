import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';


export default class Onepost extends React.Component<IOnepostProps, IOnepostState>{
    constructor(props: IOnepostProps) {
        super(props)
        this.state = {
            post: {
                id: null,
                title: '',
                content: '',
                author: null,
                _created: null
            },
            tags: []
        }
    }

    //when mounted
    async componentWillMount() {
        let r = await fetch(`/api/blogs/${this.props.match.params.id}`);
        let post = await r.json();
        this.setState({ post: post[0] });

        let r2 = await fetch(`/api/blogs/tags/${this.props.match.params.id}`);
        let newdata = await r2.json()
        let getags = newdata[0].map((x: any, index: React.ReactText) => {
            return newdata[0][index].name;
        });
        this.setState({ tags: getags })
    }

    //render to screen
    render() {
        return (
            <section className="row">
            <section className="col-12"><h1><br /></h1>
                    <h1><br /></h1>
                </section>
                <section className="col-2"></section>
                <section className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{this.state.post.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Author: {this.state.post.author}</h6>
                            {this.state.tags.map((tag, i) => {
                                return <h6 className="card-subtitle ml-3 px-1 d-inline tag" key={i}>{tag}</h6>
                            })}
                            <hr/>
                            <p className="card-text">{this.state.post.content}</p>
                            <Link to={{
                            pathname: '/blog/edit',
                            state: this.state.post
                        }} className="card-link">Edit Post</Link><Link to='/' className="card-link">Go back</Link>
                        </div>
                    </div>
                </section>
                <section className="col-2"></section>
            </section>
        )
    }
}

interface IOnepostProps extends RouteComponentProps<{ id: string }> {

}

interface IOnepostState {
    post: {
        id: number;
        title: string;
        content: string;
        author: string;
        _created: string;
    },
    tags: any[]
}