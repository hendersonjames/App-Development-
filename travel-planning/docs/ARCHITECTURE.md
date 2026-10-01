# Architecture — Travel Planning App

## Proposed Foundation
The existing accounts available to the project provide a practical starting stack:
- Vercel for the web frontend/deployment.
- Supabase for Postgres data, authentication, and backend capabilities.
- GitHub for source control and development workflow.
- Vapi for optional voice features.
- VPS for workloads that later require custom or persistent infrastructure.

## Application Layers
### Client
Responsive web application optimized for both planning and in-trip mobile use.

### Application/API Layer
Server-side endpoints/actions responsible for authorization, trip operations, AI orchestration, and external integrations.

### Data Layer
Supabase/Postgres as the system of record for users, trips, travelers, itinerary items, reservations/references, and tasks.

### AI Layer
AI assists with turning user intent and trip information into structured plans. AI-generated changes should map back to structured application data rather than existing only as chat text.

### Integration Layer
External travel, maps, messaging, calendar, voice, or booking providers should be isolated behind adapters so providers can be replaced without rewriting the core trip model.

## Security
- No credentials in the repository.
- Use environment variables and platform secret stores.
- Enforce user/trip authorization server-side.
- Use least-privilege access to third-party providers.
- Keep production and development credentials separate.

## Development Strategy
Use short-lived feature branches, focused commits, and pull requests into `main`. Build a vertical slice for the Texas scenario before broadening integrations.
