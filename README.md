# **NexaStore**

Welcome to **NexaStore**, a modern and feature-rich eCommerce platform built with cutting-edge technologies. This project is designed to provide a seamless shopping experience with advanced features like a dynamic cart, secure checkout, and a visually stunning UI.

---

## **Table of Contents**

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Folder Structure](#folder-structure)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
7. [Development](#development)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

---

## **Features**

- **Dynamic Cart**: Add, update, and remove items with real-time updates.
- **Secure Checkout**: Integrated with Stripe for secure payments.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Wheel of Fortune**: Gamified shopping experience with a spin-to-win feature.
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations.
- **Sanity CMS**: Manage products, categories, and promotions dynamically.
- **SEO Optimized**: Meta tags and structured data for better search engine visibility.
- **Newsletter Subscription**: Stay updated with the latest offers and news.

---

## **Technologies Used**

- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **CMS**: Sanity.io
- **Payment Gateway**: Stripe
- **State Management**: Zustand
- **Deployment**: Vercel
- **Other Tools**: React Toastify, Radix UI, Google Maps API

---

## **Folder Structure**

```
22-NexaStore/
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets (images, icons, etc.)
├── src/
│   ├── actions/            # Server-side actions (e.g., cart, Stripe, auth)
│   ├── app/                # Next.js app directory
│   │   ├── components/     # Reusable components (e.g., cart, footer, header)
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog page
│   │   ├── contact/        # Contact page
│   │   ├── services/       # Services page
│   │   ├── layout.tsx      # Root layout for the app
│   │   ├── globals.css     # Global styles
│   ├── lib/                # Utility functions and helpers
│   ├── sanity/             # Sanity CMS configuration
│   ├── store/              # Zustand store for state management
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
```

---

## **Installation**

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/NexaStore.git
   cd NexaStore
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Ensure you have PostgreSQL installed.
   - Create a database and update the `DATABASE_URL` in the `.env` file.

4. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

6. **Start the Development Server**:
   ```bash
   npm run dev
   ```

---

## **Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2023-01-01
SANITY_API_READ_TOKEN=your_sanity_read_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## **Usage**

### **Run the Development Server**
```bash
npm run dev
```
Visit `http://localhost:3000` to view the application.

### **Build for Production**
```bash
npm run build
```

### **Start the Production Server**
```bash
npm start
```

---

## **Development**

### **Key Features to Explore**

1. **Dynamic Cart**:
   - Add, update, and remove items.
   - Real-time updates using Zustand.

2. **Wheel of Fortune**:
   - Spin to win discounts or free products.
   - Integrated with the cart system.

3. **Sanity CMS**:
   - Manage products, categories, and promotions dynamically.

4. **Stripe Integration**:
   - Secure payment processing.
   - Handles success and cancellation flows.

---

## **Deployment**

The project is optimized for deployment on **Vercel**.

1. **Push to GitHub**:
   Ensure your code is pushed to a GitHub repository.

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/).
   - Import your GitHub repository.
   - Add the environment variables in the Vercel dashboard.

3. **Deploy**:
   Vercel will automatically build and deploy your project.

---

## **Contributing**

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Screenshots**

### **Home Page**
![Home Page](public/screenshots/home.png)

### **Cart**
![Cart](public/screenshots/cart.png)

### **Checkout**
![Checkout](public/screenshots/checkout.png)

---

## **Contact**

For any inquiries or support, please contact us at:
- **Email**: support@nexastore.com
- **Twitter**: [@NexaStore](https://twitter.com/NexaStore)

---