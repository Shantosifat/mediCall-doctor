// when its a client component
// "use client";

// import { useParams } from "next/navigation";
// import React from "react";

// const SpecilaityPage = () => {
//   const { speciality } = useParams();
//   return <div>SpecilaityPage : {speciality}</div>;
// };

// export default SpecilaityPage;

// when its a server component

import { redirect } from "next/navigation";
import { getDoctorsBySpecialty } from "@/actions/doctors-listing";
import PageHeader from "@/components/PageHeader";
import { DoctorCard } from "@/components/DoctorCard";

export default async function SpecialtyPage({ params }) {
  const { speciality } = await params;

  // Redirect to main doctors page if no specialty is provided
  if (!speciality) {
    redirect("/doctors");
  }

  // Fetch doctors by specialty
  const { doctors, error } = await getDoctorsBySpecialty(speciality);

  if (error) {
    console.error("Error fetching doctors:", error);
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={
          <span className="text-emerald-500">
            {speciality.split("%20").join(" ")}
          </span>
        }
        backLink="/doctors"
        backLabel="All Specialties"
      />

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white mb-2">
            No doctors available
          </h3>
          <p className="text-muted-foreground">
            There are currently no verified doctors in this specialty. Please
            check back later or choose another specialty.
          </p>
        </div>
      )}
    </div>
  );
}
