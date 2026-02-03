import { redirect } from "next/navigation";

export default function SpacePage() {
  // Redirect to the create event page by default
  redirect("/dashboard/space/create");
}
