import PageHeader from "@/components/PageHeader";
import { Stethoscope } from "lucide-react";
import React from "react";

export const metaData = {
  title: "Doctor Dashboard - MediCall",
  description: "Manage your appointments & availability",
};

const DcotorDashboardLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader icon={<Stethoscope/>} title={"Doctor Dashboard"} />
      {children}
    </div>
  );
};

export default DcotorDashboardLayout;
