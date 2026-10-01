import styled from "styled-components";

const StyledSelect = styled.select`
  height: 4.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0 4rem 0 1.6rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  max-width: 100%;
  appearance: none;
  cursor: pointer;
  /* Chevron drawn with the current text colour */
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - 2rem) 50%, calc(100% - 1.5rem) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
`;

function Select({ options, value, ...props }) {
  return (
    <StyledSelect value={value} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
export default Select;
