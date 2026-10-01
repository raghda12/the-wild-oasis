import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
`;

const FilterButton = styled.button`
  height: 3.6rem;
  padding: 0 1.4rem;
  background-color: transparent;
  color: var(--color-grey-600);
  border: none;
  border-radius: 9px;
  font-weight: 600;
  font-size: 1.3rem;
  white-space: nowrap;
  transition: all 0.2s;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
      font-weight: 700;
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
  }

  &:disabled {
    cursor: default;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter role="group">
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          aria-pressed={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
