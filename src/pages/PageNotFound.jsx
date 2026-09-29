import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);

  padding: 4.8rem;
  flex: 0 1 72rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.6rem;
  }
`;

const Code = styled.span`
  font-family: var(--font-serif);
  font-size: 7.2rem;
  line-height: 1;
  color: var(--color-yellow-700);
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Code>404</Code>
        <Heading as="h1">This page could not be found</Heading>
        <p>The link may be broken, or the page may have been moved.</p>
        <Button size="large" onClick={moveBack}>
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
