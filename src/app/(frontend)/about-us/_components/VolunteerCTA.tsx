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
    <section className="w-full my-8 sm:my-12 lg:my-16 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center bg-[#6C93C0] rounded-lg px-4 sm:px-6 lg:px-8 py-8 sm:py-12 gap-6 sm:gap-8 relative overflow-visible">
          {/* Left: Text */}
          <div className="flex-1 text-white pr-0 lg:pr-16 xl:pr-32 z-10 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8">
              {data.description}
            </p>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="bg-mainBlue text-white hover:bg-blue-900 hover:text-white text-sm sm:text-base lg:text-lg"
              onClick={() => setOpen(true)}
            >
              {data.buttonText}
            </Button>
          </div>
          {/* Right: Image */}
          <div className="hidden lg:flex w-full lg:flex-1 items-center lg:items-end justify-center lg:justify-end relative mt-4 sm:mt-6 lg:mt-0 lg:min-h-[200px] xl:min-h-[300px]">
            {data.image && data.image.url && (
              <Image
                src={data.image.url}
                alt={data.title}
                width={350}
                height={400}
                className="object-contain h-32 w-auto sm:h-40 md:h-48 lg:w-[350px] xl:w-[440px] lg:h-auto lg:absolute lg:right-[40px] xl:right-[80px] lg:bottom-0 lg:translate-y-[40px] xl:translate-y-[87px] drop-shadow-xl z-20"
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 350px"
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          {/* Modal Content */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg bg-white p-4 sm:p-6 lg:p-8 shadow-xl text-mainBlue">
            {/* Close Button */}
            <button
              className="absolute right-2 sm:right-4 top-2 sm:top-4 text-xl sm:text-2xl font-bold text-gray-500 hover:text-gray-700"
              onClick={() => {
                setOpen(false)
                setStatus('idle')
              }}
            >
              ×
            </button>

            {status === 'success' ? (
              <div className="text-center py-8 sm:py-12">
                <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-semibold">Thank you!</h3>
                <p className="text-sm sm:text-base">
                  We have received your submission and will contact you soon.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-semibold">
                  Join as a Volunteer
                </h3>
                <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="mb-1 block font-medium text-sm sm:text-base">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block font-medium text-sm sm:text-base">
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
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1 block font-medium text-sm sm:text-base">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Optional"
                      value={form.phone}
                      onChange={handleChange}
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block font-medium text-sm sm:text-base"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us why you're interested"
                      value={form.message}
                      onChange={handleChange}
                      className="text-sm sm:text-base"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-destructive-foreground text-sm sm:text-base">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-sm sm:text-base"
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
