import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  height: 2.6rem;
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
