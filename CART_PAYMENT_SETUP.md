# Cart and Payment System Setup

## Razorpay Integration

To complete the payment integration, you need to:

1. **Get Razorpay API Keys:**
   - Sign up at [https://razorpay.com/](https://razorpay.com/)
   - Go to your Razorpay dashboard
   - Navigate to Settings > API Keys
   - Copy your Key ID and Key Secret

2. **Configure Environment Variables:**
   Create a `.env` file in your project root with:
   ```
   VITE_RAZORPAY_KEY_ID=your_key_id_here
   VITE_RAZORPAY_KEY_SECRET=your_secret_key_here
   ```

3. **Update Razorpay Configuration:**
   - Replace the placeholder values in `src/lib/razorpay.ts` with your actual keys
   - For production, use live keys instead of test keys

## Features Implemented

✅ **Cart Management:**
- Add/remove items from cart
- Update quantities
- Persistent cart storage (localStorage)
- Cart item count display

✅ **Payment Integration:**
- Razorpay payment gateway integration
- Secure payment processing
- Order management system
- Payment success/failure handling

✅ **User Interface:**
- Cart icon with item count in navigation
- Checkout page with customer details form
- Order history page
- Responsive design

✅ **Order Management:**
- Order creation and storage
- Order status tracking
- Customer information management
- Shipping address handling

## Usage

1. **Adding to Cart:**
   - Browse products in the marketplace
   - Click "Add to Cart" button
   - Items are added with quantity management

2. **Checkout Process:**
   - Click the cart icon in bottom navigation
   - Fill in customer details and shipping address
   - Click "Pay" to proceed with Razorpay payment
   - Complete payment through Razorpay's secure interface

3. **Viewing Orders:**
   - Access order history through the profile section
   - View order details, status, and tracking information

## Security Notes

- Payment processing is handled securely by Razorpay
- Customer data is stored locally (consider backend integration for production)
- All sensitive operations use Razorpay's secure APIs
- Environment variables should be kept secure and not committed to version control
