# Supabase schema workflow

The connected development project is the current source of truth while the first schema is being iterated.

Current core tables: profiles, trips, trip_travelers, destinations, itinerary_items, reservations, trip_tasks.

All public tables have Row Level Security enabled. Trip-scoped policies currently authorize the trip owner. Before production, generate and commit a clean migration from the finalized connected schema using the Supabase CLI migration workflow rather than inventing migration history by hand.

Run Supabase security and performance advisors after every material DDL change.
