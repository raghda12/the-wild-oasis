import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { format, formatDistanceToNow } from "date-fns";
import { HiOutlineBell, HiOutlineCalendarDays } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useNewBookings, NOTIFICATION_DAYS } from "./useNewBookings";

const Wrapper = styled.div`
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  top: -0.6rem;
  right: -0.6rem;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 999px;
  border: 2px solid var(--color-grey-0);
  background-color: var(--color-accent);
  color: var(--color-accent-ink);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 0.8rem);
  right: 0;
  width: 38rem;
  z-index: 200;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 14px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;

  @media (max-width: 600px) {
    position: fixed;
    top: 8rem;
    left: 1.6rem;
    right: 1.6rem;
    width: auto;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 1.8rem 1.2rem;
  border-bottom: 1px solid var(--color-grey-200);

  & h2 {
    font-family: var(--font-serif);
    font-size: 1.9rem;
    font-weight: 500;
    color: var(--color-grey-800);
  }

  & span {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-grey-500);
  }
`;

const List = styled.ul`
  max-height: 40rem;
  overflow-y: auto;
  padding: 0.6rem;
`;

const Item = styled.button`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.2rem;
  border: none;
  border-radius: 10px;
  background: none;
  text-align: left;
  line-height: 1.4;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-surface-2);
  }

  ${(props) =>
    props.$unread &&
    css`
      background-color: var(--color-brand-100);

      &:hover {
        background-color: var(--color-brand-100);
      }
    `}
`;

const Icon = styled.span`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-blue-100);
  color: var(--color-blue-700);

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const Body = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  min-width: 0;
  font-size: 1.3rem;
  color: var(--color-grey-500);

  & strong {
    font-size: 1.4rem;
    color: var(--color-grey-800);
  }
`;

const Dot = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  margin-top: 0.6rem;
  border-radius: 50%;
  background-color: var(--color-accent);
  flex-shrink: 0;
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3.2rem 2rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
`;

function Notifications() {
  const navigate = useNavigate();
  const { newBookings, isLoading } = useNewBookings();
  const [seenAt, setSeenAt] = useLocalStorageState(null, "notificationsSeenAt");
  // What was already seen when the panel was opened, so new items stay
  // highlighted while the panel is open
  const [seenAtOpen, setSeenAtOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  const isUnread = (booking, since) =>
    !since || new Date(booking.created_at) > new Date(since);
  const unreadCount = newBookings.filter((b) => isUnread(b, seenAt)).length;

  useEffect(
    function () {
      if (!isOpen) return;
      function handleKeyDown(e) {
        if (e.key === "Escape") setIsOpen(false);
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [isOpen],
  );

  function toggle() {
    if (!isOpen) {
      setSeenAtOpen(seenAt);
      setSeenAt(new Date().toISOString());
    }
    setIsOpen((open) => !open);
  }

  function openBooking(id) {
    setIsOpen(false);
    navigate(`/bookings/${id}`);
  }

  return (
    <Wrapper ref={ref}>
      <ButtonIcon
        onClick={toggle}
        aria-label={
          unreadCount
            ? `Notifications, ${unreadCount} new`
            : "Notifications"
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <HiOutlineBell />
      </ButtonIcon>
      {unreadCount > 0 && (
        <Badge aria-hidden="true">{unreadCount > 9 ? "9+" : unreadCount}</Badge>
      )}

      {isOpen && (
        <Panel>
          <PanelHeader>
            <h2>Notifications</h2>
            <span>Last {NOTIFICATION_DAYS} days</span>
          </PanelHeader>

          {isLoading ? (
            <Message>
              <SpinnerMini /> Loading…
            </Message>
          ) : newBookings.length === 0 ? (
            <Message>No new bookings in the last {NOTIFICATION_DAYS} days</Message>
          ) : (
            <List>
              {newBookings.map((booking) => {
                const unread = isUnread(booking, seenAtOpen);
                return (
                  <li key={booking.id}>
                    <Item
                      $unread={unread}
                      onClick={() => openBooking(booking.id)}
                    >
                      <Icon>
                        <HiOutlineCalendarDays />
                      </Icon>
                      <Body>
                        <strong>
                          New booking from{" "}
                          {booking.guests?.fullName ?? "a guest"}
                        </strong>
                        <span>
                          Cabin {booking.cabins?.name ?? "—"} ·{" "}
                          {booking.numNights}{" "}
                          {booking.numNights === 1 ? "night" : "nights"} ·
                          arrives {format(new Date(booking.startDate), "MMM dd")}
                        </span>
                        <span>
                          {formatDistanceToNow(new Date(booking.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </Body>
                      {unread && <Dot aria-label="New" />}
                    </Item>
                  </li>
                );
              })}
            </List>
          )}
        </Panel>
      )}
    </Wrapper>
  );
}

export default Notifications;
