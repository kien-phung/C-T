import { useState } from 'react';
import './FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='floating-contact'>
      <button
        className='floating-contact-btn'
        onClick={toggleMenu}
        aria-label='Open contact menu'
      >
        <span className='floating-contact-icon'>
          {isOpen ? '✕' : '💬'}
        </span>
      </button>

      <div className={`floating-contact-menu ${isOpen ? 'open' : ''}`}>
        <a
          href='https://zalo.me/84822191605'
          target='_blank'
          rel='noopener noreferrer'
          className='floating-contact-item zalo'
          title='Chat with Zalo'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='white'>
            <path d='M12 0C5.37 0 0 5.37 0 12c0 2.1.5 4.1 1.4 5.9L0 24l6.3-1.4C8.8 23.5 10.4 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 22c-1.4 0-2.7-.3-4-.9l-2.9.6.7-2.6C2.2 17.2 2 14.6 2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10z' />
          </svg>
        </a>

        <a
          href='https://m.me/61581551666794'
          target='_blank'
          rel='noopener noreferrer'
          className='floating-contact-item messenger'
          title='Chat with Messenger'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='white'>
            <path d='M12 0C5.38 0 0 4.97 0 11.11c0 3.4 1.68 6.42 4.3 8.27V24l4.37-2.41C9.88 22.66 10.92 23 12 23c6.62 0 12-4.97 12-11.11C24 4.97 18.62 0 12 0zm1.15 13.42l-2.85-2.97-5.57 2.97 6.22-6.56 2.85 2.97 5.57-2.97-6.22 6.56z' />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FloatingContact;
