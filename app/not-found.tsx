import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | WeatherWatch',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
