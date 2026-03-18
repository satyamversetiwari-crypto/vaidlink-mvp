'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { CalendarDays, Users, FileText, TrendingUp } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DoctorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }
      
      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#faf7f2' }}>
        <div style={{ fontSize: '18px', color: '#214a3a' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf7f2' }}>
      {/* NAVBAR */}
      <div style={{
        width: '100%',
        height: '60px',
        backgroundColor: '#214a3a',
        padding: '0 32px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        {/* Left: Logo */}
        <img 
          src="/vaidlink-logo.dark.svg" 
          alt="Vaidlink Logo" 
          style={{ height: '70px', width: 'auto' }}
        />

        {/* Center: Portal Title */}
        <div style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '13px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: '500'
        }}>
          Doctor Portal
        </div>

        {/* Right: User Email + Sign Out */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ color: 'white', fontSize: '13px' }}>
            {user?.email}
          </div>
          <button
            onClick={handleSignOut}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'transparent',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        backgroundColor: '#faf7f2',
        minHeight: 'calc(100vh - 60px)',
        padding: '32px',
        boxSizing: 'border-box'
      }}>
        {/* STAT CARDS - 4 Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Today's Appointments */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(33, 74, 58, 0.12)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '12px', color: '#6a7868', marginBottom: '8px', fontWeight: '500' }}>
              Today's Appointments
            </div>
            <div style={{ fontSize: '32px', color: '#214a3a', fontWeight: 'bold', fontFamily: 'DM Serif Display, serif', marginBottom: '4px' }}>
              0
            </div>
            <div style={{ fontSize: '11px', color: '#6a7868' }}>
              No appointments yet
            </div>
          </div>

          {/* Card 2: Total Patients */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(33, 74, 58, 0.12)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '12px', color: '#6a7868', marginBottom: '8px', fontWeight: '500' }}>
              Total Patients
            </div>
            <div style={{ fontSize: '32px', color: '#214a3a', fontWeight: 'bold', fontFamily: 'DM Serif Display, serif', marginBottom: '4px' }}>
              0
            </div>
            <div style={{ fontSize: '11px', color: '#6a7868' }}>
              All time
            </div>
          </div>

          {/* Card 3: Today's Patients */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(33, 74, 58, 0.12)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '12px', color: '#6a7868', marginBottom: '8px', fontWeight: '500' }}>
              Today's Patients
            </div>
            <div style={{ fontSize: '32px', color: '#214a3a', fontWeight: 'bold', fontFamily: 'DM Serif Display, serif', marginBottom: '4px' }}>
              0
            </div>
            <div style={{ fontSize: '11px', color: '#6a7868' }}>
              No patients scheduled
            </div>
          </div>

          {/* Card 4: Month's Earnings */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(33, 74, 58, 0.12)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '12px', color: '#6a7868', marginBottom: '8px', fontWeight: '500' }}>
              Month's Earnings
            </div>
            <div style={{ fontSize: '32px', color: '#214a3a', fontWeight: 'bold', fontFamily: 'DM Serif Display, serif', marginBottom: '4px' }}>
              ₹0
            </div>
            <div style={{ fontSize: '11px', color: '#6a7868' }}>
              Goes live after approval
            </div>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '20px'
        }}>
          {/* LEFT: Profile Setup Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(33, 74, 58, 0.12)'
          }}>
            <div style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: '20px',
              color: '#214a3a',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Complete Your Profile
            </div>
            <div style={{
              fontSize: '13px',
              color: '#6a7868',
              marginBottom: '24px'
            }}>
              Your profile needs to be verified before patients can book appointments.
            </div>

            {/* Setup Steps */}
            <div>
              {/* Step 1 */}
              <div style={{
                padding: '12px 0',
                borderBottom: '1px solid rgba(33, 74, 58, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#214a3a',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#214a3a', fontWeight: '600' }}>
                    Basic Information
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fff4e0',
                  color: '#ff9700',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  Pending
                </div>
              </div>

              {/* Step 2 */}
              <div style={{
                padding: '12px 0',
                borderBottom: '1px solid rgba(33, 74, 58, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#214a3a',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#214a3a', fontWeight: '600' }}>
                    Documents & Verification
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fff4e0',
                  color: '#ff9700',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  Pending
                </div>
              </div>

              {/* Step 3 */}
              <div style={{
                padding: '12px 0',
                borderBottom: '1px solid rgba(33, 74, 58, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#214a3a',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#214a3a', fontWeight: '600' }}>
                    Availability & Slots
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fff4e0',
                  color: '#ff9700',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  Pending
                </div>
              </div>

              {/* Step 4 */}
              <div style={{
                padding: '12px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#d3d3d3',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#214a3a', fontWeight: '600' }}>
                    Go Live
                  </div>
                </div>
                <div style={{
                  backgroundColor: 'rgba(33, 74, 58, 0.1)',
                  color: '#214a3a',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  Locked
                </div>
              </div>
            </div>

            {/* Setup Button */}
            <button
              style={{
                width: '100%',
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: '#214a3a',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#152e25'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#214a3a'
              }}
            >
              Start Profile Setup →
            </button>
          </div>

          {/* RIGHT: Quick Actions Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(33, 74, 58, 0.12)'
          }}>
            <div style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: '20px',
              color: '#214a3a',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Quick Actions
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Button 1 */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  borderLeft: '3px solid #214a3a',
                  backgroundColor: '#f3f9f6',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#214a3a',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8f3ed'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f9f6'
                }}
              >
                <CalendarDays size={16} /> Today's Schedule
              </button>

              {/* Button 2 */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  borderLeft: '3px solid #214a3a',
                  backgroundColor: '#f3f9f6',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#214a3a',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8f3ed'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f9f6'
                }}
              >
                <Users size={16} /> My Patients
              </button>

              {/* Button 3 */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  borderLeft: '3px solid #214a3a',
                  backgroundColor: '#f3f9f6',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#214a3a',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8f3ed'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f9f6'
                }}
              >
                <FileText size={16} /> New Prescription
              </button>

              {/* Button 4 */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  borderLeft: '3px solid #214a3a',
                  backgroundColor: '#f3f9f6',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#214a3a',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8f3ed'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f9f6'
                }}
              >
                <TrendingUp size={16} /> Earnings & Payouts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

