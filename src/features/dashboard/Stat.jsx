import styled from "styled-components";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  padding: 2rem 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Icon = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.$color}-100);
  color: var(--color-${(props) => props.$color}-700);

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Value = styled.p`
  font-family: var(--font-serif);
  font-size: 3.6rem;
  font-weight: 500;
  line-height: 1;
  color: var(--color-grey-800);
  font-variant-numeric: tabular-nums;
`;

const Caption = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

function Stat({ icon, title, value, color, caption }) {
  return (
    <StyledStat>
      <Top>
        <Title>{title}</Title>
        <Icon $color={color}>{icon}</Icon>
      </Top>
      <Value>{value}</Value>
      {caption && <Caption>{caption}</Caption>}
    </StyledStat>
  );
}

export default Stat;
