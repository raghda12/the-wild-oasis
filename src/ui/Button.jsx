import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.3rem;
    height: 3.6rem;
    padding: 0 1.4rem;
    border-radius: 10px;
  `,
  medium: css`
    font-size: 1.4rem;
    height: 4.4rem;
    padding: 0 1.8rem;
  `,
  large: css`
    font-size: 1.6rem;
    height: 5.2rem;
    padding: 0 2.4rem;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    border-color: var(--color-brand-600);

    &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
      border-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-800);
    background: var(--color-grey-0);
    border-color: var(--color-grey-200);

    &:hover:not(:disabled) {
      background-color: var(--color-surface-2);
      border-color: var(--color-grey-300);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);
    border-color: var(--color-red-700);

    &:hover:not(:disabled) {
      background-color: var(--color-red-800);
      border-color: var(--color-red-800);
    }
  `,
};

// size/variation only style the button, so keep them off the DOM element
const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["size", "variation"].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  font-weight: 700;
  white-space: nowrap;
  transition: background-color 0.2s, border-color 0.2s;

  &:disabled {
    opacity: 0.55;
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  ${(props) => sizes[props.size ?? "medium"]}
  ${(props) => variations[props.variation ?? "primary"]}
`;

export default Button;
