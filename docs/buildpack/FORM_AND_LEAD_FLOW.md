# Form and Lead Flow

## Goal
Capture consultation leads and deliver them to Email and Telegram.

## Form fields
### Required
- Name
- Phone or Email
- Interested solution
- Problem description

### Optional
- Company

## Full field list
1. `name`
2. `company`
3. `phone`
4. `email`
5. `interested_solution`
6. `message`
7. `locale`
8. `source_page`
9. `utm_source`
10. `utm_medium`
11. `utm_campaign`
12. `utm_term`
13. `utm_content`
14. `consent`
15. `created_at`

## Interested solution options
- CRM system
- Web website / landing page
- ERP / internal management system
- Dashboard / analytics
- AI automation
- Workflow automation
- E-commerce / online shop
- System integration
- AI assistant / chatbot
- Booking / scheduling system
- Customer support / ticketing system
- Inventory / warehouse management
- Mobile app
- Branding / UI design
- I am not sure, I want consultation

## UX behavior
- Submit button shows loading state.
- Duplicate submit is blocked.
- On success, show success message.
- On failure, show friendly error and keep entered values.

## Armenian success message
Շնորհակալություն։ Ձեր հայտը ստացվել է։ Մեր թիմը կապ կհաստատի Ձեզ հետ հնարավորինս շուտ։

## Armenian error message
Հայտը ուղարկելիս խնդիր առաջացավ։ Խնդրում ենք փորձել կրկին կամ կապ հաստատել մեզ հետ նշված կոնտակտներով։

## Validation rules
- Name: minimum 2 characters.
- Phone: optional if email exists.
- Email: optional if phone exists; valid email if provided.
- Interested solution: required.
- Message: minimum 10 characters.
- Honeypot field must be empty.

## Backend route
Recommended endpoint:
```txt
POST /api/leads
```

## Server-side actions
1. Validate payload.
2. Sanitize text fields.
3. Store lead in database or file/log if database not available.
4. Send email notification.
5. Send Telegram notification.
6. Return success response.

## Email notification format
Subject:
New consultation request — [Interested Solution]

Body:
- Name
- Company
- Phone
- Email
- Interested solution
- Message
- Locale
- Source page
- UTM data
- Timestamp

## Telegram notification format
```txt
New consultation request
Name: ...
Company: ...
Phone: ...
Email: ...
Solution: ...
Message: ...
Locale: ...
```

## Environment variables
```txt
LEADS_EMAIL_TO=
LEADS_EMAIL_FROM=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## Spam protection
MVP:
- Honeypot field,
- server-side rate limit,
- basic payload length limits.

Optional later:
- Turnstile or reCAPTCHA,
- IP reputation,
- email verification.

## Privacy note
Near form, include:
Ձեր տվյալները օգտագործվում են միայն Ձեզ հետ կապ հաստատելու և խորհրդատվության հարցումը մշակելու համար։

## Unknown values
Actual email, Telegram bot token, chat ID, and SMTP credentials are placeholders until provided. Track in `OPEN_ITEMS_LOG.md`.
