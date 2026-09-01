'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

type ContactFormInputs = {
  name: string
  email: string
  phone: string
  subject: 'fresh-project' | 'buying-paint' | 'become-dealer' | 'book-painting-service' | 'other'
  message: string
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormInputs>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      setErrorMessage('')
      
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: 'Website Contact Page'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSuccess(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Submission error:', error)
      setErrorMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold text-reliance-navy mb-6">Send us a Message</h2>
      
      {isSuccess ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
          <div>
            <h3 className="font-bold text-lg mb-1">Message Sent!</h3>
            <p className="text-sm opacity-90">Thank you for reaching out. Our team will get back to you shortly.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3 bg-gray-50 border ${errors.name ? 'border-red-500' : ''}`}
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3 bg-gray-50 border ${errors.email ? 'border-red-500' : ''}`}
                placeholder="john@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3 bg-gray-50 border"
                placeholder="+977-98XXXXXXXX"
                {...register('phone')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3 bg-gray-50 border cursor-pointer"
                {...register('subject', { required: 'Please select a subject' })}
              >
                <option value="fresh-project">Fresh Project</option>
                <option value="buying-paint">Buying Paint</option>
                <option value="become-dealer">Become a Dealer</option>
                <option value="book-painting-service">Book Painting Service</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
            <textarea
              rows={5}
              className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-reliance-gold focus:ring-reliance-gold p-3 bg-gray-50 border ${errors.message ? 'border-red-500' : ''}`}
              placeholder="How can we help you today?"
              {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-reliance-gold hover:bg-reliance-gold/90 text-white font-medium px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
