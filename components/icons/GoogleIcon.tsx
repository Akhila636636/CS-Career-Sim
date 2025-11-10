import React from 'react';

export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M43.611 20.083H24v8.835h11.002c-1.258 5.625-6.666 9.71-12.835 9.71-7.633 0-13.835-6.202-13.835-13.835s6.202-13.835 13.835-13.835c4.323 0 7.989 2.012 10.153 4.195l6.58-6.58C34.546 2.451 29.805 0 24 0 10.745 0 0 10.745 0 24s10.745 24 24 24c12.396 0 22.82-9.186 24-21.789l-4.389-2.128z"/>
    </svg>
);