import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '../components/Logo'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    setLoading(true)
    // No backend - fake login, navigate to Upload page
    setTimeout(()=>{
      setLoading(false)
      navigate('/upload')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <LogoIcon size="lg" />
          <div>
            <div className="text-purple-700 font-semibold">SignSmart</div>
            <div className="text-sm text-slate-500">Know Your Rights Before You Sign</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Sign in to your account</h2>
          <p className="text-sm text-slate-600 mb-6">Access contract analysis and reports for your documents.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button type="button" className="text-sm text-purple-600 hover:underline">Forgot password?</button>
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold shadow">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-slate-600">
            Don't have an account? <button onClick={()=>navigate('/upload')} className="text-purple-600 font-medium hover:underline">Continue as guest</button>
          </div>
        </div>
      </div>
    </div>
  )
}
