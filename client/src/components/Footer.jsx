import React from 'react'

export default function Footer () {
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
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {/* SVG for social media icon (e.g., Facebook) */}
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M22 12c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-6c0-1.103-.897-2-2-2zM19 8c-1.654 0-3 1.346-3 3v2c0 1.654 1.346 3 3 3h2c1.654 0 3-1.346 3-3V11c0-1.654-1.346-3-3-3zM22 6c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM15 12c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-6c0-1.103-.897-2-2-2zM11 8c-1.103 0-2 .897-2 2v12h10V10c0-1.103-.897-2-2-2zM9 10c0-.551.449-1 1-1h10c.551 0 1 .449 1 1v12h-12V10zM5 8c-1.103 0-2 .897-2 2v12h4V10c0-1.103-.897-2-2-2zM1 10c0-.551.449-1 1-1h4c.551 0 1 .449 1 1v12H1V10z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {/* SVG for social media icon (e.g., Twitter) */}
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M24 4.557a9.983 9.983 0 01-2.828.775 4.99 4.99 0 002.166-2.724 9.92 9.92 0 01-3.114 1.189 4.925 4.925 0 00-8.384 4.5 14.053 14.053 0 01-10.26-5.187 4.992 4.992 0 001.545 6.623 4.975 4.975 0 01-2.254-.622v.063a4.993 4.993 0 004.008 4.908 4.986 4.986 0 01-2.25.085 4.987 4.987 0 004.646 3.435 9.932 9.932 0 01-6.18 2.15c-.402 0-.802-.023-1.196-.07A14.024 14.024 0 0015 21c1.815 0 3.546-.484 5.034-1.32a13.916 13.916 0 003.585-3.328c.45-.635.845-1.309 1.185-2.023A9.97 9.97 0 0024 4.557z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {/* SVG for social media icon (e.g., GitHub) */}
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.307 9.208.457.086.586-.198.586-.395 0-.195-.008-.665-.013-1.298C6.183 19.34 5.485 17.65 5.485 17.65c-.378-.962-.92-1.218-.92-1.218-.755-.515.056-.505.056-.505.836.059 1.275.858 1.275.858.743 1.272 1.95 1.055 2.422.808.075-.626.29-.982.529-1.206-1.85-.209-3.793-.925-3.793-4.103 0-.907.325-1.65.858-2.235-.086-.209-.372-1.055.081-2.203 0 0 .698-.224 2.285.855C10.288 8.877 11.144 8.75 12 8.75s1.712.127 2.506.375c1.587-1.079 2.285-.855 2.285-.855.453 1.148.167 1.994.081 2.203.533.585.858 1.328.858 2.235 0 3.186-1.946 3.892-3.804 4.102.298.257.56.76.56 1.528 0 1.103-.01 1.996-.01 2.268 0 .198.129.485.587.395A10 10 0 0022 12C22 6.477 17.523 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </div>
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
            <p className='mb-2'>123 Sports Avenue, Cityville, 12345</p>
            <p className='mb-2'>
              Email:{' '}
              <a
                href='mailto:info@quickcourt.com'
                className='hover:text-white transition-colors duration-200'
              >
                info@quickcourt.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a
                href='tel:+1234567890'
                className='hover:text-white transition-colors duration-200'
              >
                (123) 456-7890
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
