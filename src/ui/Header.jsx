import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
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
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Divider = styled.span`
  width: 1px;
  height: 2.8rem;
  margin: 0 0.6rem;
  background-color: var(--color-grey-200);
`;

export default function Header() {
  return (
    <StyledHeader>
      <GlobalSearch />
      <Spacer />
      <HeaderMenu />
      <Divider />
      <UserAvatar />
    </StyledHeader>
  );
}
