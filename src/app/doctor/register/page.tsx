'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, Shield, Zap, Eye, EyeOff } from 'lucide-react'

export default function DoctorRegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleRegister = async () => {
    setError('')
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    
    setLoading(true)
    
    const supabase = createClient()
    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }
    
    if (data.user) {
      await supabase.from('doctors').insert({
        id: data.user.id,
        email: email,
        status: 'pending',
        full_name: '',
      })
      router.push('/login?registered=true')
    }
    
    setLoading(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #reg-btn {
          background-color: #214a3a !important;
          color: white !important;
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: Figtree, sans-serif;
        }
        #reg-btn:disabled {
          opacity: 0.5;
        }
      `}} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', fontFamily: 'Figtree, sans-serif', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <style>{`
          .register-page * { font-family: 'Figtree', sans-serif; }
          .display-text { font-family: 'Cormorant Garamond', serif; }
        `}</style>

      {/* LEFT PANEL - FORM */}
      <div style={{
        background: '#faf7f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 56px',
        overflowY: 'auto'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '34px',
            fontWeight: '400',
            color: '#214a3a',
            letterSpacing: '-0.5px',
            marginBottom: '12px'
          }}>
            Create your{' '}
            <span style={{ 
              fontStyle: 'italic', 
              color: '#ff9700'
            }}>
              account.
            </span>
          </h2>

          <p style={{ 
            fontSize: '13px', 
            color: '#7a8c78', 
            marginBottom: '28px'
          }}>
            Already registered?{' '}
            <a 
              href="/login" 
              style={{ 
                color: '#214a3a', 
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Sign in as doctor
            </a>
          </p>

          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="reg-email" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#214a3a',
              marginBottom: '8px',
              letterSpacing: '0.02em'
            }}>
              Email address
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #e0dfd9',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: "'Figtree', sans-serif",
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#214a3a'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0dfd9'
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="reg-password" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#214a3a',
              marginBottom: '8px',
              letterSpacing: '0.02em'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="reg-password"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #e0dfd9',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: "'Figtree', sans-serif",
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  paddingRight: '44px'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#214a3a'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e0dfd9'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#7a8c78',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="reg-confirm" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#214a3a',
              marginBottom: '8px',
              letterSpacing: '0.02em'
            }}>
              Confirm password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="reg-confirm"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #e0dfd9',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: "'Figtree', sans-serif",
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  paddingRight: '44px'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#214a3a'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e0dfd9'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#7a8c78',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              color: '#c0392b',
              background: '#fde8e8',
              borderLeft: '2px solid #c0392b',
              padding: '10px 13px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            id="reg-btn"
            onClick={handleRegister}
            disabled={!email.trim() || !password.trim() || !confirmPassword.trim() || loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - BRAND */}
      <div style={{
        background: '#152e25',
        backgroundImage: `radial-gradient(ellipse at 100% 0%, rgba(255,151,0,0.07) 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.4) 0%, transparent 60%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '52px 56px',
        overflowY: 'auto'
      } as React.CSSProperties}>
        {/* SECTION 1 - TOP, LOGO RIGHT ALIGNED */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <img 
            src="/vaidlink-logo.dark.svg" 
            alt="Vaidlink Logo" 
            style={{ 
              height: '40px',
              width: 'auto',
              display: 'block'
            }}
          />
        </div>

        {/* SECTION 2 - MIDDLE, HEADLINE + SUBTEXT + TRUST POINTS */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '38px',
            fontWeight: '300',
            color: '#e8f0e8',
            lineHeight: '1.05',
            letterSpacing: '-1px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Your practice,{' '}
            <span style={{ 
              fontStyle: 'italic', 
              color: '#ff9700',
              fontWeight: '300'
            }}>
              digitised.
            </span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.42)',
            fontSize: '14px',
            fontWeight: '300',
            marginBottom: '36px',
            letterSpacing: '0.02em',
            textAlign: 'center',
            width: '100%',
            display: 'block'
          }}>
            Verified. Connected. Digital.
          </p>

          {/* TRUST POINTS */}
          <div>
            {/* Trust Point 1 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '2px', textAlign: 'center' }}>Apply in minutes</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.38)', fontSize: '12px', textAlign: 'center' }}>Simple 4-step verification</div>
              </div>
            </div>

            {/* Trust Point 2 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '2px', textAlign: 'center' }}>Go live in 24hrs</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.38)', fontSize: '12px', textAlign: 'center' }}>Fast approval process</div>
              </div>
            </div>

            {/* Trust Point 3 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '2px', textAlign: 'center' }}>Earn more</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.38)', fontSize: '12px', textAlign: 'center' }}>Earn on every digital prescription</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 - BOTTOM, COPYRIGHT RIGHT ALIGNED */}
        <div style={{ 
          flexShrink: 0,
          fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
          textAlign: 'right'
        }}>
          © 2025 Vaidlink
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
    #reg-btn {
      background-color: #214a3a !important;
      color: #ffffff !important;
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      font-family: Figtree, sans-serif;
      margin-top: 4px;
    }
    #reg-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}} />
      </div>
    </>
  )
}
