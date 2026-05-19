// This page.tsx exists for route-group organization.
// The actual homepage is served by app/page.tsx at root level.
import { redirect } from "next/navigation";

export default function PublicHomePlaceholder() {
  redirect("/");
}
