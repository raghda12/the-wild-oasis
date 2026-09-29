import PageHeader from "../ui/PageHeader";
import SignupForm from "../features/authentication/SignupForm";

function NewUsers() {
  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Create an account for a new staff member"
      />
      <SignupForm />
    </>
  );
}
export default NewUsers;
