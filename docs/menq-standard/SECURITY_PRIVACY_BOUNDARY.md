# Security and Privacy Boundary / Security և privacy սահման

## Հայերեն
Secrets-ը repository-ում չեն պահվում։ Auth/session/RBAC server-side enforce են արվում։ Lead/booking PII-ն analytics event-ներում չի ուղարկվում։ Rate limiting, honeypot, validation, audit logging և least privilege կիրառվում են։ Design/docs changes-ը չեն authorize անում security semantics փոփոխել։

## English
Secrets are not stored in the repository. Authentication, session, and RBAC are enforced server-side. Lead and booking PII is not sent in analytics events. Rate limiting, honeypot controls, validation, audit logging, and least privilege are applied. Design and documentation changes do not authorize security-semantic changes.

<!-- END: MENQ_WEBPAGE_SECURITY_PRIVACY -->
