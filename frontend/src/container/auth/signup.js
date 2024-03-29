import { useState } from 'react';
import Input from 'components/input';
import Button from 'components/button';
import Form, { FormGroup } from 'components/form';
import { useAuthContext } from 'context/AuthContext';
import { GiBowTieRibbon } from 'react-icons/gi';

import { Wrapper, FormTitle, LinkStyle, Text } from './styles';

export default function Login({ router }) {
  const { fn, state: ctx } = useAuthContext();
  const [state, setState] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const initError = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [error, setError] = useState(initError);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleError = () => {
    const { fullName, email, password, confirmPassword } = state;

    const e = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      state: false,
    };

    setError(initError);

    if (!fullName) {
      e['fullName'] = 'FullName Emptyy';
      e['state'] = true;
    }

    if (!email) {
      e['email'] = 'Email empty';
      e['state'] = true;
    }

    if (!password.length) {
      e['password'] = 'Password empty';
      e['state'] = true;
    }

    if (!confirmPassword) {
      e['confirmPassword'] = 'Confirm passowrd empty';
      e['state'] = true;
    }

    if (password !== confirmPassword) {
      e['confirmPassword'] = 'Passowrd not match';
      e['state'] = true;
    }

    if (e.state) {
      setError(e);

      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allSet = handleError();

    if (allSet) fn.signup(state);
  };

  return (
    <Wrapper>
      {ctx.user?.data?._id ? (
        <Form>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            You are already logged in {ctx.user.data.fullName}
          </h3>

          <Button block href="/">
            Back to shopping
          </Button>
        </Form>
      ) : (
        <Form submit={handleSubmit}>
          {ctx.error && (
            <div
              style={{
                marginBottom: '2rem',
                color: 'red',
              }}
            >
              {`*${ctx.error}`}
            </div>
          )}

          <GiBowTieRibbon className="ribbon-icon" />

          <FormTitle>Sign up</FormTitle>

          <Text>
            <span className="text">Already have an account?</span>
            <LinkStyle href="/login">Sign in here</LinkStyle>
          </Text>

          <FormGroup>
            <Input
              action={handleChange}
              border
              label="Full name"
              placeholder="Jhon wick"
              name="fullName"
              value={state.fullName}
              error={error.fullName}
            />
          </FormGroup>

          <FormGroup>
            <Input
              action={handleChange}
              border
              label="Email"
              placeholder="example@mail.com"
              name="email"
              error={error.email}
              value={state.email}
            />
          </FormGroup>

          <FormGroup>
            <Input
              action={handleChange}
              border
              label="Password"
              placeholder="Your password"
              name="password"
              type="password"
              value={state.password}
              error={error.password}
            />
          </FormGroup>

          <FormGroup>
            <Input
              action={handleChange}
              border
              label="Confirm password"
              placeholder="Retype your password"
              name="confirmPassword"
              type="password"
              value={state.confirmPassword}
              error={error.confirmPassword}
            />
          </FormGroup>

          <Button className="form-submit-btn" loading={ctx.formLoading} block>
            Register
          </Button>
        </Form>
      )}
    </Wrapper>
  );
}
