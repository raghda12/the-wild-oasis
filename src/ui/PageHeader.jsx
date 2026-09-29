import styled from "styled-components";
import Heading from "./Heading";

const StyledPageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2.4rem;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Eyebrow = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-grey-500);
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <StyledPageHeader>
      <Titles>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading as="h1">{title}</Heading>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Titles>
      {children}
    </StyledPageHeader>
  );
}

export default PageHeader;
