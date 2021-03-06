import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import { Redirect } from 'react-router-dom';
import Input from './input';
import { login, clearAuthError } from '../actions/auth';
import { required, nonEmpty } from '../validators';
import './login-form.css';
import FacebookLogin from './social/facebook-login-button';
import { LandingHeader } from './landing-header';
import { HeaderBar } from './header-bar';

export class LoginForm extends React.Component {
  componentDidMount() {
    this.props.dispatch(clearAuthError());
  }
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    let error;

    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          There was an error.
        </div>
      );
    }
    return (
      <div className="landing-page">
        <header style={{ minHeight: '750px' }}>
          <HeaderBar />
          <LandingHeader>
            <div className="login-form">
              <div className="single-form-container">
                <div className="card">
                  <div className="card-body">
                    <h2>
                      <i className="fas fa-lock" /> Log in
                    </h2>
                    <form
                      className="login-form"
                      onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                      )}
                    >
                      {error}
                      <div className="form-section">
                        <label htmlFor="username">Username</label>
                        <Field
                          component={Input}
                          type="text"
                          name="username"
                          id="username"
                          validate={[required, nonEmpty]}
                        />
                      </div>
                      <div className="form-section">
                        <label htmlFor="password">Password</label>
                        <Field
                          component={Input}
                          type="password"
                          name="password"
                          id="password"
                          validate={[required, nonEmpty]}
                        />
                      </div>
                      <div className="sub-section centered-text">
                        <button
                          className="button-primary"
                          disabled={
                            this.props.pristine || this.props.submitting
                          }
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                    <div className="sub-section">
                      <FacebookLogin dispatch={this.props.dispatch} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LandingHeader>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  error: state.auth.error
});

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(connect(mapStateToProps)(LoginForm));
