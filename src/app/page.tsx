import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div
      className='flex space-between items-center justify-between w-full'
      >
        <h1>Invoice Generator</h1>
        <button className='btn'>
          login
          </button>
      </div>
      <div
        className='pt-24 flex flex-col items-center justify-center'
      >
        <p>
          Invoice Generator for freelancers.
          Unlock essential features such as unlimited invoices, estimates and clients.
        </p>
      </div>
    </main>
  )
}
