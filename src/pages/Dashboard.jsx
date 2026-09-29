import { format } from "date-fns";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import PageHeader from "../ui/PageHeader";
import { useUser } from "../features/authentication/useUser";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const { user } = useUser();
  const firstName = user?.user_metadata?.fullName?.split(" ").at(0);

  return (
    <>
      <PageHeader
        eyebrow={format(new Date(), "EEEE, d MMMM yyyy")}
        title={firstName ? `${greeting()}, ${firstName}` : greeting()}
      >
        <DashboardFilter />
      </PageHeader>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
