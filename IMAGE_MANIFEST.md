# RoadNest image manifest

All visual assets used by the site are local files under `assets/images/`. The generated assets are PNG files because the built-in image generator exports PNG; they are high-resolution and are cropped with `object-fit: cover` where the layout requires it.

## Core page imagery

| Area | Local asset | Usage |
| --- | --- | --- |
| Home 1 hero | `assets/images/home-1/home1-hero-rv-service.png` | Main workshop hero; not reused |
| Home 1 supporting scenes | `home1-workshop.png`, `home1-technician.png`, `home1-roadready.png`, `home1-inspection-process.png`, `home1-cta-roadtrip.png` | Workshop, inspection, road-ready, owner review, and departure sections |
| Home 2 hero | `assets/images/home-2/home2-hero-road-trip.png` | Road-trip hero; not reused |
| Home 2 RV types | `home2-class-a.png`, `home2-class-b.png`, `home2-class-c.png`, `home2-fifth-wheel.png`, `home2-travel-trailer.png`, `home2-toy-hauler.png`, `home2-popup-camper.png`, `home2-luxury-coach.png` | One distinct image per RV type card |
| Home 2 supporting scenes | `home2-seasonal-care.png`, `home2-roof-repair.png`, `home2-slideout-repair.png`, `home2-solar-repair.png`, `home2-mobile-service.png` | Seasonal care, roof, slide-out, solar, and roadside service sections |
| Services | `assets/images/services/service-*.png` | Each service card maps to its matching service-detail hero; this is the only intentional service-card/detail reuse |
| About | `assets/images/about/about-hero.png` | About page hero |
| Team | `assets/images/team/team-01.png` through `team-04.png` | RV technician/service specialist portraits; About and Admin technician views |
| Contact | `assets/images/contact/contact-hero.png` | Contact page background hero |
| Directory hero bands | `assets/images/heroes/services-hero.png`, `pricing-hero.png`, `blog-hero.png` | Dedicated Services, Pricing, and Blog hero backgrounds with readability overlays |
| Auth | `assets/images/auth/login-owner-rv.png`, `register-rv-owner.png` | Owner login and registration backgrounds |
| Dashboard | `assets/images/dashboard/dashboard-my-rv.png` | Owner demo vehicle in My RV, overview, and booking views |

## Blog imagery

Each blog card and its matching article detail page uses one topic-specific local image. There is no reuse across unrelated articles:

`blog-long-trip-maintenance.png`, `blog-winterization-checklist.png`, `blog-battery-warning-signs.png`, `blog-generator-maintenance.png`, `blog-roof-inspection.png`, `blog-electrical-system.png`, `blog-solar-power.png`, `blog-tire-safety.png`, and `blog-plumbing-leak.png`.

## QA notes

- No external stock-image URLs remain in the HTML.
- Generic testimonial/profile photographs were removed; testimonials use initials and dashboard/admin identities use styled initials.
- Service cards and matching service-detail heroes intentionally share their service asset, as specified.
- Blog cards and matching blog-detail heroes intentionally share their article asset, as specified.
- Local asset paths were checked against the filesystem after the rework.
- Browser DevTools/network verification still needs to be done in the user's browser because this workspace does not provide browser automation.
