import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Notifications from "../features/notifications/Notifications";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Notifications />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")} aria-label="Account">
          <HiOutlineUser />
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}
export default HeaderMenu;
