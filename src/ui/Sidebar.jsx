import styled, { css } from "styled-components";
import { HiArrowRightOnRectangle, HiXMark } from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";
import SpinnerMini from "./SpinnerMini";
import { useLogout } from "../features/authentication/useLogout";
import TodaySummary from "../features/check-in-out/TodaySummary";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-sidebar);
  padding: 2.6rem 1.6rem 2rem;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  overflow-y: auto;

  /* On small screens the sidebar becomes a drawer opened from the header */
  @media (max-width: 900px) {
    position: fixed;
    inset: 0 auto 0 0;
    width: 28rem;
    max-width: 85vw;
    z-index: 300;
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.3s, visibility 0.3s;

    ${(props) =>
      props.$isOpen &&
      css`
        transform: translateX(0);
        visibility: visible;
      `}
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const CloseButton = styled.button`
  display: none;
  width: 3.6rem;
  height: 3.6rem;
  border: none;
  border-radius: 10px;
  background: none;
  color: var(--color-sidebar-text);
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
  }

  @media (max-width: 900px) {
    display: flex;
  }
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

export default function Sidebar({ isOpen = false, onClose }) {
  const { logout, isLoading } = useLogout();

  return (
    <StyledSidebar $isOpen={isOpen} id="app-sidebar">
      <Top>
        <Logo />
        <CloseButton onClick={onClose} aria-label="Close menu">
          <HiXMark />
        </CloseButton>
      </Top>
      <MainNav />
      <Bottom>
        {/* Sample-data tools: only while running locally with npm run dev */}
        {import.meta.env.DEV && <Uploader />}
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
