import React from 'react';
import 'tachyons';

const Signin = () => {
    return (
        <main className="pa4 black-80 tc shadow-5 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="password" name="password"  id="password"/>
                    </div>
                </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib bw" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <p href="#0" className="f6 link dim black db pointer">Register</p>
                </div>
            </div>
        </main>
    )
}

export default Signin;