import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.9rem 0;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-grey-600);
`;

const Error = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
