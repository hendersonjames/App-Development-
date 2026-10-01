"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createTrip(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const ownerId = claimsData?.claims?.sub;
  if (!ownerId) redirect("/login");

  const title = String(formData.get("title") ?? "").trim();
  const primaryDestination = String(formData.get("primary_destination") ?? "").trim();
  const startDate = String(formData.get("start_date") ?? "") || null;
  const endDate = String(formData.get("end_date") ?? "") || null;

  if (!title) redirect("/trips?error=title");

  const { error } = await supabase.from("trips").insert({
    owner_id: ownerId,
    title,
    primary_destination: primaryDestination || null,
    start_date: startDate,
    end_date: endDate,
    status: "planning",
  });

  if (error) redirect("/trips?error=create");
  revalidatePath("/trips");
  redirect("/trips?created=1");
}
