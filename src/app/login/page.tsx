'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const router = useRouter()

  const handleSendOTP = () => {
    // TODO: Implement OTP sending logic
    if (phoneNumber.trim()) {
      setOtpSent(true)
    }
  }

  const handleVerifyOTP = () => {
    // TODO: Implement OTP verification and login logic
    console.log('Verifying OTP:', otp)
  }

  const handleDoctorLogin = async () => {
    setLoading(true)
    setAuthError('')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    
    if (error) {
      setAuthError(error.message)
      setLoading(false)
      return
    }
    
    if (data.user) {
      if (data.user.email === 'admin@vaidlink.in') {
        router.push('/admin')
      } else {
        router.push('/doctor')
      }
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <Card className="w-full max-w-[420px] bg-white shadow-lg rounded-xl">
        {/* Logo and Tagline */}
        <div className="pt-8 px-6 text-center">
          <img 
            src="/vaidlink-logo.svg" 
            alt="Vaidlink Logo" 
            className="h-20 mx-auto mb-2"
          />
          <p className="text-sm text-ink-muted">The Healer's Bridge</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mt-8 px-6">
          <button
            onClick={() => {
              setActiveTab('patient')
              setOtpSent(false)
              setOtp('')
            }}
            className={`flex-1 py-3 px-4 text-center text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'patient'
                ? 'bg-forest text-white border-forest'
                : 'bg-forest-light text-forest border-transparent'
            }`}
          >
            Patient Login
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`flex-1 py-3 px-4 text-center text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'doctor'
                ? 'bg-forest text-white border-forest'
                : 'bg-forest-light text-forest border-transparent'
            }`}
          >
            Doctor / Admin Login
          </button>
        </div>

        <CardContent className="pt-6">
          {/* Patient Login Tab */}
          {activeTab === 'patient' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-ink">
                  Mobile Number
                </label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border-border focus-visible:ring-[#214a3a] focus-visible:border-[#214a3a]"
                  disabled={otpSent}
                />
              </div>

              {!otpSent && (
                <button
                  onClick={handleSendOTP}
                  className="w-full bg-[#214a3a] hover:bg-[#152e25] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!phoneNumber.trim()}
                >
                  Send OTP
                </button>
              )}

              {otpSent && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ink">
                      Enter OTP
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="border-border focus-visible:ring-[#214a3a] focus-visible:border-[#214a3a]"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={handleVerifyOTP}
                    className="w-full bg-[#214a3a] hover:bg-[#152e25] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={otp.length !== 6}
                  >
                    Verify & Login
                  </Button>
                  <button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp('')
                    }}
                    className="w-full text-xs text-forest hover:underline py-2"
                  >
                    Change mobile number
                  </button>
                </>
              )}

              <p className="text-xs text-ink-muted pt-2 border-t border-border">
                New patient? Your profile will be set up after login.
              </p>
            </div>
          )}

          {/* Doctor / Admin Login Tab */}
          {activeTab === 'doctor' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-ink">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-border focus-visible:ring-[#214a3a] focus-visible:border-[#214a3a]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ink">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border focus-visible:ring-[#214a3a] focus-visible:border-[#214a3a]"
                />
              </div>

              <Button
                onClick={handleDoctorLogin}
                className="w-full bg-[#214a3a] hover:bg-[#152e25] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!email.trim() || !password.trim() || loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              {authError && (
                <p style={{ color: 'red', fontSize: '13px', marginTop: '8px' }}>
                  {authError}
                </p>
              )}

              <p className="text-xs text-ink-muted pt-2 border-t border-border">
                New doctor? Contact us at{' '}
                <a
                  href="mailto:hello@vaidlink.in"
                  className="text-forest font-medium hover:underline"
                >
                  hello@vaidlink.in
                </a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
