# Design Brief

## Direction

**Cool Serene Healthcare** — A light, calm, and trustworthy diagnostic platform with cool ocean blues, warm accents, and spacious layouts that put patients and admins at ease during medical data interactions.

## Tone

Clinical trust through refined minimalism: cool undertones convey medical professionalism; spacious, white-dominant layouts reduce cognitive load; no unnecessary decorative elements but intentional depth through shadows and color hierarchy.

## Differentiation

Status badges (pending/uploaded/sent/viewed) use distinct colors — success green, warning amber — giving instant visual feedback without icons; mobile-first patient dashboard with warm reassurance mirrors desktop admin data density without sacrificing either audience.

## Color Palette

| Token          | OKLCH           | Role                                |
|----------------|-----------------|-------------------------------------|
| background     | 0.98 0.008 230  | Light cool off-white                |
| foreground     | 0.18 0.015 230  | Deep cool text                      |
| card           | 1.0 0.004 230   | Pure white card surfaces            |
| primary        | 0.42 0.14 240   | Deep ocean blue (CTA, links, status)|
| secondary      | 0.95 0.01 230   | Subtle backgrounds                  |
| accent         | 0.6 0.15 170    | Warm teal (secondary actions)       |
| success        | 0.6 0.16 150    | Green (viewed/complete status)      |
| warning        | 0.72 0.15 85    | Amber (pending status)              |
| destructive    | 0.55 0.22 25    | Red (errors, delete actions)        |
| border         | 0.9 0.008 230   | Subtle dividers                     |

## Typography

- Display: Space Grotesk — Modern, geometric, tech-forward; builds confidence in medical tech. Headings, hero text.
- Body: Figtree — Warm, approachable, highly legible; humanizes clinical content. All body copy, labels, UI text.
- Mono: JetBrains Mono — Report codes, timestamps, data labels. Used sparingly.
- Scale: Hero `text-4xl md:text-6xl font-bold tracking-tight`, H2 `text-3xl font-bold tracking-tight`, H3 `text-lg font-semibold`, Label `text-xs font-semibold uppercase tracking-widest`, Body `text-base leading-relaxed`.

## Elevation & Depth

Cards float on subtle `shadow-sm` (0 1px 3px); interactive cards lift to `shadow-md` on hover; header sits flat with thin `border-b` (no shadow); footer mirrors header treatment. Depth via layering, not blur.

## Structural Zones

| Zone    | Background           | Border       | Notes                                                  |
|---------|----------------------|--------------|--------------------------------------------------------|
| Header  | bg-card border-b     | border-border| Sticky navigation with logo, user menu. Subtle divider.|
| Content | bg-background        | —            | Main scrollable area. Odd sections: bg-secondary/30.   |
| Sidebar | bg-card border-r     | border-border| Admin: fixed, patient search + quick filters.         |
| Footer  | bg-secondary/20      | border-t     | Minimal: copyright, links. Rarely used.                |
| Card    | bg-card rounded-lg   | border-border| Primary container. `shadow-sm`, hover `shadow-md`.     |

## Spacing & Rhythm

16px grid baseline; 24px section gaps; 16px inside cards; 8px micro-spacing between form fields and buttons. Patient dashboard alternates card backgrounds (white/secondary-tinted) for rhythm; admin tables use dense 12px row padding.

## Component Patterns

- Buttons: Primary (bg-primary text-primary-foreground), Secondary (border border-primary text-primary), Danger (bg-destructive text-destructive-foreground). Rounded-md, 8px padding. Hover lifts via `shadow-md` and lightens via opacity.
- Cards: `bg-card border border-border rounded-lg shadow-sm`. Patient view: spacious (p-6), admin: compact (p-4).
- Badges: Status-specific — `.status-pending` (warning), `.status-uploaded` (primary), `.status-sent` (accent), `.status-viewed` (success). Bg color at 10% opacity, 30% border opacity, 12px radii.
- Forms: `input-field` utility: bg-input border rounded-md, focus ring-2 ring-primary/50. Label above in text-sm font-semibold.

## Motion

- Entrance: Subtle fade-in (opacity 0→1 over 300ms) on page load; staggered card load at 50ms intervals.
- Hover: `.transition-smooth` (all 0.3s ease) lifts shadows, shifts text-opacity for interactive elements.
- Decorative: None. Motion is purposeful, not playful.

## Constraints

- No gradients; colors convey hierarchy via lightness and chroma.
- Never use primary blue for warnings; only green/amber/red for status.
- Maintain 0.7 L-contrast minimum for all text; never rely on opacity alone.
- Mobile-first; tablet/desktop add density and columns, never remove whitespace.
- All icons use `lucide-react`; colors via `text-primary`, `text-warning`, etc., never hardcoded.

## Signature Detail

**Report status badge system** — Four distinct badge styles (pending/uploaded/sent/viewed) with semantic colors (yellow/blue/teal/green) + thin borders eliminate the need for icons and create instant visual scanning for patient dashboards and admin report queues.
