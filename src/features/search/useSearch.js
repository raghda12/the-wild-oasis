import { useQuery } from "@tanstack/react-query";
import { searchBookings } from "../../services/apiBookings";
import { searchCabins } from "../../services/apiCabins";

export const MIN_SEARCH_LENGTH = 2;

export function useSearch(term) {
  const q = term.trim();
  const enabled = q.length >= MIN_SEARCH_LENGTH;

  const { data, isFetching, error } = useQuery({
    queryKey: ["search", q.toLowerCase()],
    queryFn: async () => {
      const [bookings, cabins] = await Promise.all([
        searchBookings(q),
        searchCabins(q),
      ]);
      return { bookings, cabins };
    },
    enabled,
    staleTime: 30 * 1000,
    keepPreviousData: true,
  });

  return {
    bookings: enabled ? data?.bookings ?? [] : [],
    cabins: enabled ? data?.cabins ?? [] : [],
    isSearching: enabled && isFetching,
    error,
  };
}
