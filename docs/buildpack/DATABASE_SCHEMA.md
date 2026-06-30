# Database Schema

## Recommendation
For MVP, use a simple lead submissions schema. If there is no database in the first release, keep the schema ready and still send leads to Email + Telegram.

## Lead submission table
Recommended table name: `lead_submissions`

```sql
CREATE TABLE lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  email TEXT,
  interested_solution TEXT NOT NULL,
  message TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'hy',
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  consent BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Constraints
```sql
ALTER TABLE lead_submissions
ADD CONSTRAINT lead_submissions_contact_check
CHECK (
  phone IS NOT NULL OR email IS NOT NULL
);
```

## Status values
- `new`
- `contacted`
- `qualified`
- `not_fit`
- `converted`
- `archived`

## Optional event table
For future CRM handoff:
```sql
CREATE TABLE lead_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES lead_submissions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Optional notification log
```sql
CREATE TABLE lead_notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES lead_submissions(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  status TEXT NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## TypeScript lead type
```ts
export type LeadSubmission = {
  id?: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  interestedSolution: string;
  message: string;
  locale: 'hy' | 'en' | 'ru';
  sourcePage?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  consent?: boolean;
};
```

## No database MVP fallback
If database is not ready:
1. Validate form.
2. Send Email.
3. Send Telegram.
4. Log only non-sensitive technical status.
5. Add database integration later.

## Data retention
Define later based on legal and business needs. Placeholder in `OPEN_ITEMS_LOG.md`.
