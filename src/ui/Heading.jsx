import styled, { css } from "styled-components";

const Heading = styled.h1`
  font-family: var(--font-serif);
  font-weight: 500;
  color: var(--color-grey-800);
  line-height: 1.15;
  letter-spacing: -0.01em;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 4rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.3rem;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      text-align: center;
    `}
`;

export default Heading;
