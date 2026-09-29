import Select from "../ui/Select";
import { useSearchParams } from "react-router-dom";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || options.at(0).value;
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      aria-label="Sort by"
    />
  );
}
export default SortBy;
