import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "../../features/check-in-out/CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9.6rem 2.8rem 1fr 7rem 10.4rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 1.1rem 0;
  border-top: 1px solid var(--color-grey-200);
`;

const Guest = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-grey-800);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Nights = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

export default function TodayItem({ activity }) {
  const { id, status, numNights, guests } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.nationality}`} />
      <Guest>{guests.fullName}</Guest>
      <Nights>
        {numNights} {numNights === 1 ? "night" : "nights"}
      </Nights>
      {status === "unconfirmed" && (
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
