import {
  Sidebar,
  MobileNavigation,
  FloatingActionButton,
} from '@/components/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-neutral-100'>
      <Sidebar />

      {/* Main content area */}
      <div className='lg:pl-72'>
        <main className='pb-20 lg:pb-0'>{children}</main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Footer */}
      <footer className='fixed bottom-0 left-0 w-full bg-neutral-100 p-4 text-center text-sm text-neutral-500 lg:pl-72'>
        Made by{' '}
        <a
          href='https://david3emmanuel.vercel.app'
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-neutral-600 hover:text-neutral-700'
        >
          David Emmmanuel
        </a>
      </footer>
    </div>
  )
}
