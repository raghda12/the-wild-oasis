import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import HeaderMenu from "./HeaderMenu";
import ButtonIcon from "./ButtonIcon";
import UserAvatar from "../features/authentication/UserAvatar";
import GlobalSearch from "../features/search/GlobalSearch";

const StyledHeader = styled.header`
  height: 7.2rem;
  background-color: var(--color-grey-0);
  padding: 0 4rem;
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  gap: 1.4rem;
  align-items: center;

  @media (max-width: 900px) {
    padding: 0 2.4rem;
  }

  @media (max-width: 600px) {
    padding: 0 1.6rem;
    gap: 0.8rem;
  }
`;

const MenuButton = styled(ButtonIcon)`
  display: none;
  flex-shrink: 0;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 2.8rem;
  margin: 0 0.6rem;
  background-color: var(--color-grey-200);

  @media (max-width: 600px) {
    display: none;
  }
`;

export default function Header({ onOpenSidebar }) {
  return (
    <StyledHeader>
      <MenuButton
        onClick={onOpenSidebar}
        aria-label="Open menu"
        aria-controls="app-sidebar"
      >
        <HiBars3 />
      </MenuButton>
      <GlobalSearch />
      <Spacer />
      <HeaderMenu />
      <Divider />
      <UserAvatar />
    </StyledHeader>
  );
}
