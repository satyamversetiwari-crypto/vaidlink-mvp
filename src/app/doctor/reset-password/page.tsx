'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleUpdatePassword = async () => {
    setError('')

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login?reset=true')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', fontFamily: "'Figtree', sans-serif" }}>
      {/* LEFT PANEL */}
      <div style={{
        background: '#152e25',
        backgroundImage: `
          radial-gradient(ellipse at 0% 0%, rgba(255,151,0,0.07) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.4) 0%, transparent 60%)
        `,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '52px 56px',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '350px' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '-0.5px'
          }}>
            Vaidlink
          </div>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.6',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            Secure access to your healthcare platform
          </p>
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
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#214a3a',
              margin: '0 0 12px 0',
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '-0.5px'
            }}>
              Reset your password.
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#7a8c78',
              margin: '0',
              lineHeight: '1.6'
            }}>
              Enter your new password below
            </p>
          </div>

          {success ? (
            <div style={{
              background: '#214a3a',
              borderRadius: '10px',
              padding: '24px',
              textAlign: 'center',
              color: '#ffffff'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
              <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>Password updated successfully</p>
              <p style={{ fontSize: '13px', margin: '0', opacity: 0.8 }}>Redirecting to login...</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

              {error && (
                <p style={{ color: '#d32f2f', fontSize: '13px', margin: '0' }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleUpdatePassword}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#214a3a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Figtree, sans-serif',
                  opacity: loading ? 0.6 : 1,
                  transition: 'opacity 0.2s'
                }}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
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
