import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createTrip } from "./actions";

export default async function Trips({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; error?: string }>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/login");

  const params = await searchParams;
  const { data: trips } = await supabase
    .from("trips")
    .select("id,title,status,start_date,end_date,primary_destination")
    .order("created_at", { ascending: false });

  return (
    <main className="shell">
      <p className="eyebrow">Travel planner</p>
      <h1>Your trips</h1>
      <p className="muted">Start with the basics. You can build the itinerary after the trip exists.</p>

      <section className="card">
        <h2>Create a trip</h2>
        {params.created && <p>Trip created.</p>}
        {params.error === "title" && <p>A trip name is required.</p>}
        {params.error === "create" && <p>We could not create that trip. Please try again.</p>}
        <form action={createTrip} className="stack">
          <label>
            Trip name
            <input name="title" required placeholder="Texas trip" />
          </label>
          <label>
            Primary destination
            <input name="primary_destination" placeholder="Dallas / Fort Worth, Texas" />
          </label>
          <div className="form-grid">
            <label>
              Start date
              <input name="start_date" type="date" />
            </label>
            <label>
              End date
              <input name="end_date" type="date" />
            </label>
          </div>
          <button type="submit">Create trip</button>
        </form>
      </section>

      <section className="card">
        <h2>Existing trips</h2>
        {trips?.length ? (
          trips.map((trip) => (
            <div key={trip.id} className="trip-row">
              <strong>{trip.title}</strong>
              <p className="muted">
                {trip.primary_destination ?? "Destination not set"} · {trip.status}
              </p>
            </div>
          ))
        ) : (
          <p className="muted">No trips yet. Create your first trip above.</p>
        )}
      </section>
    </main>
  );
}
