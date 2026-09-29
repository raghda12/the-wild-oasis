import styled, { css } from "styled-components";

// type is only used for styling, so keep it off the <form> element
const Form = styled.form.withConfig({
  shouldForwardProp: (prop) => prop !== "type",
})`
  ${(props) =>
    (props.type ?? "regular") === "regular" &&
    css`
      padding: 2.8rem 3.2rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-200);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
