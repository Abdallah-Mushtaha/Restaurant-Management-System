# Project: Restaurant Management System "Mazaq"

Comprehensive, large-scale restaurant management system fully in Arabic (RTL support) with modern dashboards for different roles.

---

## Technologies Used

- **React** – Frontend library
- **TypeScript** – Safe, scalable code
- **Tailwind CSS** – Modern, responsive UI
- **React Router** – Route management
- **React Query** – Data fetching & real-time updates
- **Redux** – Global state management
- **React Icons** – Icons
- **json-server** – Mock database for backend simulation

---

## Roles & Dashboards

### Customer Dashboard

- Access menu directly (no login required; e.g., via QR code)
- View meals and drinks:
  - Name, ingredients, price, category, preparation time, image
- Select quantity & add to cart
- Place order linked to table number
- Real-time notification if item unavailable
- Payment triggers rating popup
- **UI Structure**:
  1. Hero banner (promotional section)
  2. Category slider (horizontal scroll with icons)
  3. Product grid with cards
     - Meal image (rounded), name, rating stars, price, add-to-cart button
  4. Trending section (top meals of day/week/month)
  5. Right-side cart panel: items, quantity, remove, checkout
- Fully responsive & RTL

---

### Cashier Dashboard

- See new orders instantly
- Full price breakdown:
  - Subtotal, tax, service fee, total
- Select payment method: Cash or Other
- Generate invoices (print / PDF)
  - Customer name, table number, date/time, items, quantities, prices, tax, service, total
- Close orders & trigger customer rating popup

---

### Kitchen Dashboard

- Real-time order updates (React Query polling)
- Orders include table number, items, quantities
- Update order status:
  - Received / Preparing / Ready / Unavailable
- Set estimated preparation time
- All updates reflect in Cashier & Admin dashboards instantly

---

### Admin Dashboard

- Full control over the system:
  - Add/Edit/Delete meals & drinks
  - Add categories, ingredients, prep time, images, availability toggle
- Monitor:
  - Kitchen & cashier status
  - Customer ratings
- Analytics Section:
  - Daily/Monthly revenue
  - Most sold meals
  - Average preparation time
  - Overall rating
  - Number of today’s orders
- Accounting Section:
  - All invoices, completed orders
  - Filter by date
  - Monthly financial summary & statistics

---

## 🗄 Database Structure (json-server)

**Users:**

- `id`, `name`, `role` (admin/cashier/kitchen), `email`, `password`

**Products:**

- `id`, `name`, `description`, `price`, `categoryId`, `preparationTime`, `ingredients`, `image`, `isAvailable`

**Categories:**

- `id`, `name`

**Orders:**

- `id`, `tableNumber`, `items` [{productId, name, price, quantity}], `status`, `subtotal`, `tax`, `service`, `totalPrice`, `paymentMethod`, `preparationTime`, `createdAt`

**Reviews:**

- `id`, `orderId`, `rating`, `comment`

---

## ⚡ Features & Requirements

- Full Arabic interface (RTL)
- Modern, clean, professional UI design
- Responsive layout for all screens
- Loading states, error handling, toast notifications
- Role-based access control with protected routes
- Reusable component architecture
- Real-time updates (React Query polling)
- Fully functional invoice system
- Analytics dashboard with charts & stats
- Elegant typography & spacing

---

## How to Run

1. Clone the repo:
   ```bash
   git clone <repo_url>
   cd <repo_folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open the app in your browser:
   [http://localhost:5173/](http://localhost:5173/)
5. Enjoy!
