# Vercel Domain Setup Guide

## Your New Domain: custom-cursors.tech

Based on your screenshots, I can see you already have the domain added to Vercel but it shows "Invalid Configuration". Here's how to fix it:

## Step 1: Configure DNS Records at Your Domain Provider (Namify/Get.tech)

You need to add DNS records at your domain registrar (where you bought custom-cursors.tech).

### Option A: Using Nameservers (Recommended - Easiest)

1. Go to your domain provider (Namify/Get.tech dashboard)
2. Find DNS settings for `custom-cursors.tech`
3. Change nameservers to Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

### Option B: Using A and CNAME Records (If you can't change nameservers)

Add these DNS records at your domain provider:

**For root domain (custom-cursors.tech):**
- Type: `A`
- Name: `@` (or leave blank)
- Value: `76.76.21.21`
- TTL: `3600` (or default)

**For www subdomain (www.custom-cursors.tech):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `3600` (or default)

## Step 2: In Vercel Dashboard

Based on your screenshot, you already have the domain added. Now:

1. Click **"Edit"** button next to `custom-cursors.tech`
2. Make sure it's set as the **Primary Domain** (Production)
3. Click **"Refresh"** to check DNS propagation
4. Wait 5-10 minutes for DNS to propagate

## Step 3: Remove Invalid Domains

I see you have two domains showing "Invalid Configuration":
- `custom-cursors.tech`
- `www.custom-cursors.tech`

**After configuring DNS properly:**
1. Click "Refresh" on both domains
2. They should turn green with "Valid Configuration"
3. If they don't work after 10 minutes, remove them and re-add them

## Step 4: SSL Certificate

Vercel automatically provisions SSL certificates. Once DNS is configured:
- Wait 5-10 minutes
- Vercel will automatically issue SSL certificate
- Your site will be accessible via HTTPS

## Step 5: Verify It's Working

After DNS propagates (5-60 minutes):
1. Visit `https://custom-cursors.tech`
2. Visit `https://www.custom-cursors.tech`
3. Both should show your site with HTTPS

## Common Issues & Solutions

### Issue: "Invalid Configuration" persists
**Solution:** 
- Double-check DNS records at your domain provider
- Wait longer (DNS can take up to 48 hours, usually 5-10 minutes)
- Try removing and re-adding the domain in Vercel

### Issue: DNS not propagating
**Solution:**
- Check DNS propagation: https://dnschecker.org
- Enter `custom-cursors.tech` and check if A record shows `76.76.21.21`

### Issue: SSL certificate not issued
**Solution:**
- Wait 10-15 minutes after DNS is configured
- Vercel auto-issues SSL, no action needed
- If it fails, remove domain and re-add it

## Quick Checklist

- [ ] Add DNS records at domain provider (Namify/Get.tech)
- [ ] Wait 5-10 minutes for DNS propagation
- [ ] Click "Refresh" in Vercel dashboard
- [ ] Verify "Valid Configuration" shows in Vercel
- [ ] Test `https://custom-cursors.tech` in browser
- [ ] Test `https://www.custom-cursors.tech` in browser
- [ ] Verify SSL certificate is active (padlock icon)

## Current Status

✅ Domain purchased: `custom-cursors.tech`
✅ Domain added to Vercel project
✅ Code updated with new domain
⏳ Waiting for: DNS configuration at domain provider
⏳ Waiting for: DNS propagation

## Next Steps

1. **Go to your domain provider** (Namify/Get.tech)
2. **Add the DNS records** (A record and CNAME)
3. **Wait 5-10 minutes**
4. **Click "Refresh"** in Vercel
5. **Done!** Your site will be live at custom-cursors.tech

## Need Help?

If you're stuck:
1. Check Vercel's domain docs: https://vercel.com/docs/projects/domains
2. Contact your domain provider support for DNS help
3. Use DNS checker: https://dnschecker.org

---

**Note:** The code is already updated with the new domain. Once DNS is configured, Vercel will automatically deploy to your custom domain!
