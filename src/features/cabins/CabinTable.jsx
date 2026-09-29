import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinCard from "./CabinCard";
import { useCabins } from "./useCabin";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: 2rem;
`;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = cabins;
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => !cabin.discount);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  // Copy before sorting so we don't mutate React Query's cached array
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const diff =
      typeof a[field] === "string"
        ? a[field].localeCompare(b[field], undefined, { numeric: true })
        : a[field] - b[field];
    return diff * modifier;
  });

  if (!sortedCabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Grid>
        {sortedCabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </Grid>
    </Menus>
  );
}
export default CabinTable;
