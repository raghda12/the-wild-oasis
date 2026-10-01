import styled from "styled-components";
import { useRecentBookings } from "../../features/dashboard/useRecentBookings";
import Spinner from "../../ui/Spinner";
import {useRecentStays} from  "../dashboard/useRecentStays"
import Stats from "./Stats";
import {useCabins} from "../cabins/useCabin"
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.6rem;
  }
`;
function DashboardLayout() {
const { bookings, isLoading: isLoading1 } = useRecentBookings();  
const {stays , confirmedStays , isLoading:isLoading2 , numDays} = useRecentStays();
  const {cabins , isLoading:isLoading3} = useCabins()
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/> 
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
