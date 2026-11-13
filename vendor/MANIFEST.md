# Vendored third-party assets

> *Every third-party file on the site is committed here, version-pinned, and
> hash-gated. Nothing loads from a CDN at runtime — the site has no runtime
> dependency on anyone else's server, and no tracker can arrive by editing a
> `<script src>` on someone else's host. `tools/check_third_party.py` verifies
> the hashes on every build.*

| File | Library | Version | Licence | Source | SHA-256 |
|---|---|---|---|---|---|
| `gsap.min.js` | GSAP core | 3.13.0 | GSAP Standard Licence (free for all use, incl. commercial, since the Webflow acquisition — 2024) | `https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js` | `96c01b81f44a3290e2b4532f55e2c9534b2adc43273a19f3756b2cb41f0fd0b6` |
| `ScrollTrigger.min.js` | GSAP ScrollTrigger | 3.13.0 | GSAP Standard Licence (same terms as above) | `https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js` | `308219390e5e3b84cda0c481e70caa9820883ae10bda44e6e9a149a81aac4b3f` |
| `lenis.min.js` | Lenis smooth scroll | 1.3.11 | MIT | `https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js` | `804047c1d9399736983bb38d5a841f96feb743f46a5090a252ede2ca1bfe1f19` |

## Update policy

1. A licence change, an integrity failure, or a new feature need pins a bump.
2. Bump one version at a time: fetch, update the hash in this manifest and
   `tools/check_third_party.py` together, run the full build.
3. The library the motion stack *retired*: `motion.min.js` (Motion One) was
   removed when the stack consolidated on GSAP + ScrollTrigger + Lenis. Its
   receipts stay in git history.

## Behaviour rules these are wired under

- `prefers-reduced-motion: reduce` disables Lenis and every entrance
  animation entirely (`site/js/app.js` early gate).
- No content is hidden by CSS waiting for JS: `.reveal` also carries a
  `<noscript>` override on every page, so no-JS readers (and crawlers) get
  the full text.
- Lenis smooths wheel on desktop-capable pointers and leaves touch to the
  OS (`syncTouch: false`) — mid-tier Android gets native momentum scroll.
