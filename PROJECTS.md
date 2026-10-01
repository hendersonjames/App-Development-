# App Development — Project Topics

This repository is the shared home for the app projects we are actively planning and building. Use this index to keep conversations, plans, code, and decisions attached to the correct project.

## Travel Planning App
Path: `travel-planning/`

Topics that belong here:
- Product requirements and roadmap
- Texas trip validation scenario
- Trip creation and management
- Travelers, destinations, itinerary, reservations, tasks and documents
- AI travel planning and replanning
- Transportation, lodging, food, activities, routing and budget planning
- Mobile, tablet and desktop responsive experience
- Supabase schema, authentication and RLS specific to travel
- Vercel deployment specific to travel
- Travel integrations, reminders and future voice features

## Prediction Market Intelligence
Path: `prediction-market/`

Topics that belong here:
- Polymarket, Kalshi and similar market data
- Market statistics and historical analysis
- Market/event normalization and matching
- Data ingestion and APIs
- Research, signals and dashboards
- Prediction-market application architecture
- Account/provider integrations when activated

## ChronaCare — AI Pill Reminder
Path: `chronacare/`

Topics that belong here:
- Medication schedules and reminders
- Notification reliability
- Medication tracking
- Doctor/reporting features
- Health-data privacy and security
- Existing ChronaCare Supabase work

## LeadHub — AI Lead Generation
Path: `leadhub/`

Topics that belong here:
- Small-business lead discovery
- Lead qualification and enrichment
- Business/contact research
- Outreach workflows
- Vapi/voice workflows related to lead generation
- Existing LeadHub Supabase work

## PA — Personal Assistant Platform
Path: `personal-assistant/`

Topics that belong here:
- Personal assistant product concept
- Personal and professional modes
- Agent orchestration
- Tasks, reminders and personal workflows
- Business-owner/professional workflows
- Cross-service assistant integrations

## Shared Engineering
Path: `shared/`

Topics that belong here:
- GitHub trunk-based development conventions
- Shared Supabase/Vercel/Vapi/VPS patterns
- Reusable agent architecture
- Shared security and coding standards
- CI/CD and development tooling
- Reusable components or infrastructure used by multiple apps

## Routing rule
If a decision only affects one product, document it inside that project's folder. If it establishes a reusable standard for two or more products, document it under `shared/` and reference it from the affected projects.

Do not mix unrelated product requirements into another project's files merely because the projects share a repository.
