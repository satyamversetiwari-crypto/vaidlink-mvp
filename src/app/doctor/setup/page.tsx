'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Upload, ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DoctorSetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    specialisation: '',
    yearsExperience: '',
    consultationFee: '',
    languages: [] as string[],
    clinicName: '',
    clinicAddress: '',
    city: '',
    consultationDuration: '',
    maxPatients: '1',
    mciNumber: '',
    mbbsCertificate: null as File | null,
    photoId: null as File | null,
  })

  const [mbbsFileName, setMbbsFileName] = useState('')
  const [photoIdFileName, setPhotoIdFileName] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUserEmail(user.email ?? '')
    }
    getUser()
  }, [router])

  const handleSubmit = async () => {
    // Validation: Check if all fields are filled
    const errors = []

    if (!formData.fullName.trim()) errors.push('Full name is required')
    if (!formData.specialisation) errors.push('Specialisation is required')
    if (!formData.yearsExperience) errors.push('Years of experience is required')
    if (!formData.consultationFee) errors.push('Consultation fee is required')
    if (formData.languages.length === 0) errors.push('Select at least one language')
    if (!formData.clinicName.trim()) errors.push('Clinic name is required')
    if (!formData.clinicAddress.trim()) errors.push('Clinic address is required')
    if (!formData.city) errors.push('City is required')
    if (!formData.consultationDuration) errors.push('Consultation duration is required')
    if (!formData.mciNumber.trim()) errors.push('MCI registration number is required')
    if (!formData.mbbsCertificate) errors.push('MBBS certificate is required')
    if (!formData.photoId) errors.push('Government photo ID is required')

    if (errors.length > 0) {
      alert('Please fill all required fields:\n\n' + errors.join('\n'))
      return
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    try {
      let mbbsUrl = ''
      let photoIdUrl = ''

      if (formData.mbbsCertificate) {
        const { data } = await supabase.storage
          .from('doctor-documents')
          .upload(
            user.id + '/mbbs-' + Date.now(),
            formData.mbbsCertificate
          )
        mbbsUrl = data?.path ?? ''
      }

      if (formData.photoId) {
        const { data } = await supabase.storage
          .from('doctor-documents')
          .upload(
            user.id + '/photoid-' + Date.now(),
            formData.photoId
          )
        photoIdUrl = data?.path ?? ''
      }

      await supabase.from('doctors').upsert({
        id: user.id,
        email: userEmail,
        full_name: formData.fullName,
        specialisation: formData.specialisation,
        clinic_name: formData.clinicName,
        clinic_address: formData.clinicAddress,
        city: formData.city,
        consultation_fee: parseInt(formData.consultationFee || '0'),
        slot_duration: parseInt(formData.consultationDuration || '2'),
        mci_number: formData.mciNumber,
        status: 'pending',
        profile_photo_url: '',
      })

      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting:', error)
      alert('Error submitting application. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#faf7f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#214a3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            fontSize: '28px',
            color: '#fff'
          }}>
            ✓
          </div>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '42px',
            fontWeight: '400',
            color: '#214a3a',
            textAlign: 'center',
            marginBottom: '16px',
            lineHeight: '1.1'
          }}>
            Application{' '}
            <em style={{ fontStyle: 'italic', color: '#ff9700' }}>received.</em>
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#7a8c78',
            textAlign: 'center',
            lineHeight: '1.7',
            maxWidth: '380px',
            margin: '0 auto 36px'
          }}>
            Our team will review your profile within 24 hours. You will receive a notification once approved.
          </p>

          <button
            onClick={() => router.push('/doctor')}
            style={{
              width: '100%',
              padding: '13px 32px',
              background: '#214a3a',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Figtree, sans-serif'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const specialisations = [
    'General Physician', 'Cardiologist', 'Dermatologist',
    'Orthopaedic', 'Gynaecologist', 'Paediatrician',
    'ENT Specialist', 'Neurologist', 'Diabetologist',
    'Ophthalmologist', 'Psychiatrist', 'Pulmonologist',
    'Gastroenterologist', 'Urologist', 'Other'
  ]

  const cities = [
    'Varanasi', 'Gorakhpur', 'Allahabad', 'Lucknow',
    'Patna', 'Muzaffarpur', 'Other'
  ]

  const languages = ['Hindi', 'English', 'Bhojpuri', 'Maithili', 'Awadhi']

  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'transparent',
        borderBottom: '0.5px solid rgba(33,74,58,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 100
      }}>
        <img src="/vaidlink-logo.light.svg" alt="Vaidlink Logo" style={{ 
          height: '75px', 
          width: 'auto',
          display: 'block',
          backgroundColor: 'transparent'
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          minWidth: '160px',
          gap: '6px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {['Basic Info', 'Clinic Details', 'Documents', 'Review'].map((label, i) => (
            <span key={i}>
              <span style={{
                color: currentStep === i + 1 ? '#214a3a' : currentStep > i + 1 ? '#214a3a' : '#9aaa94',
                fontWeight: currentStep === i + 1 ? '700' : '400',
                fontSize: currentStep === i + 1 ? '12px' : '11px'
              }}>
                {label}
              </span>
              {i < 3 && (
                <ChevronRight
                  size={12}
                  color={currentStep > i + 1 ? '#214a3a' : '#c5d0c2'}
                  style={{ display: 'inline-block', margin: '0 4px' }}
                />
              )}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => router.push('/doctor')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '12px',
              color: '#7a8c78',
              cursor: 'pointer',
              fontFamily: 'Figtree, sans-serif',
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(33,74,58,0.25)',
              textUnderlineOffset: '2px'
            }}
          >
            Save &amp; Exit
          </button>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#214a3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: '700',
            color: '#fff',
            fontFamily: 'Figtree, sans-serif'
          }}>
            {userEmail ? userEmail[0].toUpperCase() : 'D'}
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        background: 'transparent',
        padding: '16px 40px 0',
        borderBottom: '0.5px solid rgba(33,74,58,0.08)',
        zIndex: 99
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '4px',
          marginBottom: '12px'
        }}>
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              style={{
                height: '3px',
                borderRadius: '100px',
                background: currentStep > step ? '#214a3a' : currentStep === step ? '#ff9700' : 'rgba(33,74,58,0.12)'
              }}
            />
          ))}
        </div>

        <p style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#214a3a',
          paddingBottom: '12px'
        }}>
          Step {currentStep} of 4 —{' '}
          {['Basic Information', 'Clinic Details', 'Documents & Verification', 'Review & Submit'][currentStep - 1]}
        </p>
      </div>

      {/* CONTENT */}
      <div style={{
        paddingTop: '130px',
        paddingBottom: '80px',
        minHeight: '100vh',
        background: '#faf7f2',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '560px', padding: '0 20px' }}>

          {/* STEP 1 — BASIC INFORMATION */}
          {currentStep === 1 && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <h1 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '38px',
                  fontWeight: '400',
                  color: '#214a3a',
                  letterSpacing: '-1px',
                  lineHeight: '1.05',
                  marginBottom: '8px'
                }}>
                  Tell us about{' '}
                  <span style={{ fontStyle: 'italic', color: '#ff9700' }}>yourself.</span>
                </h1>
                <p style={{ fontSize: '13px', color: '#7a8c78', lineHeight: '1.6' }}>
                  This information will appear on your doctor profile.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                />
              </div>

              {/* Specialisation */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  Specialisation
                </label>
                <select
                  value={formData.specialisation}
                  onChange={(e) => setFormData({ ...formData, specialisation: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                >
                  <option value="">Select specialisation</option>
                  {specialisations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                />
              </div>

              {/* Consultation Fee */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  Consultation Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                />
              </div>

              {/* Languages */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}>
                  Languages Spoken
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {languages.map(lang => (
                    <label
                      key={lang}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        border: formData.languages.includes(lang) ? '1.5px solid #214a3a' : '1.5px solid rgba(33,130,101,0.25)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#214a3a',
                        fontWeight: '500',
                        background: formData.languages.includes(lang) ? '#e8f2ee' : '#fff',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, languages: [...formData.languages, lang] })
                          } else {
                            setFormData({ ...formData, languages: formData.languages.filter(l => l !== lang) })
                          }
                        }}
                        style={{ accentColor: '#214a3a', cursor: 'pointer' }}
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — CLINIC DETAILS */}
          {currentStep === 2 && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <h1 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '38px',
                  fontWeight: '400',
                  color: '#214a3a',
                  letterSpacing: '-1px',
                  lineHeight: '1.05',
                  marginBottom: '8px'
                }}>
                  Where do you{' '}
                  <span style={{ fontStyle: 'italic', color: '#ff9700' }}>practice?</span>
                </h1>
                <p style={{ fontSize: '13px', color: '#7a8c78', lineHeight: '1.6' }}>
                  Add your clinic information and availability.
                </p>
              </div>

              {/* Clinic Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  Clinic Name
                </label>
                <input
                  type="text"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                />
              </div>

              {/* Clinic Address */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  Clinic Address
                </label>
                <textarea
                  value={formData.clinicAddress}
                  onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box',
                    resize: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                />
              </div>

              {/* City */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  City
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Consultation Duration */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}>
                  Consultation Duration
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {['2 hours', '3 hours', '4 hours'].map(duration => (
                    <label
                      key={duration}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        border: formData.consultationDuration === duration ? '1.5px solid #214a3a' : '1.5px solid rgba(33,130,101,0.25)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#214a3a',
                        background: formData.consultationDuration === duration ? '#e8f2ee' : '#fff',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="radio"
                        name="duration"
                        checked={formData.consultationDuration === duration}
                        onChange={() => setFormData({ ...formData, consultationDuration: duration })}
                        style={{ accentColor: '#214a3a', cursor: 'pointer' }}
                      />
                      {duration}
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Patients per Slot */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  Max Patients per Slot
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.maxPatients}
                  onChange={(e) => setFormData({ ...formData, maxPatients: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                />
              </div>
            </div>
          )}

          {/* STEP 3 — DOCUMENTS */}
          {currentStep === 3 && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <h1 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '38px',
                  fontWeight: '400',
                  color: '#214a3a',
                  letterSpacing: '-1px',
                  lineHeight: '1.05',
                  marginBottom: '8px'
                }}>
                  Verify your{' '}
                  <span style={{ fontStyle: 'italic', color: '#ff9700' }}>credentials.</span>
                </h1>
                <p style={{ fontSize: '13px', color: '#7a8c78', lineHeight: '1.6' }}>
                  Upload your medical credentials for verification.
                </p>
              </div>

              {/* MCI Number */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '7px'
                }}>
                  MCI Registration Number
                </label>
                <input
                  type="text"
                  placeholder="MCI-XXXXXXXX"
                  value={formData.mciNumber}
                  onChange={(e) => setFormData({ ...formData, mciNumber: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    border: '1.5px solid rgba(33,130,101,0.25)',
                    borderRadius: '10px',
                    background: '#fff',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    color: '#141c14',
                    outline: 'none',
                    marginBottom: '28px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#214a3a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(33,130,101,0.25)'}
                />
              </div>

              {/* MBBS Certificate */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  MBBS Certificate
                </label>
                <div
                  onClick={() => document.getElementById('mbbs-input')?.click()}
                  style={{
                    border: '1.5px dashed rgba(33,130,101,0.3)',
                    borderRadius: '12px',
                    padding: '28px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#faf7f2',
                    marginBottom: '20px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#214a3a'
                    e.currentTarget.style.background = 'rgba(33, 74, 58, 0.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(33,130,101,0.3)'
                    e.currentTarget.style.background = '#faf7f2'
                  }}
                >
                  {mbbsFileName ? (
                    <p style={{ fontSize: '13px', color: '#214a3a', fontWeight: '600', margin: 0 }}>
                      ✓ {mbbsFileName}
                    </p>
                  ) : (
                    <>
                      <Upload size={20} color="#214a3a" style={{ margin: '0 auto 8px', display: 'block' }} />
                      <p style={{ fontSize: '13px', color: '#7a8c78', margin: '0 0 4px' }}>
                        Click to upload or drag and drop
                      </p>
                      <p style={{ fontSize: '11px', color: '#9aaa94', margin: 0 }}>
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="mbbs-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFormData({ ...formData, mbbsCertificate: e.target.files[0] })
                      setMbbsFileName(e.target.files[0].name)
                    }
                  }}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Photo ID */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#214a3a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  Government Photo ID
                </label>
                <div
                  onClick={() => document.getElementById('photoid-input')?.click()}
                  style={{
                    border: '1.5px dashed rgba(33,130,101,0.3)',
                    borderRadius: '12px',
                    padding: '28px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#faf7f2',
                    marginBottom: '20px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#214a3a'
                    e.currentTarget.style.background = 'rgba(33, 74, 58, 0.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(33,130,101,0.3)'
                    e.currentTarget.style.background = '#faf7f2'
                  }}
                >
                  {photoIdFileName ? (
                    <p style={{ fontSize: '13px', color: '#214a3a', fontWeight: '600', margin: 0 }}>
                      ✓ {photoIdFileName}
                    </p>
                  ) : (
                    <>
                      <Upload size={20} color="#214a3a" style={{ margin: '0 auto 8px', display: 'block' }} />
                      <p style={{ fontSize: '13px', color: '#7a8c78', margin: '0 0 4px' }}>
                        Click to upload or drag and drop
                      </p>
                      <p style={{ fontSize: '11px', color: '#9aaa94', margin: 0 }}>
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="photoid-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFormData({ ...formData, photoId: e.target.files[0] })
                      setPhotoIdFileName(e.target.files[0].name)
                    }
                  }}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Security Note */}
              <div style={{
                background: '#e8f2ee',
                border: '0.5px solid rgba(33,130,101,0.2)',
                borderRadius: '10px',
                padding: '14px 16px',
                fontSize: '12px',
                color: '#214a3a',
                lineHeight: '1.6',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: '14px', marginTop: '1px' }}>🔒</span>
                <span>
                  Your documents are encrypted and only reviewed by the Vaidlink verification team. They are never shared with patients.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4 — REVIEW & SUBMIT */}
          {currentStep === 4 && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <h1 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '38px',
                  fontWeight: '400',
                  color: '#214a3a',
                  letterSpacing: '-1px',
                  lineHeight: '1.05',
                  marginBottom: '8px'
                }}>
                  Almost{' '}
                  <span style={{ fontStyle: 'italic', color: '#ff9700' }}>there.</span>
                </h1>
                <p style={{ fontSize: '13px', color: '#7a8c78', lineHeight: '1.6' }}>
                  Review your information before submitting.
                </p>
              </div>

              {/* Basic Info Card */}
              <div style={{
                background: '#fff',
                border: '0.5px solid rgba(33,130,101,0.15)',
                borderRadius: '14px',
                padding: '20px 24px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '18px',
                    color: '#214a3a',
                    margin: 0
                  }}>
                    Basic Information
                  </h3>
                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '12px',
                      color: '#ff9700',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Figtree, sans-serif'
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ borderTop: '0.5px solid rgba(33,74,58,0.06)', paddingTop: '16px' }}>
                  {[
                    ['Full Name', formData.fullName],
                    ['Specialisation', formData.specialisation],
                    ['Experience', formData.yearsExperience + ' years'],
                    ['Consultation Fee', '₹' + formData.consultationFee],
                    ['Languages', formData.languages.join(', ')]
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '0.5px solid rgba(33,74,58,0.06)'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#7a8c78' }}>{label}</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#214a3a' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinic Details Card */}
              <div style={{
                background: '#fff',
                border: '0.5px solid rgba(33,130,101,0.15)',
                borderRadius: '14px',
                padding: '20px 24px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '18px',
                    color: '#214a3a',
                    margin: 0
                  }}>
                    Clinic Details
                  </h3>
                  <button
                    onClick={() => setCurrentStep(2)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '12px',
                      color: '#ff9700',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Figtree, sans-serif'
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ borderTop: '0.5px solid rgba(33,74,58,0.06)', paddingTop: '16px' }}>
                  {[
                    ['Clinic Name', formData.clinicName],
                    ['Address', formData.clinicAddress],
                    ['City', formData.city],
                    ['Slot Duration', formData.consultationDuration],
                    ['Max Patients', formData.maxPatients]
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '0.5px solid rgba(33,74,58,0.06)'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#7a8c78' }}>{label}</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#214a3a' }}>{value || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Card */}
              <div style={{
                background: '#fff',
                border: '0.5px solid rgba(33,130,101,0.15)',
                borderRadius: '14px',
                padding: '20px 24px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '18px',
                    color: '#214a3a',
                    margin: 0
                  }}>
                    Documents
                  </h3>
                  <button
                    onClick={() => setCurrentStep(3)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '12px',
                      color: '#ff9700',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Figtree, sans-serif'
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ borderTop: '0.5px solid rgba(33,74,58,0.06)', paddingTop: '16px' }}>
                  {[
                    ['MCI Number', formData.mciNumber],
                    ['MBBS Certificate', mbbsFileName ? 'Uploaded' : 'Not uploaded'],
                    ['Photo ID', photoIdFileName ? 'Uploaded' : 'Not uploaded']
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '0.5px solid rgba(33,74,58,0.06)'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#7a8c78' }}>{label}</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#214a3a' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#214a3a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'Figtree, sans-serif',
                  marginTop: '8px',
                  letterSpacing: '0.01em'
                }}
              >
                Submit Application →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#faf7f2',
        borderTop: '0.5px solid rgba(33,74,58,0.1)',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}>
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#7a8c78',
              cursor: 'pointer',
              fontFamily: 'Figtree, sans-serif',
              fontWeight: '500',
              padding: '0'
            }}
          >
            ← Back
          </button>
        )}

        <button
          onClick={() => {
            if (currentStep < 4) {
              setCurrentStep(currentStep + 1)
            } else {
              handleSubmit()
            }
          }}
          style={{
            padding: '13px 36px',
            backgroundColor: '#214a3a',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'Figtree, sans-serif',
            marginLeft: currentStep === 1 ? 'auto' : 'auto'
          }}
        >
          {currentStep === 4 ? 'Submit Application →' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
