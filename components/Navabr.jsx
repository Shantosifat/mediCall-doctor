// components/Navbar.jsx
import { checkUser } from "@/lib/checkUser";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const user = await checkUser();

  // Pass user data down to client-side Navbar
  return <NavbarClient user={user} />;
}
