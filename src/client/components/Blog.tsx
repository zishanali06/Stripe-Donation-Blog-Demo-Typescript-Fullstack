import * as React from 'react';
import Blogcard from './Blogcard';
import { json } from '../utils/api';

export default class Blog extends React.Component<IBlogProps, IBlogState> {

    constructor(props: IBlogProps) {
        super(props);

        this.state = {
            blogposts: [{
                id: null,
                title: null,
                content: null,
                author: null,
                _created: null
            }]
        };
    }

    async componentDidMount() {
        let blogposts = await json('/api/blogs');
        this.setState({ blogposts });
    }

    render() {
        return (
            <section className="row text-center">
                <section className="col-12"><h1><br /></h1>
                    <h1><br /></h1>
                </section>
                <section className="row">
                    {this.state.blogposts.map((blog) => {
                        return <Blogcard key={blog.id} post={blog}></Blogcard>
                    })}
                </section>
            </section>
        )
    }
}

interface IBlogProps {

}

interface IBlogState {
    blogposts: [{
        id: number,
        title: string,
        content: string,
        author: string,
        _created: string
    }];
}