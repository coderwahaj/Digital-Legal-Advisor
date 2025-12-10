import { Scale } from 'lucide-react';

const PrecedentsHeader = () => {
  return (
    <div className="px-6 lg:px-10 py-6 lg:py-10 border-b-2 border-gray-300">
      <div className="flex items-center gap-3 lg:gap-4">
        <h1 
          className="text-3xl lg:text-4xl font-bold text-gray-900"
          style={{ fontFamily: 'Ropa Sans' }}
        >
          Legal Precedents
        </h1>
        <svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0"
        >
          <path
            d="M33.3332 16.6666C33.3332 10.3384 29.6022 4.16663 24.9998 4.16663C20.3974 4.16663 16.6665 10.3384 16.6665 16.6666"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.37516 16.6666H40.6252L41.6668 29.1666H28.1252V26.0416H21.8752V29.1666H8.3335L9.37516 16.6666Z"
            fill="#333333"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.33333 29.1666L6.25 43.75H43.75L41.6667 29.1666"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.875 26.0416H28.125V32.2916H21.875V26.0416Z"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default PrecedentsHeader;