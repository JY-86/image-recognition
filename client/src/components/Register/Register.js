import React from 'react';
import 'tachyons';

import url from '../../utils/backend-url-resolver';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            regError: false,
            serverError: false,
        };
    }

    onInputChange = (e, property) => {
        this.setState({[property]: e.target.value});
        console.log(this.state.email);
    }

    onSubmit = async () => {
        // register user with backend api
        let res = await fetch(url + "/register", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        });
        try {
            res = await res.json();
            console.log(res);
            if (res.valid) {
                this.props.loadUser(res.user);
                this.props.onRouteChange('home');
            }
            else {
                this.setState({regError: true});
            }
        }
        catch (err) { //server error 
            this.setState({serverError: true});
        }
        
    }

    getErrorMessages() {
        let output = null;
        if (this.state.regError) {
            output = <p className="red b">A user with that email already exists. Please select a different email</p>
        }
        else if (this.state.serverError) {
            output = <p className="red b">There was an server error. Please try again later</p>
        }
        return output;
    }

    render() {
        return (
            <main className="pa4 black-80 tc shadow-5 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="text" name="name"  id="name"
                            onChange={(e) => this.onInputChange(e, "name")}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="email" name="email-address"  id="email-address"
                            onChange={(e) => this.onInputChange(e, "email")}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="password" name="password"  id="password"
                            onChange={(e) => this.onInputChange(e, "password")}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib bw" type="submit" value="Register"
                        onClick={this.onSubmit}/>
                    </div>
                    {this.getErrorMessages()}
                </div>
            </main>
        )
    }
}

export default Register;