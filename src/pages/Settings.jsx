import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import PageHeader from "../ui/PageHeader";

function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Booking rules and prices that apply to the whole hotel"
      />
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
