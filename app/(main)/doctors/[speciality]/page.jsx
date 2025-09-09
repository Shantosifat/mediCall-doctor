// when its a client component
"use client";

import { useParams } from "next/navigation";
import React from "react";

const SpecilaityPage = () => {
  const { speciality } = useParams();
  return <div>SpecilaityPage : {speciality}</div>;
};

export default SpecilaityPage;



// when its a server component

// import React from 'react';

// const SpecialityPage = async({params}) => {
//     const {speciality} = await params
//     return (
//         <div>
//             SpecilaityPage : {speciality}
//         </div>
//     );
// };

// export default SpecialityPage;

