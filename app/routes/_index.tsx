import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import {
  ArrowDown,
  ArrowRight,
  BarChart,
  Box,
  CheckCircle,
  Github,
  Loader2,
  Server,
} from 'lucide-react'
import { Alert, AlertDescription } from '~/components/Alert'
import loops from '~/lib/loops'

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'then.sh - The convenience of cloud deployments, without the costs',
    },
    {
      name: 'description',
      content:
        'Deploy containers to your own infrastructure with zero-downtime deployments, monitoring, and enterprise-grade security. Get early access now.',
    },
  ]
}

const DEPLOYMENT_STEPS = [
  {
    icon: <Github className="w-6 h-6" />,
    title: 'Connect to GitHub',
    description: 'Automatic builds triggered on push to main.',
    handler: 'then.sh',
    handlerClass: 'bg-pink-400/20 text-pink-400 border-pink-400/30',
  },
  {
    icon: <Box className="w-6 h-6" />,
    title: 'Build & Push Images',
    description:
      'Automated multi-stage builds with layer caching and private registry hosting.',
    handler: 'then.sh',
    handlerClass: 'bg-pink-400/20 text-pink-400 border-pink-400/30',
  },
  {
    icon: <Loader2 className="w-6 h-6" />,
    title: 'Zero-downtime Deployment',
    description: 'Rolling updates with health checks and automatic rollbacks.',
    handler: 'then.sh',
    handlerClass: 'bg-pink-400/20 text-pink-400 border-pink-400/30',
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Infrastructure Connection',
    description:
      'Connect to your own servers - cloud or bare metal. Pay only for your actual resource usage with rates up to 70% cheaper than managed solutions.',
    handler: 'Managed by you',
    handlerClass: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
    highlight: true,
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: 'Monitoring & Logging',
    description:
      'View real-time metrics, logs, and alerts directly in the then.sh dashboard.',
    handler: 'then.sh',
    handlerClass: 'bg-pink-400/20 text-pink-400 border-pink-400/30',
  },
]

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()
  const email = body.get('email')
  const isBot = body.get('is_bot')

  if (isBot === 'true') {
    return json({ success: false, error: 'No bots allowed' }, { status: 400 })
  }

  if (!email) {
    return json({ success: false, error: 'Email is required' }, { status: 400 })
  }

  const response = await loops.createContact(email.toString())
  if (!response.success) {
    return json({ success: false, error: response.message }, { status: 500 })
  }

  return json({ success: true })
}

export default function Index() {
  const fetcher = useFetcher<typeof action>()
  const submitting = fetcher.state === 'submitting'
  const submitted = fetcher.data?.success

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-float">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-8">
              <span className="gradient-text">then.sh</span>
            </h1>
          </div>

          <p className="text-2xl sm:text-3xl font-semibold text-pink-500 mb-6">
            The convenience of cloud deployments, without the costs.
          </p>

          <p className="mt-4 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
            A modern container deployment platform that gives you the
            reliability of enterprise infrastructure on your own servers.
            <br />
            <br />
            Get early access and be among the first to try it.
          </p>

          {/* Primary CTA */}
          <div className="mt-12 max-w-lg mx-auto">
            <fetcher.Form method="post" className="w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="flex-1 rounded-lg border-0 bg-gray-800/50 px-4 py-3 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-pink-500 text-lg focus:outline-none"
                  placeholder="Enter your email for early access"
                />
                <input
                  type="hidden"
                  name="is_bot"
                  defaultValue="false"
                  aria-hidden
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition-colors text-lg"
                >
                  {submitting ? 'Subscribing...' : 'Join Waitlist'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              {submitted && (
                <Alert className="mt-4 bg-pink-500/20 border-pink-500/50">
                  <AlertDescription className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-pink-400" />
                    <span>
                      You&apos;re on the list! We&apos;ll notify you when early
                      access opens.
                    </span>
                  </AlertDescription>
                </Alert>
              )}
            </fetcher.Form>
          </div>
        </div>
      </div>

      {/* Deployment Process Timeline */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple Deployment Process
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Deploy your containers with enterprise-grade tooling while
            maintaining full control of your infrastructure
          </p>

          <div className="relative">
            {/* Vertical line - hidden on mobile, adjusted for larger screens */}
            <div className="hidden sm:block absolute left-8 top-8 h-[calc(100%-100px)] w-px bg-gray-700" />

            {/* Timeline items */}
            <div className="space-y-8 sm:space-y-12">
              {DEPLOYMENT_STEPS.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  {/* Icon container with connection line */}
                  <div className="flex-none relative">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center ${
                        step.highlight
                          ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900'
                          : ''
                      }`}
                    >
                      {step.icon}
                    </div>
                    {index < DEPLOYMENT_STEPS.length - 1 && (
                      <ArrowDown className="hidden sm:block absolute -bottom-2 left-6 w-4 h-4 text-gray-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-xl bg-gray-800/50 border border-gray-700/50 p-4 sm:p-6 ${
                      step.highlight ? 'ring-2 ring-blue-400/50' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-100 text-center sm:text-left">
                        {step.title}
                      </h3>
                      <span
                        className={`text-sm px-3 py-1 rounded-full border ${step.handlerClass} mx-auto sm:mx-0`}
                      >
                        {step.handler}
                      </span>
                    </div>
                    <p className="text-gray-400 text-center sm:text-left text-sm sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Coming Soon / Pricing Teaser */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Pricing coming soon</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We&apos;re finalizing our pricing tiers to ensure they provide the
            best value for teams of all sizes. Join the waitlist to be notified
            when pricing is announced and get access to exclusive launch offers.
          </p>
          <div className="inline-block">
            <button
              className="flex items-center gap-3 text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="font-semibold">Join the waitlist</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()}{' '}
              <a
                href="https://www.melbournetech.com/"
                className="text-pink-400 hover:text-pink-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Melbourne Tech, LLC.
              </a>
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/melbourne-tech/then.sh"
                className="text-gray-400 hover:text-pink-400"
              >
                GitHub
              </a>
              <a
                href="https://www.melbournetech.com/contact"
                className="text-gray-400 hover:text-pink-400"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
