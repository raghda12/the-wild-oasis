import PageHeader from "../ui/PageHeader";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <PageHeader
        title="Bookings"
        subtitle="Every reservation across all cabins"
      >
        <BookingTableOperations />
      </PageHeader>
      <BookingTable />
    </>
  );
}

export default Bookings;
