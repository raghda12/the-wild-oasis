import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow-x: auto;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2rem;
  align-items: center;
  transition: none;
  min-width: 88rem;
`;

const StyledHeader = styled(CommonRow)`
  height: 4.8rem;
  padding: 0 2rem 0 2.4rem;

  background-color: var(--color-surface-2);
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-grey-500);
`;

const StyledRow = styled(CommonRow)`
  min-height: 7.4rem;
  padding: 1.2rem 2rem 1.2rem 2.4rem;
  transition: background-color 0.2s;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }

  &:hover {
    background-color: var(--color-surface-2);
  }
`;

const StyledBody = styled.section``;

const Footer = styled.footer`
  background-color: var(--color-surface-2);
  border-top: 1px solid var(--color-grey-200);
  display: flex;
  justify-content: center;
  padding: 1.4rem 2rem 1.4rem 2.4rem;
  position: sticky;
  left: 0;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  color: var(--color-grey-500);
  margin: 4rem 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
