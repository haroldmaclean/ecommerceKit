import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function HomePage() {
  return (
    <main className='p-6 min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-500'>
      <h1 className='text-2xl font-bold'>Welcome to CommerceKit</h1>
      <p>
        This text should switch based on your system&apos;s dark mode
        preference.
      </p>

      <div className='mt-4'>
        <ThemeToggle />
      </div>
    </main>
  )
}
