import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import { HiMagnifyingGlass, HiOutlineUsers } from "react-icons/hi2";

import { useSearch, MIN_SEARCH_LENGTH } from "./useSearch";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Tag from "../../ui/Tag";
import SpinnerMini from "../../ui/SpinnerMini";
import { statusLabel, statusToTagName } from "../../utils/constants";

const Wrapper = styled.div`
  position: relative;
  flex: 0 1 42rem;
  min-width: 0;

  @media (max-width: 600px) {
    flex-grow: 1;
  }
`;

const Field = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 4.2rem;
  padding: 0 1.2rem 0 1.4rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-grey-200);
  color: var(--color-grey-500);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 4px var(--color-brand-100);
  }

  & > svg {
    width: 1.8rem;
    height: 1.8rem;
    flex-shrink: 0;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 1.4rem;
  color: var(--color-grey-800);

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: var(--color-grey-500);
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const Kbd = styled.kbd`
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.2rem 0.7rem;
  border-radius: 6px;
  border: 1px solid var(--color-grey-200);
  color: var(--color-grey-500);
  white-space: nowrap;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 0.8rem);
  left: 0;
  width: 52rem;
  max-height: 46rem;
  overflow-y: auto;
  z-index: 200;
  padding: 0.8rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 14px;
  box-shadow: var(--shadow-lg);

  /* Full width under the header on phones */
  @media (max-width: 600px) {
    position: fixed;
    top: 8rem;
    left: 1.6rem;
    right: 1.6rem;
    width: auto;
    max-height: calc(100dvh - 10rem);
  }
`;

const Group = styled.p`
  padding: 0.8rem 1.2rem 0.6rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-grey-500);
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-surface-2);
      box-shadow: inset 0 0 0 1px var(--color-grey-200);
    `}
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex-grow: 1;

  & strong {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-grey-800);
  }

  & span {
    font-size: 1.3rem;
    color: var(--color-grey-500);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Thumb = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2.4rem 1.2rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
`;

const Capacity = styled.span`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  & svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const isMac =
  typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

function GlobalSearch() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [term, setTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useOutsideClick(() => setIsOpen(false));

  const { bookings, cabins, isSearching, error } = useSearch(term);

  // Wait until the user stops typing before hitting the database
  useEffect(
    function () {
      const timer = setTimeout(() => setTerm(query), 250);
      return () => clearTimeout(timer);
    },
    [query],
  );

  // Ctrl+K / Cmd+K focuses the search from anywhere
  useEffect(function () {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        setIsOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = [
    ...bookings.map((booking) => ({
      type: "booking",
      key: `booking-${booking.id}`,
      to: `/bookings/${booking.id}`,
      booking,
    })),
    ...cabins.map((cabin) => ({
      type: "cabin",
      key: `cabin-${cabin.id}`,
      to: "/cabins",
      cabin,
    })),
  ];

  const tooShort = query.trim().length < MIN_SEARCH_LENGTH;
  const showPanel = isOpen && !tooShort;
  const safeIndex = Math.min(activeIndex, Math.max(results.length - 1, 0));

  function select(result) {
    if (!result) return;
    navigate(result.to);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!showPanel || !results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      select(results[safeIndex]);
    }
  }

  function renderOption(result, index) {
    const props = {
      id: `search-option-${index}`,
      role: "option",
      "aria-selected": index === safeIndex,
      $active: index === safeIndex,
      onMouseEnter: () => setActiveIndex(index),
      // mousedown keeps focus in the input until we navigate
      onMouseDown: (e) => {
        e.preventDefault();
        select(result);
      },
    };

    if (result.type === "booking") {
      const { booking } = result;
      return (
        <Option key={result.key} {...props}>
          <Text>
            <strong>{booking.guests?.fullName ?? "Unknown guest"}</strong>
            <span>
              Booking #{booking.id} · Cabin {booking.cabins?.name ?? "—"} ·{" "}
              {format(new Date(booking.startDate), "MMM dd")} —{" "}
              {format(new Date(booking.endDate), "MMM dd, yyyy")}
            </span>
          </Text>
          <Tag type={statusToTagName[booking.status]}>
            {statusLabel[booking.status] ?? booking.status}
          </Tag>
        </Option>
      );
    }

    const { cabin } = result;
    return (
      <Option key={result.key} {...props}>
        <Thumb src={cabin.image} alt="" />
        <Text>
          <strong>Cabin {cabin.name}</strong>
          <Capacity>
            <HiOutlineUsers />
            Up to {cabin.maxCapacity} guests
          </Capacity>
        </Text>
      </Option>
    );
  }

  return (
    <Wrapper ref={ref}>
      <Field>
        <HiMagnifyingGlass />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search guests, bookings or cabins"
          aria-label="Search guests, bookings or cabins"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="global-search-results"
          aria-activedescendant={
            showPanel && results.length ? `search-option-${safeIndex}` : undefined
          }
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {isSearching ? <SpinnerMini /> : <Kbd>{isMac ? "⌘ K" : "Ctrl K"}</Kbd>}
      </Field>

      {showPanel && (
        <Panel>
          {error ? (
            <Message>Search is unavailable right now. Try again.</Message>
          ) : results.length === 0 ? (
            <Message>
              {isSearching || term !== query ? (
                <>
                  <SpinnerMini /> Searching…
                </>
              ) : (
                <>No results for “{query.trim()}”</>
              )}
            </Message>
          ) : (
            <ul id="global-search-results" role="listbox">
              {bookings.length > 0 && <Group as="li" role="presentation">BOOKINGS</Group>}
              {results
                .filter((r) => r.type === "booking")
                .map((r, i) => renderOption(r, i))}
              {cabins.length > 0 && <Group as="li" role="presentation">CABINS</Group>}
              {results
                .filter((r) => r.type === "cabin")
                .map((r, i) => renderOption(r, bookings.length + i))}
            </ul>
          )}
        </Panel>
      )}
    </Wrapper>
  );
}

export default GlobalSearch;
