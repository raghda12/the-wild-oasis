import styled from "styled-components";
import { useUser } from "../authentication/useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-200);
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.25;
`;

const Name = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-grey-800);
`;

const Email = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;
  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={`Avatar of ${fullName}`} />
      <Details>
        <Name>{fullName}</Name>
        <Email>{user.email}</Email>
      </Details>
    </StyledUserAvatar>
  );
}
export default UserAvatar;
