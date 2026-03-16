# Getting Started with VaidLink

## 🎯 Start Development

### Step 1: Navigate to Project
```bash
cd /Users/satyamtiwari/Desktop/vaidlink
```

### Step 2: Configure Environment Variables
1. Open `.env.local` file
2. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_from_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_from_supabase
   ```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit `http://localhost:3000` in your web browser

## 📍 Available Pages

### Home Page
`http://localhost:3000`
- Landing page with dashboard access buttons
- Overview of the platform

### Patient Dashboard
`http://localhost:3000/patient`
- Manage appointments
- View medical records
- Access prescriptions

### Doctor Dashboard
`http://localhost:3000/doctor`
- View today's appointments
- Access patient records
- Manage prescriptions

### Admin Dashboard
`http://localhost:3000/admin`
- System statistics
- User management
- Platform oversight

## 🔧 Development Workflow

### Add New Pages
Create new files in `src/app/[feature]/page.tsx`

### Add New Components
1. UI Components: `src/components/ui/`
2. Feature Components: `src/components/[feature]/`

### Add shadcn/ui Components
```bash
npx shadcn@latest add [component-name]
# Example:
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
```

### Build for Production
```bash
npm run build
npm start
```

### Run Linter
```bash
npm run lint
npm run lint -- --fix
```

## 🔐 Using Authentication

### Import useAuth Hook
```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function Component() {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  
  return <div>Hello {user?.email}</div>
}
```

### Use Auth Functions
```typescript
import { signIn, signUp, signOut } from '@/lib/supabase/auth'

// Sign up
await signUp('user@example.com', 'password')

// Sign in
await signIn('user@example.com', 'password')

// Sign out
await signOut()
```

## 📚 Useful Resources

- **Project Structure**: See `PROJECT_SUMMARY.md`
- **Full Documentation**: See `README.md`
- **TypeScript Setup**: Check `tsconfig.json`
- **Tailwind Config**: Check `tailwind.config.ts`
- **Components Config**: Check `components.json`

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Clear Cache and Rebuild
```bash
rm -rf .next
npm run build
```

### Update Dependencies
```bash
npm update
```

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

## 💡 Tips

1. **Use TypeScript**: Always add types to improve code quality
2. **Component Reusability**: Keep components in `src/components/`
3. **API Routes**: Create server functions in `src/app/api/`
4. **Environment Variables**: Use `NEXT_PUBLIC_` prefix for client-side vars
5. **Supabase**: Store table schemas and RLS policies in Supabase dashboard

## 📱 Testing Routes in Browser

| Route | Purpose | Status |
|-------|---------|--------|
| `http://localhost:3000` | Home | ✅ Active |
| `http://localhost:3000/patient` | Patient Dashboard | ✅ Active |
| `http://localhost:3000/doctor` | Doctor Dashboard | ✅ Active |
| `http://localhost:3000/admin` | Admin Dashboard | ✅ Active |

---

**Happy coding! 🚀**

For more help, refer to the official documentation:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- shadcn/ui: https://ui.shadcn.com
