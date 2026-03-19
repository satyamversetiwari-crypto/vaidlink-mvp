'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Shield, Zap, Eye, EyeOff } from 'lucide-react'

function LoginContent() {
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [forgotMode, setForgotMode] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const isRegistered = searchParams.get('registered') === 'true'

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
    
    const { data, error } = await createClient().auth.signInWithPassword({
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', fontFamily: "'Figtree', sans-serif" }}>
      <style>{`
        .login-page * { font-family: 'Figtree', sans-serif; }
        .display-text { font-family: 'Cormorant Garamond', serif; }
        #signin-btn {
          background-color: #214a3a !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 10px !important;
          padding: 14px !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        #signin-btn:hover:not(:disabled) {
          background-color: #1a3a2d !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(33, 74, 58, 0.15) !important;
        }
        #signin-btn:disabled {
          opacity: 0.55 !important;
          cursor: not-allowed !important;
        }
      `}</style>
      {/* LEFT PANEL */}
      <div style={{
        background: '#152e25',
        backgroundImage: `
          radial-gradient(ellipse at 0% 0%, rgba(255,151,0,0.07) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.4) 0%, transparent 60%)
        `,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '52px 56px',
        minHeight: '100vh',
        overflow: 'hidden'
      } as React.CSSProperties}>
        {/* SECTION 1 - TOP, LOGO ONLY */}
        <div style={{ flexShrink: 0 }}>
          <img 
            src="/vaidlink-logo.dark.svg" 
            alt="Vaidlink Logo" 
            style={{ 
              height: '44px',
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
          paddingBottom: '0'
        }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '38px',
            fontWeight: '300',
            color: '#e8f0e8',
            lineHeight: '1.05',
            letterSpacing: '-1.5px',
            marginBottom: '20px'
          }}>
            Healthcare that comes{' '}
            <span style={{ 
              fontStyle: 'italic', 
              color: '#ff9700',
              fontWeight: '300'
            }}>
              to you.
            </span>
          </h1>

          <p style={{ 
            color: 'rgba(255,255,255,0.55)', 
            fontSize: '15px', 
            lineHeight: '1.6', 
            maxWidth: '380px',
            marginBottom: '24px',
            fontWeight: '400',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap'
          }}>
            Verified doctors. Digital prescriptions. WhatsApp reports.
          </p>

          {/* TRUST POINTS */}
          <div>
            {/* Trust Point 1 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <CheckCircle size={14} color="#ff9700" />
              </div>
              <div>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Verified Doctors</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '12px' }}>Every doctor MCI verified</div>
              </div>
            </div>

            {/* Trust Point 2 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Shield size={14} color="#ff9700" />
              </div>
              <div>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Your Data is Safe</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '12px' }}>Encrypted & private always</div>
              </div>
            </div>

            {/* Trust Point 3 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Zap size={14} color="#ff9700" />
              </div>
              <div>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>Instant Confirmations</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '12px' }}>WhatsApp updates on every step</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 - BOTTOM, COPYRIGHT */}
        <div style={{ 
          flexShrink: 0,
          fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.05em'
        }}>
          © 2025 Vaidlink
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        flex: 1,
        background: '#faf7f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '48px 56px'
      }}>
        {/* FORM CONTENT */}
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* CARD HEADING */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ 
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '34px',
              fontWeight: '400',
              color: '#214a3a',
              letterSpacing: '-0.5px',
              lineHeight: '1.1',
              display: 'block',
              marginBottom: '6px'
            }}>
              Your health,{' '}
              <span style={{ 
                fontStyle: 'italic', 
                color: '#ff9700',
                fontWeight: '300'
              }}>
                simplified.
              </span>
            </span>
            <p style={{ fontSize: '13px', color: '#6a7868', marginBottom: '0' }}>
              Good to see you.
            </p>
          </div>

          {/* TAB SWITCHER */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#f2ede2',
            borderRadius: '11px',
            padding: '4px',
            marginBottom: '28px',
            border: '0.5px solid rgba(33,74,58,0.1)'
          }}>
            <button
              onClick={() => {
                setActiveTab('patient')
                setOtpSent(false)
                setOtp('')
              }}
              style={{
                background: activeTab === 'patient' ? '#214a3a' : 'transparent',
                color: activeTab === 'patient' ? 'white' : '#214a3a',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '13px',
                fontWeight: activeTab === 'patient' ? '600' : '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Patient
            </button>
            <button
              onClick={() => setActiveTab('doctor')}
              style={{
                background: activeTab === 'doctor' ? '#214a3a' : 'transparent',
                color: activeTab === 'doctor' ? 'white' : '#214a3a',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '13px',
                fontWeight: activeTab === 'doctor' ? '600' : '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Doctor / Admin
            </button>
          </div>

          {/* FORM CONTENT */}
          {activeTab === 'patient' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.01em',
                  marginBottom: '6px'
                }}>
                  Mobile number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={otpSent}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '9px',
                    border: '1.5px solid rgba(33, 74, 58, 0.15)',
                    background: '#faf7f2',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    fontFamily: "'Figtree', sans-serif",
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#214a3a'
                    e.target.style.background = 'white'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(33, 74, 58, 0.15)'
                    e.target.style.background = '#faf7f2'
                  }}
                />
              </div>

              {!otpSent && (
                <button
                  onClick={handleSendOTP}
                  disabled={loading || !phoneNumber.trim()}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#214a3a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Figtree, sans-serif',
                    opacity: (loading || !phoneNumber.trim()) ? 0.55 : 1,
                    transition: 'opacity 0.2s'
                  }}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              )}

              {otpSent && (
                <>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#214a3a',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '6px'
                    }}>
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '9px',
                        border: '1.5px solid rgba(33, 74, 58, 0.15)',
                        background: '#faf7f2',
                        fontSize: '14px',
                        color: '#141c14',
                        outline: 'none',
                        fontFamily: "'Figtree', sans-serif",
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#214a3a'
                        e.target.style.background = 'white'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(33, 74, 58, 0.15)'
                        e.target.style.background = '#faf7f2'
                      }}
                    />
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6 || loading}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: '#214a3a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Figtree, sans-serif',
                      opacity: (otp.length !== 6 || loading) ? 0.55 : 1,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    Verify & Login
                  </button>
                  <button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp('')
                    }}
                    style={{
                      width: '100%',
                      fontSize: '12px',
                      color: '#214a3a',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      textDecoration: 'underline'
                    }}
                  >
                    Change mobile number
                  </button>
                </>
              )}

              <p style={{ fontSize: '12px', color: '#9aaa94', textAlign: 'center', marginTop: '16px', lineHeight: '1.6' }}>
                New patient? Your profile will be set up after login.
              </p>
            </div>
          )}

          {activeTab === 'doctor' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isRegistered && (
                <div style={{
                  background: '#214a3a',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: '#ffffff',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: '500',
                  letterSpacing: '0.01em'
                }}>
                  <span style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%',
                    width: '20px', 
                    height: '20px',
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    flexShrink: 0
                  }}>✓</span>
                  <span>Account created successfully. Please sign in.</span>
                </div>
              )}

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '9px',
                    border: '1.5px solid rgba(33, 74, 58, 0.15)',
                    background: '#faf7f2',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    fontFamily: "'Figtree', sans-serif",
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#214a3a'
                    e.target.style.background = 'white'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(33, 74, 58, 0.15)'
                    e.target.style.background = '#faf7f2'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '9px',
                      border: '1.5px solid rgba(33, 74, 58, 0.15)',
                      background: '#faf7f2',
                      fontSize: '14px',
                      color: '#141c14',
                      outline: 'none',
                      fontFamily: "'Figtree', sans-serif",
                      boxSizing: 'border-box',
                      paddingRight: '40px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#214a3a'
                      e.target.style.background = 'white'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(33, 74, 58, 0.15)'
                      e.target.style.background = '#faf7f2'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#214a3a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => setForgotMode(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    color: '#7a8c78',
                    cursor: 'pointer',
                    fontFamily: 'Figtree, sans-serif',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(33,74,58,0.25)',
                    textUnderlineOffset: '2px',
                    padding: '0'
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {forgotMode && (
                <div style={{
                  background: '#fff',
                  border: '1.5px solid rgba(33,74,58,0.15)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 20px rgba(33,74,58,0.1)'
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#7a8c78',
                    marginBottom: '12px',
                    lineHeight: '1.5'
                  }}>
                    Enter your email to receive a reset link.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    id="reset-email-input"
                    style={{
                      width: '100%',
                      padding: '11px 13px',
                      border: '1.5px solid rgba(33,74,58,0.15)',
                      borderRadius: '8px',
                      background: '#faf7f2',
                      fontFamily: 'Figtree, sans-serif',
                      fontSize: '13px',
                      color: '#141c14',
                      outline: 'none',
                      marginBottom: '10px',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#214a3a'
                      e.target.style.background = 'white'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(33,74,58,0.15)'
                      e.target.style.background = '#faf7f2'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={async () => {
                        const emailEl = document.getElementById('reset-email-input') as HTMLInputElement
                        if (!emailEl?.value) return
                        const supabase = createClient()
                        await supabase.auth.resetPasswordForEmail(emailEl.value, {
                          redirectTo: window.location.origin + '/doctor/reset-password'
                        })
                        setForgotMode(false)
                        alert('Reset link sent. Check your email.')
                      }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#214a3a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: 'Figtree, sans-serif'
                      }}
                    >
                      Send Link
                    </button>
                    <button
                      onClick={() => setForgotMode(false)}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: 'transparent',
                        color: '#7a8c78',
                        border: '1px solid rgba(33,74,58,0.15)',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontFamily: 'Figtree, sans-serif'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <button
                id="signin-btn"
                onClick={handleDoctorLogin}
                disabled={!email.trim() || !password.trim() || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#214a3a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'Figtree, sans-serif',
                  opacity: (!email.trim() || !password.trim() || loading) ? 0.55 : 1,
                  transition: 'opacity 0.2s'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              {authError && (
                <p style={{ color: '#d32f2f', fontSize: '13px', marginTop: '8px' }}>
                  {authError}
                </p>
              )}

              <p style={{ 
                fontSize: '13px', 
                color: '#7a8c78', 
                textAlign: 'center', 
                marginTop: '20px',
                lineHeight: '1.6'
              }}>
                New doctor?{' '}
                <a 
                  href="/doctor/register" 
                  style={{ 
                    color: '#214a3a', 
                    fontWeight: '600', 
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(33,74,58,0.3)',
                    textUnderlineOffset: '3px'
                  }}
                >
                  Register your account today
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        background: '#faf7f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Figtree, sans-serif',
        fontSize: '14px',
        color: '#7a8c78'
      }}>
        Loading...
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
