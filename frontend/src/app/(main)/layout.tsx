import {
  Sidebar,
  MobileNavigation,
  FloatingActionButton,
} from '@/components/navigation'
import { AuthProvider } from '@/context/AuthContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
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
      </div>
    </AuthProvider>
  )
}
