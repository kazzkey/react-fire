import React from 'react';
import { withRouter } from "react-router";
import firebase from '../firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  async handleSignUp(e) {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  }
  async handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  }
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" value={email} type="text" onChange={ (e) => this.setState({ email: e.target.value }) } />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input id="password" value={password} type="password" onChange={ (e) => this.setState({ password: e.target.value }) } />
        </div>
        <button onClick={this.handleSignUp}>Sign up</button>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
};
export default withRouter(Login);