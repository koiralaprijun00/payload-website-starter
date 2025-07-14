'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

const presetAmounts = [25, 50, 100, 250]

export default function DonatePage() {
  const [amount, setAmount] = useState<number | ''>('')
  const [custom, setCustom] = useState('')
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAmountClick = (val: number) => {
    setAmount(val)
    setCustom('')
  }

  const handleDonate = async () => {
    const numericAmount = custom ? Number(custom) : amount
    if (!numericAmount || numericAmount <= 0) return alert('Please enter a valid amount')
    if (!email) return alert('Email is required')
    setLoading(true)

    try {
      const res = await fetch('/api/create-donation-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: numericAmount, frequency, name, email }),
      })
      const { sessionId, publishableKey } = await res.json()
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripe = await loadStripe(publishableKey)
      if (stripe) await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const displayAmount = custom || amount
  const isValidAmount = displayAmount && Number(displayAmount) > 0

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
          <Heart className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Make a Donation</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Your support helps us continue our mission and create lasting impact in our community.
        </p>
      </div>

      {/* Donation Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {/* Frequency Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Donation Frequency</label>
          <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
            {[
              { key: 'one-time', label: 'One-time' },
              { key: 'monthly', label: 'Monthly' },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setFrequency(option.key as 'one-time' | 'monthly')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  frequency === option.key
                    ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {presetAmounts.map((val) => (
              <button
                key={val}
                onClick={() => handleAmountClick(val)}
                className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                  amount === val && !custom
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <Input
              type="number"
              min={1}
              placeholder="Enter custom amount"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value)
                setAmount('')
              }}
              className="pl-8 h-12 text-lg"
            />
          </div>
        </div>

        {/* Donor Information */}
        <div className="mb-8 space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Your Information</label>
          <Input
            placeholder="Full Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12"
          />
          <Input
            type="email"
            required
            placeholder="Email Address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
          />
        </div>

        {/* Donation Summary */}
        {isValidAmount && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {frequency === 'monthly' ? 'Monthly donation' : 'One-time donation'}
              </span>
              <span className="text-2xl font-bold text-gray-900">${displayAmount}</span>
            </div>
            {frequency === 'monthly' && (
              <p className="text-sm text-gray-500 mt-1">${Number(displayAmount) * 12}/year total</p>
            )}
          </div>
        )}

        {/* Donate Button */}
        <Button
          size="lg"
          disabled={loading || !isValidAmount || !email}
          onClick={handleDonate}
          className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? (
            <span className="flex items-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </span>
          ) : isValidAmount ? (
            `Donate $${displayAmount} ${frequency === 'monthly' ? 'Monthly' : 'Now'}`
          ) : (
            'Enter Amount to Continue'
          )}
        </Button>
      </div>
    </main>
  )
}
