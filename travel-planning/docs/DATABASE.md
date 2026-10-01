# Initial Database Design — Travel Planning App

This is the starting logical model. It should be implemented through versioned migrations after framework initialization.

## Core Entities

### profiles
Application-level user profile associated with authentication.

Suggested fields: id, display_name, timezone, created_at, updated_at.

### trips
Top-level trip record.

Suggested fields: id, owner_id, title, status, start_date, end_date, primary_destination, notes, created_at, updated_at.

### trip_travelers
People associated with a trip.

Suggested fields: id, trip_id, name, relationship/label, notes.

### destinations
Places included in a trip.

Suggested fields: id, trip_id, name, arrival_at, departure_at, timezone, sequence.

### itinerary_items
Scheduled or proposed items.

Suggested fields: id, trip_id, destination_id, type, title, description, starts_at, ends_at, location, status, source, notes.

### reservations
Structured reservation/confirmation references.

Suggested fields: id, trip_id, itinerary_item_id, type, provider, confirmation_reference, starts_at, ends_at, location, notes.

Sensitive information should be minimized and protected appropriately.

### trip_tasks
Planning and travel checklist items.

Suggested fields: id, trip_id, title, status, due_at, assigned_to, notes.

### trip_documents
Metadata/references for relevant travel documents or attachments.

Suggested fields: id, trip_id, category, title, storage_reference, created_at.

Do not store unnecessary highly sensitive identity data in the MVP.

### ai_activity
Optional audit/history record for material AI-assisted changes.

Suggested fields: id, trip_id, action_type, summary, created_at.

## Relationships
A user can own multiple trips. A trip can contain multiple travelers, destinations, itinerary items, reservations, tasks, and document references.

## Data Rules
- Every trip-scoped record must be authorization-bound to its trip.
- Use UUID primary keys unless implementation needs dictate otherwise.
- Use timestamps consistently.
- Schema changes must be migration-driven.
