import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & input {
    height: 5rem;
  }

  & button[type="submit"] {
    width: 100%;
    margin-top: 1rem;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("raghda@gmail.com");
  const [password, setPassword] = useState("115raghda");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
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
    </StyledForm>
  );
}

export default LoginForm;
