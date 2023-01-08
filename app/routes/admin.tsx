import VNavBar from "@components/VNavBar";
import RootLayout from "@layout/RootLayout";
import { Outlet } from "@remix-run/react";

const AdminPage = () => {
  return (
    <RootLayout sidebar={<VNavBar />}>
      <Outlet />
    </RootLayout>
  );
};

export default AdminPage;
