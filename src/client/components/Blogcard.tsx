import * as React from 'react';
import { Link } from 'react-router-dom';


export default class Blogcard extends React.Component<IBlogcardProps, IBlogcardState>{
    constructor(props: IBlogcardProps) {
        super(props)
    }

    render() {
        if(this.props.post.content == null){
            return (<section></section>);
        }
        if(this.props.post.content.length > 64) {
            this.props.post.content = this.props.post.content.slice(0,90).concat('...');
        }
        return (
            <section className="col-4 mt-3">
                <div className="card shadow-lg">
                <img className="card-img-top" src="https://vignette.wikia.nocookie.net/gameofthrones/images/8/8a/House-Stark-Main-Shield.PNG" alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.post.title}</h5>
                        <p className="card-text">{this.props.post.content}</p>
                        <Link to={`/blog/${this.props.post.id}`} className="btn btn-primary">View Post</Link>
                    </div>
                </div>
            </section>
        )
    }
}

interface IBlogcardProps {
    post: {
        id: number,
        title: string,
        content: string,
        author: string,
        _created: string
    }
}

interface IBlogcardState {

}