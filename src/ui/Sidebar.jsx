import styled from "styled-components";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";
import SpinnerMini from "./SpinnerMini";
import { useLogout } from "../features/authentication/useLogout";
import TodaySummary from "../features/check-in-out/TodaySummary";
// import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-sidebar);
  padding: 2.6rem 1.6rem 2rem;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  overflow-y: auto;
`;

const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const LogoutRow = styled.div`
  padding-top: 1.4rem;
  border-top: 1px solid var(--color-sidebar-line);
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.1rem 1.2rem;
  border: none;
  border-radius: 10px;
  background: none;
  color: var(--color-sidebar-text);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.04);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-sidebar-muted);
  }
`;

export default function Sidebar() {
  const { logout, isLoading } = useLogout();

  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
      <Bottom>
        <TodaySummary />
        <LogoutRow>
          <LogoutButton onClick={logout} disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
            <span>Log out</span>
          </LogoutButton>
        </LogoutRow>
      </Bottom>
    </StyledSidebar>
  );
}
