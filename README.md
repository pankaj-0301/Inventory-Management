# Mini Inventory Management System

A comprehensive inventory management system built for small-scale retail businesses with modern web technologies and AI-powered features.

## 🚀 Features

### Core Functionality
- **Dashboard**: Real-time overview with product counts, stock alerts, and inventory value
- **Product Management**: Complete CRUD operations for products with supplier associations
- **Supplier Management**: Manage supplier relationships and contact information  
- **Transaction Tracking**: Record purchases and sales with automatic stock updates
- **Low Stock Alerts**: Automated notifications when products reach threshold levels

### AI Integration
- **Smart Reorder Suggestions**: AI-powered recommendations using Google's Gemini API
- **Sales Pattern Analysis**: Intelligent analysis of transaction history
- **Inventory Optimization**: Data-driven suggestions for optimal stock levels

### Advanced Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time Updates**: Instant UI updates after data modifications
- **Transaction Reversal**: Ability to delete transactions with automatic stock adjustments
- **Inventory Reporting**: Comprehensive analytics and reporting capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication
- **date-fns** for date formatting

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **RESTful API** design

### AI & External Services
- **Google Gemini API** for AI-powered suggestions
- **MongoDB Atlas** for cloud database

## 📁 Project Structure

```
├── server/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   └── App.tsx         # Main app component
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-inventory-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The MongoDB connection and Gemini API key are already configured in the code:
   - MongoDB: `mongodb+srv://movieadda003:pass@cluster0.yvs1pu5.mongodb.net/invent`
   - Gemini API: `AIza................`

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the frontend (port 5173) and backend (port 5000) concurrently.

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Usage Guide

### Dashboard
- View real-time inventory statistics
- Monitor low stock alerts
- Track recent transactions
- See total inventory value

### Managing Products
1. Navigate to "Products" page
2. Click "Add Product" to create new items
3. Fill in product details including supplier association
4. Use "AI Suggest" for intelligent reorder recommendations
5. Edit or delete products as needed

### Managing Suppliers
1. Go to "Suppliers" page
2. Add supplier contact information
3. Associate suppliers with products for better organization

### Recording Transactions
1. Visit "Transactions" page
2. Click "Add Transaction"
3. Select product and transaction type (Purchase/Sale)
4. Enter quantity and price
5. Stock levels update automatically

### AI Reorder Suggestions
1. Click "AI Suggest" on any product card
2. View AI-generated recommendations based on:
   - Current stock levels
   - Sales history
   - Threshold settings
   - Market patterns
3. Apply suggestions to optimize inventory

## 🧠 AI Features Explained

The system uses Google's Gemini AI to provide intelligent inventory management:

- **Sales Analysis**: Analyzes transaction history to identify patterns
- **Demand Forecasting**: Predicts future inventory needs
- **Optimization**: Suggests optimal reorder quantities
- **Risk Assessment**: Identifies urgency levels for reordering

## 🔄 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/alerts/low-stock` - Get low stock products

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Create new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/alerts` - Get low stock alerts

### AI
- `POST /api/ai/reorder-suggestions` - Get AI reorder suggestions

## 🚀 Deployment

This application is designed for easy deployment on platforms like Vercel:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure environment variables if needed
   - Deploy with automatic builds

## 🔒 Security Features

- Input validation on all forms
- Error handling for API requests
- Safe database operations with Mongoose
- CORS configuration for secure cross-origin requests

## 🎨 Design Philosophy

- **Clean & Modern**: Minimalist design with focus on usability
- **Responsive**: Mobile-first approach ensuring great experience on all devices
- **Intuitive**: Clear navigation and logical information hierarchy
- **Professional**: Production-ready styling suitable for business use

## 🤝 Contributing

This project follows clean coding practices:
- Modular component structure
- TypeScript for type safety
- Consistent code formatting
- Clear documentation

## 📄 License

This project is built for educational and demonstration purposes.

---

**Built with ❤️ using modern web technologies and AI integration**
