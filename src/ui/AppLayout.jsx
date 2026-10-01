import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 24.8rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  height: 100dvh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 3.4rem 4rem 6.4rem;
  overflow-y: auto;
  min-width: 0;

  @media (max-width: 900px) {
    padding: 2.4rem 2.4rem 4.8rem;
  }

  @media (max-width: 600px) {
    padding: 2rem 1.6rem 4rem;
  }
`;

const Container = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

// Dims the page behind the sidebar drawer on small screens
const Backdrop = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 290;
    background-color: var(--backdrop-color);
  }
`;

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the drawer after navigating
  useEffect(() => setIsSidebarOpen(false), [pathname]);

  useEffect(
    function () {
      if (!isSidebarOpen) return;
      function handleKeyDown(e) {
        if (e.key === "Escape") setIsSidebarOpen(false);
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [isSidebarOpen],
  );

  return (
    <StyledAppLayout>
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && <Backdrop onClick={() => setIsSidebarOpen(false)} />}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}
