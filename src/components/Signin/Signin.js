import React from 'react';
import './Signin.css';
import arrowImg from './arrow.png';


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }
  onSubmitSignIn = () => {
    fetch(`https://frozen-eyrie-32291.herokuapp.com/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      })
    }).then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
    })
  }

  render () {
    const { onRouteChange } = this.props;
    return ( 
      <div className='main-div-sign-in-card'>
        <form className="b--black-10 mv4 w-100 w-50-m w-25-l mw5 center sign-in-card main-div-sign-in-card">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="sign-title f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="email-title db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                    autoComplete='on' 
                    className="signin-input pa2 input-reset w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                  <label className="pw-title db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                    autoComplete='on' 
                    className="signin-input b pa2 input-reset w-100" 
                    type="password" 
                    name="password" 
                    id="password"
                    onChange={this.onPasswordChange}
                    />
                </div>
              </fieldset>
              <div className="">
                <input 
                  //onClick calls this function 
                  onClick={this.onSubmitSignIn}
                  id="sign-in-btn" 
                  className="b ph3 pv2 input-reset ba b--black grow pointer f6 dib" 
                  type="submit" 
                  value="Sign in"
                />
                </div>
              <div className="lh-copy mt3 register-div">
                <img 
                  src={arrowImg} 
                  alt="arrow pointing to register"
                  className='arrow-register'/>
                <p
                  onClick={() => onRouteChange('register')}
                  className="b f6 link dim db register-link pointer">
                  Register
                </p>
              </div>
            </div>
          </main>
        </form>
      </div>
    );
  }
}

export default Signin;