# Portfolio QA Checklist

Use this checklist before sharing the portfolio in interviews or applications.

## 1. Navigation and Routing

- [ ] `Home`, `About`, `Skills`, `Projects`, and `Contact` open correctly.
- [ ] Active nav item matches the current page.
- [ ] Logo (`AS`) always returns to `index.html`.
- [ ] `404.html` shows correctly for invalid routes.

## 2. Projects Page

- [ ] Each project card shows summary content in list view.
- [ ] Clicking `View Full Details` opens focused project mode.
- [ ] `Back to All Projects` button is visible and not overlapping content.
- [ ] Focus mode shows both screenshots clearly.
- [ ] `Esc` key exits focus mode.
- [ ] `GitHub` and `Live Demo` links open correctly in new tabs.

## 3. Contact Form

- [ ] Empty required fields are blocked.
- [ ] Invalid email format is blocked.
- [ ] Message under 10 characters is blocked.
- [ ] Valid form shows `Sending...` state.
- [ ] Successful submit shows success message.
- [ ] Failure path shows fallback email message.
- [ ] Message arrives to `ashbinsanthosh2@gmail.com`.

## 4. Responsive UI

- [ ] Test at desktop (>= 1200px).
- [ ] Test at tablet (~768px).
- [ ] Test at mobile (<= 430px).
- [ ] No text/button overlap on any page.
- [ ] Project focus layout remains readable on smaller screens.

## 5. Theme and Visual Polish

- [ ] Dark mode toggle works on every page.
- [ ] Theme choice stays after page refresh.
- [ ] Buttons are readable in light and dark themes.
- [ ] Screenshot hover effects feel smooth and not distracting.

## 6. Accessibility Checks

- [ ] Keyboard-only navigation works (`Tab`, `Shift+Tab`, `Enter`).
- [ ] Focus ring is visible on interactive controls.
- [ ] `Skip to content` link works.
- [ ] Images have meaningful `alt` text.
- [ ] Form status messages are announced (`aria-live`).

## 7. Content Accuracy

- [ ] Spelling and grammar reviewed on all pages.
- [ ] Project descriptions match your real work.
- [ ] Claims are interview-defensible.
- [ ] Resume and LinkedIn placeholders are intentional.

## 8. Final Pre-Interview Pass

- [ ] Hard refresh done (`Ctrl/Cmd + Shift + R`).
- [ ] All external links checked once.
- [ ] Contact form tested one final time.
- [ ] Live URL copied and ready to share:
  - `https://ashbin124.github.io/portfoliome/`
