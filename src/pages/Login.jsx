import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import DarkModeToggle from "../ui/DarkModeToggle";
import cabinPhoto from "../data/cabins/cabin-008.jpg";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--color-grey-50);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Visual = styled.section`
  position: relative;
  overflow: hidden;

  & > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Caption = styled.div`
  position: absolute;
  left: 4rem;
  right: 4rem;
  bottom: 4rem;
  padding: 2.8rem 3rem;
  border-radius: var(--border-radius-xl);
  background-color: rgba(12, 22, 17, 0.78);
  color: #f6f1e7;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  & p {
    font-family: var(--font-serif);
    font-size: 3rem;
    line-height: 1.25;
  }

  & span {
    font-size: 1.4rem;
    color: #c9d3cc;
  }
`;

const Panel = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;

  @media (max-width: 600px) {
    padding: 8rem 2rem 4rem;
  }
`;

const Toggle = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 4rem;

  @media (max-width: 600px) {
    top: 2rem;
    right: 2rem;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 42rem;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Eyebrow = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-yellow-700);
`;

const Lead = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-500);
`;

const Note = styled.p`
  padding-top: 2.2rem;
  border-top: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

function Login() {
  return (
    <LoginLayout>
      <Visual>
        <img src={cabinPhoto} alt="A cabin at The Wild Oasis" />
        <Caption>
          <Logo to="/login" />
          <p>Eight cabins, one calm place to run every stay.</p>
          <span>Bookings, check-ins, cabins and guests — all in one dashboard.</span>
        </Caption>
      </Visual>

      <Panel>
        <Toggle>
          <DarkModeToggle />
        </Toggle>
        <Content>
          <Intro>
            <Eyebrow>STAFF PORTAL</Eyebrow>
            <Heading as="h1">Welcome back</Heading>
            <Lead>Log in to manage bookings, cabins and guests.</Lead>
          </Intro>
          <LoginForm />
          <Note>
            Staff accounts are created by an administrator. Need access? Ask
            your manager.
          </Note>
        </Content>
      </Panel>
    </LoginLayout>
  );
}

export default Login;
