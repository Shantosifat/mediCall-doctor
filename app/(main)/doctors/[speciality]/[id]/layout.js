import { getDoctorById } from "@/actions/appointments";
import PageHeader from "@/components/PageHeader";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { doctor } = await getDoctorById(id);

  return {
    title: `Dr. ${doctor.name} - MediCall`,
    description: `Book an appointment with Dr. ${doctor.name}, ${doctor.specialty} specialist with ${doctor.experience} years of experience.`,
  };
}
const DoctorProfileLayout = async ({ children, params }) => {
  const { id } = await params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) redirect("/doctors");
  return (
    <div className="container mx-auto ">
      <PageHeader
        title={<span className="text-emerald-500">{"Dr. " + doctor.name}</span>}
        backLink={`/doctors/${doctor.specialty}`}
        backLabel={`Back to ${doctor.specialty}`}
      />

      {children}
    </div>
  );
};

export default DoctorProfileLayout;
