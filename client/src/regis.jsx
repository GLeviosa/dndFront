import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { BrowserRouter as Redirect} from 'react-router-dom'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {user : {
            username: "",
            email: "",
            password: ""
            },
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.test = this.test.bind(this);
    }

    register(event) {
        axios.post("http://localhost:3003/users/register", this.state.user)
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) {
                    this.props.history.push("/")
                } 
                console.log(resp)
            })
            .catch((erro) => {
                this.setState({
                    error: erro.response.data.error
                })
            });
            // console.log("erro", this.state.error)
        
        };
    
    handleChange(event) {
        var handleState = (state, event) => {
            var name = event.target.name
            state.user[name] = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
    }
    
    test(event) {
        this.props.history.push("/")
    }

    render() {
        const error = this.state.error
        let errMsg;
        if (error) {
            errMsg = (
                <FormGroup>
                    <Label>{error}</Label>
                </FormGroup>
            ) 
        } 
        


        
            
        return (
            <Container fluid="sm">
                <Form>
                    <FormGroup>
                        <Label>Username:</Label>
                        <Input type="name" name="username" id="username" placeholder="Username" value={this.state.user.username}
                        onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email" name="email" id="email" placeholder="username@example.com" value={this.state.user.email}
                        onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" value={this.state.user.password}
                    onChange={this.handleChange} />
                    </FormGroup>
                    {errMsg}
                    
                </Form>
                <Button color="primary" onClick={this.register}>Register </Button>
            </Container>
        )
    }
}