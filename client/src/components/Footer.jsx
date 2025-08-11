import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-gray-800 text-gray-300 py-10'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Brand and Socials */}
          <div className='flex flex-col items-start'>
            <h3 className='text-2xl font-bold text-white mb-2'>QuickCourt</h3>
            <p className='text-sm mb-4'>
              Book your favorite sports venue with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-xl font-semibold text-white mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors duration-200'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors duration-200'
                >
                  Venues
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors duration-200'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors duration-200'
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-xl font-semibold text-white mb-4'>
              Contact Us
            </h4>
            <p className='mb-2'>
              Sargasan Cross Road, Sarkhej - Gandhinagar Hwy, Gandhinagar, Gujarat 382419
            </p>
            <p className='mb-2'>
              Email:{' '}
              <a
                href='mailto:info@quickcourt.com'
                className='hover:text-white transition-colors duration-200'
              >
                shubhamlal.new@gmail.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a
                href='tel:+1234567890'
                className='hover:text-white transition-colors duration-200'
              >
                (+91) 9163161834
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 pt-6 border-t border-gray-700 text-center text-sm'>
          <p>&copy; 2025 QuickCourt. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
