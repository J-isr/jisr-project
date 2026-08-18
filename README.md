# JISR Connect

JISR | جسر — PART 1 OF 4

IMPORTANT:
This is a brand-new JISR website project.

The existing JISR Supabase database already exists and contains production data and existing tables.

DO NOT create a new Supabase project.

DO NOT create duplicate tables.

DO NOT delete, rename, reset, or overwrite existing tables.

DO NOT insert fake production data.

DO NOT modify the existing database schema unless explicitly instructed later.

==================================================
1. PROJECT PURPOSE
==================================================

Build a premium, modern, bilingual university technology and innovation club website for:

JISR | جسر

JISR is a university technology club at King Faisal University.

The club represents a bridge connecting:

- Students
- Technology
- Artificial Intelligence
- Innovation
- Knowledge
- Different academic disciplines
- Future opportunities

The website must feel like a professional university organization and technology/innovation ecosystem.

==================================================
2. TECH STACK
==================================================

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase

Use clean production-quality architecture.

Use reusable components.

Use scalable folder structure.

Prepare the project for future expansion.

==================================================
3. EXISTING SUPABASE DATABASE
==================================================

The existing JISR Supabase database contains these tables:

- academy_courses
- achievements
- announcements
- certificates
- committee_members
- committees
- course_attendance
- course_materials
- course_registrations
- event_registrations
- events
- faq
- gallery
- hero_sections
- members
- news
- notifications
- pages
- partners
- project_members
- projects
- site_settings
- social_links
- statistics
- training_hours
- user_roles

These tables already exist.

Reuse them.

Do not recreate them.

==================================================
4. DATABASE MAPPING
==================================================

Prepare the application to map the website to the existing database:

Hero:
hero_sections

Site settings:
site_settings

Pages:
pages

Events:
events

Event registrations:
event_registrations

Members:
members

Committees:
committees

Committee members:
committee_members

Projects:
projects

Project members:
project_members

Statistics:
statistics

Partners:
partners

Gallery:
gallery

Social links:
social_links

News:
news

Announcements:
announcements

FAQ:
faq

Courses:
academy_courses

Course registrations:
course_registrations

Course materials:
course_materials

Course attendance:
course_attendance

Training hours:
training_hours

Certificates:
certificates

Achievements:
achievements

Notifications:
notifications

Roles:
user_roles

==================================================
5. DATABASE SAFETY
==================================================

At this stage:

DO NOT create new database tables.

DO NOT change existing RLS policies.

DO NOT change existing functions.

DO NOT delete existing data.

DO NOT create fake seed data.

DO NOT modify existing relationships.

First connect to and inspect the existing Supabase project.

==================================================
6. SUPABASE ARCHITECTURE
==================================================

Prepare:

src/lib/supabase.ts

for the Supabase client.

Use environment variables.

Never expose a service-role key in frontend code.

Use only the appropriate public client credentials in the frontend.

Prepare:

src/services/

for database services.

Create service architecture that can later contain:

eventService
committeeService
memberService
projectService
newsService
statisticsService
partnerService
galleryService
socialService
siteSettingsService

Do not fully implement all services yet.

==================================================
7. PROJECT STRUCTURE
==================================================

Create:

src/

├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   └── sections/
│
├── pages/
│
├── services/
│
├── types/
│
├── config/
│
├── hooks/
│
├── translations/
│
├── utils/
│
└── lib/

==================================================
8. CONFIG FILES
==================================================

Prepare:

src/config/club.ts
src/config/social.ts
src/config/contact.ts

Editable business information must be centralized.

Do not hardcode editable information throughout components.

==================================================
9. CLUB CONFIG
==================================================

Prepare:

joinFormUrl:

https://forms.cloud.microsoft/r/mcJkfr2gkX

The Join Club functionality will use this configuration.

==================================================
10. SOCIAL CONFIG
==================================================

Instagram:

https://www.instagram.com/jisr.club.kfu?igsh=bTd3cjlrOGNtaDk4

TikTok:

https://www.tiktok.com/@jisr.club.kfu?_r=1&_t=ZS-98KVmkBwemq

LinkedIn:

https://www.linkedin.com/in/jisrclubkfu?utm_source=share_via&utm_content=profile&utm_medium=member_ios

X:
placeholder

YouTube:
placeholder

The final website must NOT display X or YouTube.

Only active platforms should appear in the public footer.

==================================================
11. CONTACT CONFIG
==================================================

Email:

info@jisrclub.sa

Phone:

EMPTY.

Do not display a placeholder phone number.

Location Arabic:

جامعة الملك فيصل

Location English:

King Faisal University

==================================================
12. BILINGUAL SYSTEM
==================================================

Arabic is the default language.

Arabic:
- RTL
- Arabic typography
- Right-to-left layout

English:
- LTR
- English typography
- Left-to-right layout

Create:

src/translations/

with separate Arabic and English translation files.

Do not scatter translated strings throughout components.

Prepare a reusable language switching system.

Changing language must automatically change:

- text
- layout direction
- alignment
- navigation
- spacing where necessary
- forms
- cards
- footer

==================================================
13. ROUTING FOUNDATION
==================================================

Prepare routes for:

/

 /about

 /events

 /team

 /projects

 /research

 /contact

404

Do not fully build all pages yet.

==================================================
14. INITIAL REUSABLE COMPONENTS
==================================================

Create reusable foundation components:

Navbar
Footer
Button
Card
SectionHeader
Container
LoadingSkeleton
EmptyState
LanguageSwitcher
ThemeToggle
SearchButton
MobileMenu

Keep them reusable and accessible.

==================================================
15. ACCESSIBILITY
==================================================

Prepare the application for accessibility:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible buttons
- accessible form labels
- aria labels where necessary
- good color contrast
- reduced-motion consideration

==================================================
16. RESPONSIVENESS
==================================================

Mobile-first.

Support:

- Mobile
- Tablet
- Laptop
- Desktop
- Large screens

Avoid horizontal overflow.

==================================================
17. DESIGN FOUNDATION
==================================================

Prepare a premium design system using:

Primary:
Dark Navy

Secondary:
White

Accent:
Elegant Gold

Supporting:
Professional JISR blue tones

Style:

- Premium
- Modern
- Minimal
- Elegant
- Professional
- Technology-focused
- Rounded cards
- Soft shadows
- Smooth transitions
- Excellent spacing
- High-quality typography

Do not make it look like a generic SaaS template.

==================================================
18. DO NOT BUILD FULL WEBSITE YET
==================================================

For this step ONLY:

- Connect/prepare Supabase
- Inspect the existing database
- Establish architecture
- Establish routing
- Establish translations
- Establish design tokens
- Establish configuration
- Establish reusable components
- Establish Supabase service structure

Do not build the complete Home page.

Do not create fake content.

Do not create new database tables.

After completing this step, STOP.

Report:

1. Supabase connection status
2. Existing tables detected
3. Existing RLS/security structure
4. Storage buckets detected
5. Project structure created
6. Routes created
7. Translation system created
8. Any issue requiring approval

WAIT FOR MY NEXT INSTRUCTION.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/073ea7e5-0870-45ca-8f7d-d3fe0a909bdc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
