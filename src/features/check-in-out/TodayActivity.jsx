import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useTodayActivity from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  padding: 2.2rem 2.4rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  grid-column: 1 / span 2;
  min-height: 0;
`;

const Count = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  margin: auto 0;
  text-align: center;
  font-size: 1.6rem;
  color: var(--color-grey-500);
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  const arrivals =
    activities?.filter((a) => a.status === "unconfirmed").length ?? 0;
  const departures = (activities?.length ?? 0) - arrivals;

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
        {!isLoading && activities?.length > 0 && (
          <Count>
            {arrivals} {arrivals === 1 ? "arrival" : "arrivals"} ·{" "}
            {departures} {departures === 1 ? "departure" : "departures"}
          </Count>
        )}
      </Row>
      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No check-ins or check-outs today</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
