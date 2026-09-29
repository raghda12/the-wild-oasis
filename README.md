# The Wild Oasis

An internal hotel management dashboard for **The Wild Oasis**, a small hotel with eight cabins. Hotel staff use it to manage bookings, check guests in and out, edit cabins and prices, and follow sales and occupancy.

Built with React, React Query, styled-components and Supabase.

---

## Features

### Dashboard
- Greeting with the logged-in user's name and today's date
- Filter every statistic by the **last 7, 30 or 90 days**
- Stat cards: number of bookings, total sales, check-ins and occupancy rate
- **Today**: guests arriving and departing today, with one-click check in / check out
- **Stay duration** donut chart for confirmed stays
- **Sales** area chart: total sales and extras (breakfast) per day

### Bookings
- Paginated table of all bookings (10 per page)
- Filter by status: all, unconfirmed, checked in, checked out
- Sort by date or amount
- Booking detail page with guest, cabin, dates, price and payment status
- Actions from each row: see details, check in, check out, delete

### Check in / check out
- Check in confirms that the guest has paid
- Breakfast can be added at check-in; the price is taken from the hotel settings
- Check out from the dashboard, the bookings table or the booking page

### Cabins
- Cabins shown as cards with photo, capacity, price and discount
- Filter by discount, sort by name, price or capacity
- Create, edit, duplicate and delete cabins, including photo upload

### Header and sidebar
- **Global search** (`Ctrl K` / `⌘ K`): finds bookings by guest name, email or booking number, and cabins by name. Use the arrow keys and `Enter` to open a result.
- **Notifications**: bookings created in the last 7 days, with a counter for ones you have not seen yet. Refreshes every minute.
- **Today summary** in the sidebar, plus a counter on *Bookings* for guests still to check in or out today

### Users and settings
- Log in / log out; every app page requires a logged-in user
- Create new staff accounts
- Update your name, avatar and password
- Hotel settings: minimum and maximum nights per booking, maximum guests per booking, breakfast price

### Look and feel
- Custom design system: forest green, warm amber and a sand-toned background, with Fraunces for headings and Manrope for text
- Light and dark mode. The first visit follows the operating system setting, and the choice is remembered after that.

---

## Tech stack

| Area | Library |
| --- | --- |
| UI | React 18, React Router 7 |
| Server state | TanStack React Query 4 |
| Styling | styled-components 6 |
| Backend | Supabase (Postgres, Auth, Storage) |
| Forms | React Hook Form |
| Charts | Recharts |
| Dates | date-fns |
| Notifications | react-hot-toast, react-toastify |
| Icons | react-icons (Heroicons) |
| Build | Vite 4 |

---

## Getting started

### Requirements
- Node.js 18 or newer
- A Supabase project (see [Supabase setup](#supabase-setup))

### Install and run

```bash
git clone https://github.com/raghda12/the-wild-oasis.git
cd the-wild-oasis
npm install
npm run dev
```

The app runs at http://localhost:5173.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Supabase setup

The Supabase URL and public (anon) key are set in [`src/services/supabase.js`](src/services/supabase.js). To use your own project, replace both values there.

### Tables

| Table | Main columns |
| --- | --- |
| `cabins` | `name`, `maxCapacity`, `regularPrice`, `discount`, `description`, `image` |
| `guests` | `fullName`, `email`, `nationality`, `nationalID`, `countryFlag` |
| `bookings` | `startDate`, `endDate`, `numNights`, `numGuests`, `cabinPrice`, `extrasPrice`, `totalPrice`, `status`, `hasBreakfast`, `isPaid`, `observations`, `cabinId` → `cabins`, `guestId` → `guests` |
| `settings` | `minBookingLength`, `maxBookingLength`, `maxGuestsPerBooking`, `breakfastPrice` (a single row) |

A booking's `status` is one of `unconfirmed`, `checked-in` or `checked-out`.

### Storage buckets
- `cabin-images`: cabin photos (public)
- `avatars`: user profile pictures (public)

### Authentication
Email and password sign-in through Supabase Auth. Users are created from the **Users** page inside the app. The user's full name and avatar are stored in the auth user's metadata.

### Row Level Security
Enable RLS on every table and allow the operations the app needs for **authenticated** users. The app reads and writes all four tables, so logged-out visitors should not be able to read them.

### Sample data
[`src/data/Uploader.jsx`](src/data/Uploader.jsx) fills the database with sample cabins, guests and bookings, with dates relative to today. To use it, uncomment `<Uploader />` in [`src/ui/Sidebar.jsx`](src/ui/Sidebar.jsx), log in, and click the upload buttons. Comment it out again afterwards.

---

## Project structure

```
src/
├── App.jsx                 Routes, React Query client and providers
├── main.jsx                Entry point and error boundary
├── context/                Dark mode context
├── data/                   Sample data and the Uploader
├── features/               Feature code: components + React Query hooks
│   ├── authentication/     Login, signup, account forms, current user
│   ├── bookings/           Bookings table, rows, detail page
│   ├── cabins/             Cabin cards, cabin form
│   ├── check-in-out/       Check in page, today's activity, check out
│   ├── dashboard/          Stats, charts, dashboard layout
│   ├── notifications/      Header notifications
│   ├── search/             Global search
│   └── settings/           Hotel settings form
├── hooks/                  Shared hooks (outside click, local storage, …)
├── pages/                  One component per route
├── services/               Supabase client and API functions
├── styles/GlobalStyles.js  Design tokens (colours, fonts, radii) and base CSS
├── ui/                     Reusable UI: Button, Table, Modal, Menus, Filter, …
└── utils/                  Helpers and constants
```

**Conventions**
- Every Supabase call lives in `src/services/`. Components never call Supabase directly.
- Each feature has its own hooks (`useBookings`, `useCheckin`, …) that wrap React Query.
- Filters, sorting and pagination are kept in the URL (`?status=`, `?sortBy=`, `?page=`, `?last=`), so views can be shared and survive a reload.
- Colours come from CSS variables in `GlobalStyles.js`. Light and dark mode switch by changing the `light-mode` / `dark-mode` class on `<html>`.
- Props used only for styling start with `$` (for example `$active`), so they are not passed to the HTML element.

---

## Routes

| Path | Page |
| --- | --- |
| `/login` | Log in |
| `/dashboard` | Dashboard |
| `/bookings` | All bookings |
| `/bookings/:bookingId` | Booking details |
| `/checkin/:bookingId` | Check in a booking |
| `/cabins` | Cabins |
| `/users` | Create a user |
| `/settings` | Hotel settings |
| `/account` | Your account |

All routes except `/login` require a logged-in user.

---

## Known limitations
- Notifications are fetched from Supabase every minute, not pushed in real time. Only new bookings are shown. Which ones you have seen is stored in your browser, not in the database.
- There is no page for creating a booking. Bookings come from the sample data or from outside the app.
- The Supabase URL and key are hard-coded instead of being read from environment variables.

---

## Credits
Based on *The Wild Oasis* project from Jonas Schmedtmann's *Ultimate React Course*, with a redesigned interface and extra features (global search, notifications, today summary).
