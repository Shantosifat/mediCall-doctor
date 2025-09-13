import { getPendingDoctors, getVerifiedDoctors } from "@/actions/admin";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import PendingDoctors from "./_components/PendingDoctors";
import VerifiedDoctors from "./_components/VerifiedDoctors";

const AdminPage =async () => {
  const [pendingDoctorsData, verifiedDoctorsData] =await Promise.all([
    getPendingDoctors(),
    getVerifiedDoctors(),
  ]);
  return (
    <div>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors doctors={pendingDoctorsData.doctors || []} />
      </TabsContent>
      <TabsContent value="doctors" className="border-none p-0">
        <VerifiedDoctors dcotors={verifiedDoctorsData.doctors || []} />
      </TabsContent>
    </div>
  );
};

export default AdminPage;
