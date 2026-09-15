import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { api, endpoints } from '@/api/client'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [clientType, setClientType] = useState<'web' | 'android'>('web')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.post<any>(endpoints.auth.login, {
        email,
        password,
        client_type: clientType,
      })

      if (response.data?.user) {
        navigate('/')
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ||
        err.response?.data?.detail?.[0]?.msg ||
        'Invalid credentials or connection error'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 selection:bg-white/20">
      <div className="w-full max-w-sm relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mb-5 shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">JMO Portal</h1>
          <p className="text-gray-500 text-sm">Sign in to manage the Olympiad</p>
        </div>

        {/* Form Container */}
        <div className="glass-panel p-8 rounded-2xl">
          
          {/* Tabs */}
          <div className="flex p-1 bg-gray-900 rounded-lg mb-8 border border-white/[0.04]">
            <button
              type="button"
              onClick={() => setClientType('web')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                clientType === 'web' 
                  ? 'bg-gray-800 text-white shadow-sm border border-gray-700' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Web
            </button>
            <button
              type="button"
              onClick={() => setClientType('android')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                clientType === 'android' 
                  ? 'bg-gray-800 text-white shadow-sm border border-gray-700' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              API
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-950/30 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-sm">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-600 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  placeholder="admin@jmox.org"
                  required
                  className="w-full bg-gray-950 border border-gray-800 text-white placeholder-gray-700 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-600 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-950 border border-gray-800 text-white placeholder-gray-700 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-4 h-11 text-sm font-semibold tracking-wide"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Junior Mathematics Olympiad</p>
        </div>
      </div>
    </div>
  )
}