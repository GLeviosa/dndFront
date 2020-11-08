import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { Component } from 'react'
import { Table, Container, TabContent, TabPane, Nav, NavItem, NavLink, Button, ListGroup, ListGroupItem, Input, Row, Col } from "reactstrap";
import classnames from 'classnames';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listMonsters: [],
            data: [{
                "name": "Aapple",
                "type": "fruit",
                "alignment": "full neutral",
                "challenge_rating": 0,
                "hit_points": 420
            }],
            activeTab: "1",
            encounter: {},
            newEncounter: {
                "name": "",
                "monsters": []
            },
            user: this.props.state.user,
            // dpOpen: false
            
        }

        this.getMonsters = this.getMonsters.bind(this);
        this.toggle = this.toggle.bind(this);
        // this.toggleDP = this.toggleDP.bind(this);
        this.newEncounter = this.newEncounter.bind(this);
        this.handleEncounter = this.handleEncounter.bind(this);
        
    }

    getMonsters(url) {
        axios.get(url)
            .then(resp => {
                console.log(resp.data.results)
                var { data } = this.state
                var newdata = data.concat(resp.data.results)
                // console.log("data",data)
                this.setState({
                    data: newdata
                })
                url = resp.data.next
                // console.log("URL", url)
                if (url){
                    this.getMonsters(url)
                } 
            })  
    }
    
    componentDidMount() {
        var url = "https://api.open5e.com/monsters/"
    
        this.getMonsters(url)     
            
    }
    // toggleDP(prevState) {
    //     this.setState(state => {
    //         state.dpOpen = !(prevState)
    //     })
    // }
    toggle(tab) {
        // console.log("tab: ", tab)
        // console.log("condition", (this.state.activeTab !== tab))
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
            // console.log("state", this.state)
        }
        
    }

    newEncounter(){
        const encounters = this.state.user.encounters
        const newEnc = this.state.newEncounter
        encounters.push(newEnc)
        this.setState((state) => {
            state.user.encounters = encounters
        })
        var url = "http://localhost:3003/users/user/" + this.state.user._id
        axios.put(url, this.state.user)
            .then(resp => {
                console.log("resp", resp.data)
                this.setState((state) => {
                    state.user = resp.data
                })
            })
            .catch(error => {
                console.log("error",error)
            })
    }

    handleEncounter(event) {
        var handleState = (state, event) => {
            state.newEncounter.name = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
        console.log("state", this.state)
    }
    render() {
        // console.log("state", this.state)
        
        var monstersArray = this.state.data
        // console.log("monsterArray: ", monstersArray)
        var dpOpen = this.state.dpOpen
        var tableMonsters = monstersArray.map(({name, type, alignment, challenge_rating, hit_points}) => {            
            return (
                <tr>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{alignment}</td>
                    <td>{challenge_rating}</td>
                    <td>{hit_points}</td>
                    <Button>+</Button>
                </tr>
            )
        })

        var encountersArray = this.state.user.encounters
        var listEncounters = encountersArray.map(({name, monsters}) => {
            return (
                <ListGroupItem>{name}</ListGroupItem>
            )
        })
        // console.log("props", this.props)
        // console.log("tableMonsters:", tableMonsters)
        let username;
        if (this.props.state.loggedStatus) {
            username = this.props.state.user.username
        } else {
            username = "Log In"
        }

        const activeTab = this.state.activeTab
        // console.log("activeTab: ", activeTab)
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            {username}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Monster List
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Encounters
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Account Settings</h4> 
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Container> 
                            <Table borderless striped>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Alignment</th>
                                        <th>CR</th>
                                        <th>Hit Points</th>
                                    </tr>
                                </thead>
                                <tbody> {tableMonsters} </tbody>
                            </Table>
                        </Container>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <h4>Encounters List</h4> 
                                <Input type="text" placeholder="Your new encounter" value={this.state.newEncounter.name}
                                    onChange={this.handleEncounter} />
                                   
                                <Button onClick={this.newEncounter}>+</Button>

                                <ListGroup>{listEncounters}</ListGroup>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                
            </div>
        )
    }
}