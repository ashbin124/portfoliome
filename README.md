# Ashbin Santhosh Portfolio

Professional portfolio website for entry-level full-stack developer interviews.

Live site: `https://ashbin124.github.io/portfoliome/`

## Overview

This is a multi-page static portfolio that presents:

- Professional summary and career focus
- Technical skills
- Project case-study style details
- Working contact form submission flow

## Pages

- `index.html` - Home and positioning
- `about.html` - Background and goals
- `skills.html` - Skills grouped by area
- `projects.html` - Project showcase with focused details view
- `contact.html` - Contact details and message form
- `404.html` - Custom not-found page

## Core Features

- Responsive layout for desktop and mobile
- Dark mode toggle with saved preference
- Animated reveal effects on scroll
- Project "View Full Details" mode with:
  - Back to all projects button
  - Expanded project information
  - Dual screenshot layout
- Contact form with:
  - Client-side validation
  - Honeypot spam field
  - AJAX submission to FormSubmit
  - Success and error status messages

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- FormSubmit (contact form delivery)

## Run Locally

No build tools are required.

Option 1:

```bash
python3 -m http.server 5500
```

Open:

`http://127.0.0.1:5500/`

Option 2:

Use VS Code Live Server and open `index.html`.

## Contact Form Setup

Current form endpoint:

- `https://formsubmit.co/ashbinsanthosh2@gmail.com`
- AJAX endpoint: `https://formsubmit.co/ajax/ashbinsanthosh2@gmail.com`

If you change email:

1. Update `action` and `data-ajax-endpoint` in `contact.html`.
2. Submit one test message to activate the new FormSubmit address.

## Interview Prep Notes

- Resume link is intentionally disabled for now (`Resume Coming Soon`).
- LinkedIn is marked `Will be added soon`.
- Replace placeholder/profile assets before final interviews.

Use `QA_CHECKLIST.md` before sending this portfolio to recruiters.
