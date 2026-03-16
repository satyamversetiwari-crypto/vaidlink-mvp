# VaidLink - Healthcare Management Platform

A comprehensive Next.js 14 healthcare management platform built with modern technologies and best practices.

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Backend**: Supabase
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/
│   ├── patient/                 # Patient dashboard routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── doctor/                  # Doctor dashboard routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── admin/                   # Admin dashboard routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── shared/                  # Shared components
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Supabase client configuration
│   │   └── auth.ts              # Authentication utilities
│   └── utils.ts                 # Utility functions
├── hooks/
│   └── useAuth.ts               # Authentication hook
└── types/
    └── supabase.ts              # Supabase types
```

## ��️ Setup Instructions

### 1. Install Dependencies

Dependencies are already installed. If needed, run:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file based on `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings:
- Go to https://app.supabase.com
- Select your project
- Navigate to Settings → API
- Copy the URL and anon key

### 3. Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Dashboard Routes

- **Home**: `http://localhost:3000`
- **Patient Dashboard**: `http://localhost:3000/patient`
- **Doctor Dashboard**: `http://localhost:3000/doctor`
- **Admin Dashboard**: `http://localhost:3000/admin`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

The project includes authentication utilities for Supabase:

### Using the Auth Hook

```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'

export function MyComponent() {
  const { user, loading, error } = useAuth()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>Welcome {user?.email}</div>
}
```

### Using Auth Functions

```typescript
import { signIn, signUp, signOut } from '@/lib/supabase/auth'

// Sign up
const { data, error } = await signUp('email@example.com', 'password')

// Sign in
const { data, error } = await signIn('email@example.com', 'password')

// Sign out
const { error } = await signOut()
```

## 🎨 Using shadcn/ui

Add components from shadcn/ui:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# See https://ui.shadcn.com for more components
```

Use components in your code:

```typescript
import { Button } from '@/components/ui/button'

export function MyComponent() {
  return <Button>Click me</Button>
}
```

## 🗄️ Database Setup (Supabase)

To set up your database:

1. Create a new Supabase project at https://app.supabase.com
2. In the SQL Editor, create tables for:
   - Users
   - Doctors
   - Patients
   - Appointments
   - Medical Records

3. Enable authentication in Supabase dashboard

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
