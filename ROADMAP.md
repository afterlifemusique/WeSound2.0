# WeSound 2.0 Modular Roadmap

This roadmap is **modular**, so modules can be added, removed, or rescheduled easily.

---

## 🔵 PHASE 0 — Foundation

### Module F1 — Core Auth & Roles
- User registration/login
- Roles: regular / creator / admin
- Basic profile
- Verification flag system

**Deliverable:** Users can securely create accounts and log in.

### Module F2 — Platform Infrastructure
- Clean repo structure
- Environment config
- Logging & error handling
- Rate limiting
- Secure token encryption

**Deliverable:** Stable technical base.

---

## 🟢 PHASE 1 — Discovery Core

### Module D1 — YouTube Embed Integration
- Embed official YT videos only
- Link to original source
- Store video ID
- Basic post system using YT link

### Module D2 — Like System + Activity Score
- Like artists/posts
- Track interactions
- Compute monthly_activity_score

### Module D3 — Similar Artist Engine
- Co-like weight calculation
- “People who like X also like Y”
- Simple card UI (not graph)

---

## 🟢 PHASE 1.5 — Spotify SDK Playback Integration

### Module S1 — Spotify OAuth (User-Level Playback)
- Connect Spotify account via OAuth
- Request scopes:
    - user-modify-playback-state
    - user-read-playback-state
    - streaming
- Separate user playback tokens from creator analytics tokens
- Store encrypted refresh token
- Short-lived access tokens only
- Secure refresh endpoint

### Module S2 — Spotify Web Playback SDK Integration
- Load Spotify Web Playback SDK on client
- Initialize player with user access token
- Handle:
    - ready event
    - not_ready event
    - token expiration
    - device transfer
- Register browser as active Spotify device
- Graceful teardown on logout

### Module S3 — Spotify Track Binding System
- Add optional `spotify_uri` field to track model
- Bind WeSound tracks to official Spotify tracks
- Validate URI format (`spotify:track:...`)
- Manual search + selection via Spotify API
- Prevent duplicate incorrect bindings

### Module S4 — Embedded Player UI Component
- Custom minimal playback UI:
    - Play / Pause
    - Track name
    - Artist
    - Progress bar
- Show Premium-required notice if needed
- Auto-fallback to YouTube embed if:
    - User not Premium
    - SDK fails
    - Token invalid
    - Playback disallowed

### Module S5 — Playback Activity Logging
- Log:
    - Play start
    - 30-second threshold (engagement signal)
    - Full listen
- Integrate into:
    - monthly_activity_score
    - Remix node weight
    - Trending calculation
- Store anonymized event metrics

**Deliverable:**  
Embedded Spotify player inside WeSound.  
Premium users can play tracks without leaving the platform.  
Playback data feeds discovery and graph intelligence.

---

## 🟡 PHASE 2 — Remix & Chain Infrastructure

### Module R1 — Parent-Child Post System
- Every remix references a parent
- Store branch depth
- Store origin ID

### Module R2 — Remix Tree View
- Expand/collapse tree
- Activity badges
- Highlight hot branches

---

## 🟠 PHASE 3 — Creator Intelligence (Premium)

### Module C1 — Platform OAuth Connections
- Spotify, YouTube, IG, etc.
- Store encrypted tokens

### Module C2 — Metrics Snapshot Engine
- Daily cron job
- Store followers, views, listeners
- Compute growth velocity

### Module C3 — Creator Dashboard v1
- Growth charts
- Platform comparison
- Momentum index
- Audience overlap %

---

## 🔴 PHASE 4 — Graph Systems

### Module G1 — Artist Similarity Graph (Local View)
- Node size = monthly activity
- Edge weight = co-like strength
- Limited to top connections

### Module G2 — Remix Chain Graph Mode
- Toggle: current activity / total activity
- Performance optimized

---

## 🟣 PHASE 5 — Monetization & Ecosystem

### Module M1 — Creator Premium Subscription
- Stripe integration
- Feature gating
- Trial logic

### Module M2 — Music Tools Promoter Section
- External affiliate links
- Partner section
- Creator discounts

### Module M3 — Privacy Tier System
- Private
- Creator-private
- Niche-private
- Niche-fan
- Public
- Access logic layer

---

## ⚫ PHASE 6 — Advanced Intelligence

### Module A1 — Growth Timeline Evolution Mode
- Historical graph slider
- Momentum spike detection

### Module A2 — Collab Recommendation Engine
- Overlap + activity based suggestions
- Smart “You should collab with X”