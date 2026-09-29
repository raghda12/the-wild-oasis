import styled from "styled-components";

const StyledEmpty = styled.p`
  padding: 4.8rem 2.4rem;
  text-align: center;
  font-size: 1.6rem;
  color: var(--color-grey-500);
  background-color: var(--color-grey-0);
  border: 1px dashed var(--color-grey-300);
  border-radius: var(--border-radius-lg);
`;

function Empty({ resourceName }) {
  return <StyledEmpty>No {resourceName} could be found.</StyledEmpty>;
}

export default Empty;
