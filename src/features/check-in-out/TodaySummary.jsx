import styled from "styled-components";
import { Link } from "react-router-dom";
import useTodayActivity from "./useTodayActivity";

const StyledTodaySummary = styled.div`
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-sidebar-muted);
`;

const Summary = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  color: #f6f1e7;
`;

const Placeholder = styled.span`
  display: block;
  height: 1.6rem;
  width: 80%;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.08);
`;

const StyledLink = styled(Link)`
  margin-top: 0.4rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-accent);

  &:hover {
    text-decoration: underline;
  }
`;

const plural = (n, word) => `${n} ${n === 1 ? word : `${word}s`}`;

function TodaySummary() {
  const { activities, isLoading } = useTodayActivity();
  const arrivals =
    activities?.filter((a) => a.status === "unconfirmed").length ?? 0;
  const departures =
    activities?.filter((a) => a.status === "checked-in").length ?? 0;

  return (
    <StyledTodaySummary>
      <Label>TODAY</Label>
      {isLoading ? (
        <Placeholder aria-label="Loading today's activity" />
      ) : arrivals + departures === 0 ? (
        <Summary>No arrivals or departures</Summary>
      ) : (
        <Summary>
          {plural(arrivals, "arrival")} · {plural(departures, "departure")}
        </Summary>
      )}
      <StyledLink to="/dashboard">Open activity →</StyledLink>
    </StyledTodaySummary>
  );
}

export default TodaySummary;
