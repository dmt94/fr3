import React from 'react';
import './Register.css';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      invalidCredentials: false,
      registerMsg: ''
    }
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  checkExistingUsers = (email) => {

  }

  onSubmitSignIn = () => {
    if (this.state.name === '' || this.state.name.match(/[$@#&!]+/) || this.state.name.match(/[0-9]+/)) {
      this.setState({invalidCredentials: true})
      this.setState({registerMsg: 'Please enter a valid name.'})
    } else if (!this.state.email.includes('@')) {
      this.setState({invalidCredentials: true})
      this.setState({registerMsg: 'Please enter a valid email.'})
    } else if (!this.state.password.match(/[$@#&!]+/) || !this.state.password.match(/[0-9]+/) || this.state.password.length < 6) {
        this.setState({invalidCredentials: true})
        this.setState({registerMsg: 'Your password must be at least 6 characters and include at least 1 special character AND number'})
      } else {
        fetch('https://frozen-eyrie-32291.herokuapp.com/register', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
          })
        })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user)
            this.props.onRouteChange('home');
          }
        })
      }
  }

  render () {
    return (
      <article className='main-div-sign-in-card'>
         <main className="b--black-10 mv4 w-100 w-50-m w-25-l mw5 center sign-in-card main-div-sign-in-card">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input 
                    className="register-input signin-input pa2 input-reset w-100" 
                    type="text" 
                    name="name"  
                    id="name" 
                    onChange={this.onNameChange}
                    />
                </div>
    
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                    autoComplete='on' 
                    className="register-input signin-input pa2 input-reset w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                    autoComplete='on' 
                    className="register-input signin-input b pa2 input-reset w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    onChange={this.onPasswordChange}
                    />
                </div>
              </fieldset>
              {
                this.state.invalidCredentials === true ? 
                <div className='ivalid-div'>
                <p className='invalid-register'>{this.state.registerMsg}</p>
              </div> : 
              <div className='valid-div'>
                <p className='register-msg'>Welcome! Note: Password must be at least 6 characters long and contain at least 1 number and 1 special character</p>
              </div> 
              }
              <div className="">
                <input 
                  //onClick calls this function 
                  onClick={this.onSubmitSignIn}
                  id="sign-in-btn" 
                  className="b ph3 pv2 input-reset ba b--black grow pointer f6 dib" 
                  type="submit" 
                  value="Register"
                />
                </div>
            </div>
          </main>
      </main>
      </article>
    );
  }
}

export default Register;