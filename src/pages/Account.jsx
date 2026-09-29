import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PageHeader from "../ui/PageHeader";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <PageHeader title="Account" subtitle="Your profile and password" />

      <Row>
        <Heading as="h3">Profile</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
