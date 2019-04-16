import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Changepost extends React.Component<ChangepostProps, ChangepostState>{
    constructor(props: ChangepostProps) {
        super(props)
        this.state = {
            title: this.props.location.state.title,
            tag: '1',
            content: this.props.location.state.content
        }
    }

    async componentDidMount() {
        
    }

    handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: e.target.value })
    }

    handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ content: e.target.value })
    }

    handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        let addpost = {
            title: this.state.title, 
            content: this.state.content
        };
        fetch(`/api/blogs/change/${this.props.location.state.id}`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(addpost)
        }).then(() => this.props.history.push(`/blog/${this.props.location.state.id}`))
        .catch(e => console.log(e));
    }

    handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        fetch(`/api/blogs/delete/${this.props.location.state.id}`, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrer: "no-referrer",
        }).then(() => this.props.history.push(`/`))
        .catch(e => console.log(e));

    }

    render() {
        return (
            <section className="row">
                <section className="col-12"><h1><br /></h1>
                    <h1><br /></h1>
                </section>
                <section className="col-2"></section>
                <section className="col-8">
                    <form>
                        <section className="form-group">
                            <label htmlFor="exampleFormControlInput1">Title</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={this.state.title} value={this.state.title} onChange={this.handleTitle} />
                        </section>
                        <section className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Content</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={this.state.content} onChange={this.handleContent}></textarea>
                        </section>
                        <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Save Edit</button>
                        <button type="submit" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </form>
                </section>
                <section className="col-2"></section>
            </section>
        )
    }
}

interface ChangepostProps extends RouteComponentProps {

}

interface ChangepostState {
    title: string,
    tag: string,
    content: string
}