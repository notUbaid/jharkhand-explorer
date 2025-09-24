# Deployment Guide for Jharkhand Explorer

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] All linting errors fixed
- [x] TypeScript compilation successful
- [x] Build process optimized
- [x] Error boundaries implemented
- [x] Environment variables configured

### ✅ Features Implemented
- [x] Cart and payment system
- [x] Razorpay integration
- [x] Order management
- [x] Responsive design
- [x] Error handling

## Environment Setup

### 1. Environment Variables
Create a `.env` file in your project root:

```bash
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
VITE_RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
```

### 2. Razorpay Setup
1. Sign up at [https://razorpay.com/](https://razorpay.com/)
2. Get your API keys from the dashboard
3. For production, use live keys (rzp_live_*)
4. For development, use test keys (rzp_test_*)

## Build Process

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm i -g gh-pages

# Deploy
npm run build
gh-pages -d dist
```

### 4. Traditional Web Hosting
1. Run `npm run build`
2. Upload the `dist` folder contents to your web server
3. Configure your server to serve the `index.html` for all routes

## Production Configuration

### Environment Variables for Production
Set these in your hosting platform:

```bash
VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key_id
VITE_RAZORPAY_KEY_SECRET=your_live_secret_key
```

### Security Considerations
- Never expose secret keys in client-side code
- Use HTTPS in production
- Implement proper CORS policies
- Set up proper CSP headers

## Performance Optimization

### Build Optimizations Applied
- Code splitting for vendor libraries
- Terser minification
- Asset optimization
- Chunk size optimization

### Runtime Optimizations
- Lazy loading for images
- Error boundaries for better UX
- Local storage for cart persistence
- Optimized bundle splitting

## Monitoring and Analytics

### Error Tracking
- Error boundaries implemented
- Console error logging
- Consider adding Sentry for production monitoring

### Performance Monitoring
- Bundle size analysis
- Core Web Vitals monitoring
- Consider adding Google Analytics

## Testing

### Manual Testing Checklist
- [ ] Cart functionality works
- [ ] Payment integration works
- [ ] Order history displays correctly
- [ ] Responsive design on mobile
- [ ] Error handling works
- [ ] Navigation works correctly

### Test Payment Integration
Use Razorpay test cards:
- Success: 4111 1111 1111 1111
- Failure: 4000 0000 0000 0002
- CVV: Any 3 digits
- Expiry: Any future date

## Troubleshooting

### Common Issues
1. **Build fails**: Check for TypeScript errors
2. **Payment not working**: Verify Razorpay keys
3. **Images not loading**: Check asset paths
4. **Routing issues**: Ensure SPA configuration

### Support
- Check console for errors
- Verify environment variables
- Test in different browsers
- Check network requests

## Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor security vulnerabilities
- Update Razorpay integration as needed
- Test payment flows regularly

### Backup Strategy
- Regular database backups (if using backend)
- Version control for code
- Environment variable backups
- SSL certificate monitoring
