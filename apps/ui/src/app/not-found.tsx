import Link from "next/link"

import { Footer } from "@/components/common/Footer"

export default function NotFound() {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center" data-nav-theme="light">
      <h1 className="text-9xl font-black text-zinc-200 selection:bg-transparent">
        404
      </h1>

      <div className="mt-4 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Lost in space?
        </h2>
        <p className="max-w-md text-zinc-600">
          The page you are looking for doesn&apos;t exist, has been removed, or
          is temporarily unavailable.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Return Home
        </Link>
      </div>
    </div>
      <Footer />
    </>
  )
}
