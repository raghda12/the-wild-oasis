import styled from 'styled-components';

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 700;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.6rem 0.8rem;

  &:hover,
  &:active {
    color: var(--color-brand-700);
    background-color: var(--color-brand-100);
  }
`;

export default ButtonText;
