import styled from "styled-components";

const ButtonIcon = styled.button`
  width: 4.2rem;
  height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-600);
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--color-surface-2);
    color: var(--color-brand-600);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default ButtonIcon;
