import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

// A public demo account for portfolio visitors, set in .env (see .env.example)
const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL;
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD;
const hasDemo = Boolean(DEMO_EMAIL && DEMO_PASSWORD);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & input {
    height: 5rem;
  }

  & button {
    width: 100%;
  }

  & button[type="submit"] {
    margin-top: 1rem;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function submit(credentials) {
    login(credentials, {
      onSettled: () => {
        setEmail("");
        setPassword("");
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    submit({ email, password });
  }

  function handleDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    submit({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <Button type="submit" size="large" disabled={isLoading}>
        {!isLoading ? "Log in" : <SpinnerMini />}
      </Button>
      {hasDemo && (
        <Button
          type="button"
          variation="secondary"
          size="large"
          onClick={handleDemo}
          disabled={isLoading}
        >
          Use demo account
        </Button>
      )}
    </StyledForm>
  );
}

export default LoginForm;
