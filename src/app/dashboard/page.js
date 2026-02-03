import { redirect } from "next/navigation";

export default function DashboardIndex() {
  // Redirect to the profile page
  redirect("/dashboard/profile");
}
