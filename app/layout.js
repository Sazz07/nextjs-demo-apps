'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/footer'
import Wrapper from './components/wrapper/Wrapper'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient();

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Wrapper>
            {children}
            <Footer />
          </Wrapper>
        </QueryClientProvider>
      </body>
    </html>
  )
}
