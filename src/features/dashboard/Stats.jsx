import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings.length;
  //2.
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  //3.
  const numCheckIns = confirmedStays.length;
  //4.
  const occupation =
    confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
    (numDays * cabinCount);
  const period = `In the last ${numDays} days`;

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
        caption={period}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
        caption={period}
      />
      <Stat
        title="Check-ins"
        value={numCheckIns}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        caption="Confirmed stays that started"
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
        caption="Booked nights out of available nights"
      />
    </>
  );
}
export default Stats;
