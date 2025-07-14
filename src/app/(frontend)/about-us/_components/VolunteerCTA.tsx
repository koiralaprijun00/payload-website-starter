'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { getClientSideURL } from '@/utilities/getURL'

export type VolunteerCTAProps = {
  data: {
    title: string
    description: string
    buttonText: string
    buttonLink?: string // kept for backward-compatibility but not used now
    image?: {
      url: string
    }
  }
}

const VolunteerCTA: React.FC<VolunteerCTAProps> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`${getClientSideURL()}/api/volunteer-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section className="container mx-auto my-16 py-16">
      <div className="flex flex-col md:flex-row items-center bg-[#6C93C0] rounded-lg px-8 py-12 gap-8 relative overflow-visible">
        {/* Left: Text */}
        <div className="flex-1 text-white pr-0 md:pr-32 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{data.title}</h2>
          <p className="text-lg md:text-xl mb-8">{data.description}</p>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="bg-mainBlue text-white hover:bg-blue-900"
            onClick={() => setOpen(true)}
          >
            {data.buttonText}
          </Button>
        </div>
        {/* Right: Image */}
        <div className="w-full md:flex-1 flex items-center md:items-end justify-center md:justify-end relative mt-6 md:mt-0 md:min-h-[300px]">
          {data.image && data.image.url && (
            <Image
              src={data.image.url}
              alt={data.title}
              width={350}
              height={400}
              className="object-contain h-48 w-auto md:w-[440px] md:h-auto md:absolute md:right-[80px] md:bottom-0 md:translate-y-[87px] drop-shadow-xl z-20"
              priority
            />
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          {/* Modal Content */}
          <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-xl text-mainBlue">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
              onClick={() => {
                setOpen(false)
                setStatus('idle')
              }}
            >
              ×
            </button>

            {status === 'success' ? (
              <div className="text-center py-12">
                <h3 className="mb-4 text-3xl font-semibold">Thank you!</h3>
                <p>We have received your submission and will contact you soon.</p>
              </div>
            ) : (
              <>
                <h3 className="mb-6 text-3xl font-semibold">Join as a Volunteer</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="mb-1 block font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1 block font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Optional"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1 block font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us why you're interested"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-destructive-foreground">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Submitting…' : 'Submit'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default VolunteerCTA
