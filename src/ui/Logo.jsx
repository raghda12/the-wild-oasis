import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.4rem 1rem;
  border-radius: var(--border-radius-md);
`;

const Mark = styled.svg`
  width: 3.8rem;
  height: 3.8rem;
  flex-shrink: 0;
`;

const Text = styled.span`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-family: var(--font-serif);
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 1.15;
  color: #f6f1e7;
`;

const Tagline = styled.span`
  font-size: 1.2rem;
  color: #8fa096;
`;

// The logo always sits on a dark background (sidebar, login photo)
function Logo({ to = "/dashboard" }) {
  return (
    <StyledLogo to={to} aria-label="The Wild Oasis, go to dashboard">
      <Mark viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#1f3a2d" />
        <circle cx="16" cy="13" r="5.5" fill="#e0a458" />
        <path
          d="M6 21.5c2.5-1.6 4.5-1.6 7 0s4.5 1.6 7 0 4.5-1.6 7 0M6 26c2.5-1.6 4.5-1.6 7 0s4.5 1.6 7 0 4.5-1.6 7 0"
          fill="none"
          stroke="#f3ede2"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </Mark>
      <Text>
        <Name>The Wild Oasis</Name>
        <Tagline>Hotel manager</Tagline>
      </Text>
    </StyledLogo>
  );
}

export default Logo;
