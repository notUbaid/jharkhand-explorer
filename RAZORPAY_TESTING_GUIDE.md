# Razorpay Payment Testing Guide

## ✅ **Razorpay Configuration Complete**

Your Razorpay integration is now configured with:
- **Key ID**: `rzp_test_RLUAMPaeE93MzD`
- **Key Secret**: `uJyWNmb704GUA2Hx1ahqYKyf`
- **Mode**: Test Mode (Safe for testing)

## 🧪 **How to Test Payment**

### **Step 1: Add Items to Cart**
1. Go to **Marketplace** page
2. Click **"Add"** on any product
3. Navigate to **Cart** (bottom navigation)
4. Adjust quantities if needed

### **Step 2: Proceed to Checkout**
1. Click **"Proceed to Checkout"** button
2. Fill in customer details (pre-filled with test data)
3. Verify payment amount

### **Step 3: Test Payment**
1. Click **"Pay ₹[amount]"** button
2. Razorpay payment modal will open
3. Use test card details below

## 💳 **Test Card Details**

### **✅ Successful Payment**
- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name (e.g., `Test User`)

### **❌ Failed Payment**
- **Card Number**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **Name**: Any name

## 🔍 **Testing Checklist**

### **Payment Flow**
- [ ] Cart items display correctly
- [ ] Checkout form loads with test data
- [ ] Payment button shows "Payment system ready"
- [ ] Razorpay modal opens
- [ ] Test payment succeeds
- [ ] Order is saved to localStorage
- [ ] Redirect to orders page
- [ ] Cart is cleared after payment

### **Error Handling**
- [ ] Invalid card details show error
- [ ] Payment cancellation works
- [ ] Network errors are handled
- [ ] Form validation works

## 🛠️ **Debugging**

### **Check Console Logs**
Open browser DevTools (F12) and look for:
- `Razorpay script loaded successfully`
- `Creating payment for amount: [amount]`
- `Razorpay options: [object]`
- `Payment successful: [response]`

### **Common Issues**
1. **"Razorpay not loaded"**: Refresh the page
2. **Payment modal doesn't open**: Check console for errors
3. **Amount mismatch**: Verify cart total calculation

## 📱 **Mobile Testing**
- Test on mobile devices
- Verify responsive design
- Check touch interactions

## 🚀 **Production Deployment**

### **For Production**
1. Replace test keys with live keys:
   - Get live keys from Razorpay dashboard
   - Update environment variables
   - Test with real cards (small amounts)

### **Environment Variables**
Create `.env` file:
```bash
VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key_id
VITE_RAZORPAY_KEY_SECRET=your_live_secret_key
```

## 📊 **Order Management**

### **View Orders**
- Go to **Orders** page
- View order history
- Check order details
- Verify payment information

### **Order Data**
Orders are saved to localStorage with:
- Order ID
- Payment ID
- Customer details
- Items purchased
- Total amount
- Status (paid/pending)

## 🎯 **Success Indicators**

✅ **Payment Working When**:
- Razorpay modal opens
- Test payment succeeds
- Order appears in orders page
- Cart is cleared
- No console errors

## 🔧 **Troubleshooting**

### **If Payment Fails**
1. Check browser console for errors
2. Verify Razorpay keys are correct
3. Ensure internet connection
4. Try different test card
5. Refresh page and retry

### **If Modal Doesn't Open**
1. Check if Razorpay script loaded
2. Verify button is not disabled
3. Check form validation
4. Look for JavaScript errors

## 📞 **Support**

If you encounter issues:
1. Check console logs
2. Verify Razorpay dashboard settings
3. Test with different browsers
4. Check network connectivity

---

**Your payment system is now ready for testing!** 🎉
