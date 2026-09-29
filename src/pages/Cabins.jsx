import PageHeader from "../ui/PageHeader";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";
import TableOperations from "../ui/TableOperations";

function Cabins() {
  return (
    <>
      <PageHeader title="Cabins" subtitle="Rates, capacity and discounts">
        <TableOperations>
          <CabinTableOperation />
          <AddCabin />
        </TableOperations>
      </PageHeader>
      <CabinTable />
    </>
  );
}

export default Cabins;
