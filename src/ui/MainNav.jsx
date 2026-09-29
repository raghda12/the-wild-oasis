import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import useTodayActivity from "../features/check-in-out/useTodayActivity";

const NavLabel = styled.span`
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-sidebar-muted);
  padding: 0 1.2rem 0.8rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Count = styled.span`
  margin-left: auto;
  min-width: 2.2rem;
  height: 2.2rem;
  padding: 0 0.7rem;
  border-radius: 999px;
  background-color: var(--color-accent);
  color: var(--color-accent-ink);
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-sidebar-text);
    font-size: 1.5rem;
    font-weight: 600;
    padding: 1.1rem 1.2rem;
    border-radius: 10px;
    transition: all 0.2s;
  }

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.04);
  }

  /* This works because react-router places the active class on the active NavLink */
  &.active:link,
  &.active:visited {
    color: #ffffff;
    background-color: var(--color-sidebar-active);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-sidebar-muted);
    transition: all 0.2s;
  }

  &:hover svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-accent);
  }
`;

function MainNav() {
  // Guests who still need to be checked in or out today
  const { activities } = useTodayActivity();
  const pendingToday = activities?.length ?? 0;

  return (
    <nav aria-label="Main">
      <NavLabel>MENU</NavLabel>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
            {pendingToday > 0 && (
              <Count aria-label={`${pendingToday} to check in or out today`}>
                {pendingToday}
              </Count>
            )}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
export default MainNav;
