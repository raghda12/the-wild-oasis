import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  font-size: 1.5rem;
  width: 100%;
  height: 10rem;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
`;

export default Textarea;
