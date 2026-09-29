import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { useCheckout } from "../check-in-out/useCheckout";

import {
  HiArrowDownOnSquare,
  HiEye,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "./useDeleteBooking";
import { statusLabel, statusToTagName } from "../../utils/constants";

const Cabin = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Thumb = styled.img`
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
  background-color: var(--color-grey-100);
`;

const CabinName = styled.span`
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-grey-800);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  & span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & span:first-child {
    font-weight: 600;
    color: var(--color-grey-800);
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.3rem;
  }
`;

const Amount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-800);
  font-variant-numeric: tabular-nums;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}) {
  const guestName = guests?.fullName ?? "Unknown guest";
  const email = guests?.email ?? "—";
  const cabinName = cabins?.name ?? "Unknown cabin";
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>
        {cabins?.image && <Thumb src={cabins.image} alt="" />}
        <CabinName>{cabinName}</CabinName>
      </Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {startDate
            ? isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)
            : "—"}{" "}
          &rarr; {numNights}-night stay
        </span>
        <span>
          {startDate ? format(new Date(startDate), "MMM dd") : "—"} &mdash;{" "}
          {endDate ? format(new Date(endDate), "MMM dd, yyyy") : "—"}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{statusLabel[status] ?? status}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} label="Booking actions" />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} danger>
                Delete booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
