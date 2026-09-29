import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getNewBookings } from "../../services/apiBookings";

export const NOTIFICATION_DAYS = 7;

// Bookings created in the last week, refreshed every minute
export function useNewBookings() {
  const { data: newBookings, isLoading } = useQuery({
    queryKey: ["bookings", "new"],
    queryFn: () =>
      getNewBookings(subDays(new Date(), NOTIFICATION_DAYS).toISOString()),
    refetchInterval: 60 * 1000,
  });

  return { newBookings: newBookings ?? [], isLoading };
}
