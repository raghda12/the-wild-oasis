import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid transparent;
  border-radius: 10px;
  color: var(--color-grey-600);
  transition: all 0.2s;

  &:hover,
  &[aria-expanded="true"] {
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-200);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const StyledList = styled.ul`
  position: fixed;
  z-index: 100;
  min-width: 21rem;
  padding: 0.6rem;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 1.1rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: var(--color-surface-2);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-500);
    transition: all 0.3s;
  }

  ${(props) =>
    props.$danger &&
    css`
      color: var(--color-red-700);

      & svg {
        color: currentColor;
      }

      &:hover {
        background-color: var(--color-red-100);
        color: var(--color-red-800);
      }
    `}
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, label = "Open actions" }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle
      onClick={handleClick}
      aria-label={label}
      aria-expanded={openId === id}
    >
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, danger = false, disabled }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} $danger={danger} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
