import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user : {
            id: "",
            username: "",
            email: "",
            password: "",
            },
            loggedStatus: false,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        axios.post("http://localhost:3003/users/authenticate", this.state.user)
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) {
                    // console.log("response auth", resp.data)
                    this.setState((state) => {
                        state.user = resp.data.user
                        state.loggedStatus = resp.data.loggedStatus
                    })
                    this.props.handleLogin(this.state)
                    this.props.history.push("/main")
                }
            })
            .catch((erro) => {
                this.setState({
                    error: erro.response.data.error
                })
            });
    }

    handleChange(event) {
        var handleState = (state, event) => {
            var name = event.target.name
            state.user[name] = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
    }

    render() {
        const error = this.state.error
        let errMsg;

        if (error) {
            errMsg = (
                <FormGroup>
                    <Label color="danger">{error}</Label>
                </FormGroup>
            )
        } else {
            errMsg = (
                <FormGroup>
                </FormGroup>
            )
        }

        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email:</Label>
                        <Input type="email" name="email" id="email" placeholder="username@example.com" value={this.state.user.email}
                        onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password:</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" value={this.state.user.password}
                    onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label><a href="http://localhost:3000/register">New? Sign in here.</a></Label>
                    </FormGroup>
                    {errMsg}
                </Form>
                <Button color="primary" onClick={this.login}>Log in</Button>
            </Container>
        )
    }
}