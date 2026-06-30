# Trust and Security Notes

## Trust positioning
The page must build trust without overclaiming. Since real certificate assets are not ready yet, do not design a certificate gallery as if certificates are publicly available.

## Recommended certification wording
Use this safe wording:

Մեր թիմը զարգացնում է իր մասնագիտական որակավորումները ԱԲ, ավտոմատացման և թվային լուծումների ուղղություններով։

Alternative slightly stronger wording:

Մեր թիմի մասնագետները ունեն և շարունակում են ձեռք բերել պաշտոնական սերտիֆիկացումներ ԱԲ գործիքների, ավտոմատացման և թվային լուծումների ուղղություններով։

Use stronger wording only if the business owner approves.

## Do not write for now
- “All certificates are shown below.”
- “Certified by OpenAI/Microsoft/Google” unless true and approved.
- “Guaranteed cost reduction.”
- “100% secure AI.”
- Specific numbers without proof.

## Trust cards
Include these cards:
1. Սերտիֆիկացված մասնագետներ
2. ԱԲ-ով արագացված լուծումներ
3. Խորքային բիզնես վերլուծություն
4. Custom մոտեցում
5. Support և զարգացում
6. Տվյալների նկատմամբ պատասխանատու մոտեցում

## Security mini-section
Title:
Տվյալների նկատմամբ պատասխանատու մոտեցում

Copy:
Բիզնես համակարգերի, CRM-ի, ERP-ի և ԱԲ լուծումների նախագծման ժամանակ կարևոր է տվյալների անվտանգ և վերահսկելի օգտագործումը։ Մենք նախագծում ենք լուծումներ այնպես, որ հասանելիությունները, դերերը, տվյալների հոսքերը և ինտեգրացիաները լինեն հստակ ու կառավարելի։

## AI data handling principles
- Use only the data needed for the task.
- Keep sensitive data away from AI tools unless there is explicit business approval and safe architecture.
- Define access roles.
- Log integrations and data flows.
- Avoid exposing private client data in demos.
- Use environment variables for all secrets.

## Privacy note near form
Ձեր տվյալները օգտագործվում են միայն Ձեզ հետ կապ հաստատելու և խորհրդատվության հարցումը մշակելու համար։

## Security implementation requirements
- Server-side validation.
- Rate limiting.
- Honeypot anti-spam.
- Environment variables for secrets.
- No secrets in client code.
- HTTPS required in production.
- Error logs must not expose sensitive values.

## Future improvements
- Privacy policy page.
- Cookie policy if analytics/cookies are used.
- Consent checkbox if required by target market.
- Audit log for lead submissions.
- CRM integration with access control.
