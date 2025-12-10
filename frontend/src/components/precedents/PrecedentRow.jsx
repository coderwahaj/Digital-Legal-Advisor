import { Download } from 'lucide-react';

const PrecedentRow = ({ precedent, onDownload }) => {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
      <td 
        className="py-3 lg:py-4 px-3 lg:px-4 text-center font-normal text-base lg:text-xl text-gray-900"
        style={{ fontFamily: 'Noto Sans' }}
      >
        {precedent.srNo}
      </td>
      <td 
        className="py-3 lg:py-4 px-3 lg:px-4 font-normal text-base lg:text-xl text-gray-900"
        style={{ fontFamily: 'Noto Sans' }}
      >
        {precedent. caseNo}
      </td>
      <td 
        className="py-3 lg:py-4 px-3 lg:px-4 font-normal text-base lg:text-xl text-gray-900"
        style={{ fontFamily: 'Noto Sans' }}
      >
        {precedent.title}
      </td>
      <td 
        className="py-3 lg:py-4 px-3 lg:px-4 font-normal text-base lg: text-xl text-gray-900"
        style={{ fontFamily:  'Noto Sans' }}
      >
        {precedent.judge}
      </td>
      <td className="py-3 lg:py-4 px-3 lg:px-4 text-center">
        <button
          onClick={() => onDownload?.(precedent.id)}
          className="inline-flex items-center justify-center hover:opacity-70 transition-opacity p-2"
          aria-label="Download judgment"
          title="Download judgment"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 lg:w-8 lg: h-8"
          >
            <path
              d="M3. 75 15. 0052V26.25H26.25V15"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.625 14.375L15 20L9.375 14.375"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.9946 3.75V20"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default PrecedentRow;