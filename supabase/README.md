# Supabase directory foundation

This directory contains an additive first migration for the Sylven directory.
It is intentionally not applied to any project by repository code.

The migration creates the seven documented tables, enables row-level security
on every table, withholds direct anonymous access to all base tables, and exposes
only a freshness-gated `public_clinic_directory` view. Lead and consent tables
have no anonymous policies and are not connected to a public form.

Before applying the migration:

1. create a separate non-production Supabase project;
2. review the migration with product, privacy, and database reviewers;
3. run database constraint and RLS tests against a disposable database;
4. import source-reviewed listing records through protected operator tooling; and
5. add the project URL and anonymous key only to the matching Netlify preview context.

When no Supabase environment variables are configured, the application uses the
small checked-in research dataset so the draft interface remains reviewable.
