# Deployment Guide

## 🚀 How to Deploy with Environment Variables

### **Netlify Deployment (Current Setup)**

Your project is configured for Netlify deployment. Here's how it works:

#### **1. Automatic Deployment**

- Push to your main branch
- Netlify automatically runs `npm run build`
- Environment variables are set in Netlify Dashboard (NOT in netlify.toml)

#### **2. Setting Environment Variables in Netlify Dashboard**

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:
    ```
    NODE_ENV = production
    NG_APP_API_BASE_URL = https://abapai-api.vercel.app
    ```

#### **3. Build Process**

```
1. Netlify runs: npm run build
2. prebuild script executes: node scripts/generate-env.js production
3. Script reads environment variables from Netlify platform
4. Generates: environment.production.ts
5. Angular builds with production configuration
6. Deploys: dist/abapai-website/browser/
```

### **Other Deployment Platforms**

#### **Vercel**

```bash
# vercel.json
{
  "buildCommand": "npm run build"
}
# Set environment variables in Vercel dashboard:
# NODE_ENV = production
# NG_APP_API_BASE_URL = https://abapai-api.vercel.app
```

#### **GitHub Actions**

```yaml
- name: Build
  run: npm run build
  env:
      NODE_ENV: production
      NG_APP_API_BASE_URL: ${{ secrets.PRODUCTION_API_URL }}
```

#### **Manual Deployment**

```bash
# 1. Set environment variables
export NODE_ENV=production
export NG_APP_API_BASE_URL=https://abapai-api.vercel.app

# 2. Build
npm run build

# 3. Deploy dist/abapai-website/browser/ folder
```

### **Environment Variable Priority**

The script checks environment variables in this order:

1. **Platform environment variables** (Netlify, Vercel, etc.) - **SECURE**
2. **Local .env.production file** - **SECURE** (not committed)
3. **Default values** - **SECURE** (fallback)

### **🔒 Security Notes**

- ✅ **No URLs in source code** - All URLs come from environment variables
- ✅ **No URLs in netlify.toml** - Configuration file is clean
- ✅ **Platform-specific variables** - Set in deployment platform dashboard
- ✅ **Local files ignored** - .env files not committed to git

### **Debugging Deployment**

If deployment fails, check the build logs for:

```
Generated src/app/shared/environments/environment.production.ts with environment variables
API URL: https://abapai-api.vercel.app
Environment: production
```

This confirms the environment variables are being read correctly.
