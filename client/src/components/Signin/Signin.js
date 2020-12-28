import React from 'react';
import 'tachyons';

class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            timesSubmitted: 0
        }
    }

    updateEmail = (newEmail) => {
        this.setState({email: newEmail});
    }

    updatePassword = (newPassword) => {
        this.setState({password: newPassword});
    }

    incrementSubmissions = () => {
        this.setState(prevState => ({timesSubmitted: prevState.timesSubmitted + 1}));
    }

    submitLogin = async () => {
        let response = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
            mode:"cors"
        });        
        let user = await response.json();
        if (user.id !== undefined) {
            this.props.loadUser(user);
            this.props.onRouteChange('home')
        }
        else {
            this.incrementSubmissions();
        }
    }

    render() { 
        return (
            <main className="pa4 black-80 tc shadow-5 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="email" name="email-address"  id="email-address"
                            onChange={e => this.updateEmail(e.target.value)}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="password" name="password"  id="password"
                            onChange={e => this.updatePassword(e.target.value)}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib bw" type="submit" value="Sign in" 
                        onClick={this.submitLogin}/>
                    </div>
                    <div className="lh-copy mt3">
                        <p href="#0" className="f6 link dim black db pointer pb2 ma0" onClick={() => this.props.onRouteChange('register')}>Register</p>
                        <p className="f5 b red db ma0 pa0" style={{visibility: (this.state.timesSubmitted > 0 ? "visible" : "hidden")}}>Incorrect Username or Password</p>
                    </div>
                </div>
            </main>
        )
    }
}

export default Signin;