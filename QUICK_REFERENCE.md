# VaidLink - Quick Reference

## 🚀 Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 📍 Project Locations

```
/Users/satyamtiwari/Desktop/vaidlink/
├── src/app/patient/          # Patient dashboard
├── src/app/doctor/           # Doctor dashboard
├── src/app/admin/            # Admin dashboard
├── src/lib/supabase/         # Supabase config
├── src/hooks/                # React hooks
├── src/components/           # React components
├── .env.local                # Configuration (edit this!)
├── README.md                 # Full documentation
├── GETTING_STARTED.md        # Quick start guide
├── PROJECT_SUMMARY.md        # Feature overview
└── package.json              # Dependencies
```

## 🌐 URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Home Page |
| http://localhost:3000/patient | Patient Dashboard |
| http://localhost:3000/doctor | Doctor Dashboard |
| http://localhost:3000/admin | Admin Dashboard |

## ⚙️ Configuration

### Supabase Setup
1. Go to https://app.supabase.com
2. Create new project
3. Get URL and Anon Key from Settings → API
4. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

### Add Components
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add dialog
```

## 📦 Installed

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ shadcn/ui
- ✅ Supabase Client
- ✅ ESLint

## 📚 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **Package Manager**: npm

## 🔗 External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page |
| `src/app/patient/page.tsx` | Patient dashboard |
| `src/app/doctor/page.tsx` | Doctor dashboard |
| `src/app/admin/page.tsx` | Admin dashboard |
| `src/lib/supabase/client.ts` | Supabase client |
| `src/hooks/useAuth.ts` | Auth hook |
| `src/lib/supabase/auth.ts` | Auth functions |
| `.env.local` | Environment variables |
| `package.json` | Dependencies |

## 💻 System Info

- **Created**: March 16, 2026
- **Location**: /Users/satyamtiwari/Desktop/vaidlink
- **Build Status**: ✅ Success
- **Node.js**: Compatible with LTS versions
- **Package Manager**: npm

---

**Need Help?**
- See `GETTING_STARTED.md` for detailed setup
- See `README.md` for full documentation
- See `PROJECT_SUMMARY.md` for feature overview
