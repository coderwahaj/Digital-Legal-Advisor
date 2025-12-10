import { Search } from 'lucide-react';

const PrecedentsSearch = ({ searchQuery, onSearchChange, onSearch, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="px-6 lg:px-10 py-4 lg:py-6 border-b-2 border-gray-300">
      <form onSubmit={handleSubmit} className="mb-4 lg:mb-6">
        <div className="flex items-center gap-3 bg-[#2D2D2D] rounded-[2rem] px-4 lg: px-6 py-3 lg:py-4">
          <input
            type="text"
            placeholder="Query for legal precedents here ........ ..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent text-white font-light text-base lg:text-lg placeholder-white placeholder-opacity-70 outline-none disabled:opacity-50"
            style={{ fontFamily: 'Noto Sans' }}
          />
          <button
            type="submit"
            disabled={isLoading || !searchQuery. trim()}
            className="text-white hover:opacity-80 transition-opacity disabled:opacity-50"
            aria-label="Search"
          >
            <Search size={24} />
          </button>
        </div>
      </form>

      {/* AI Response Indicator */}
      <div className="flex items-start gap-3 lg:gap-4">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0"
        >
          <path
            d="M12.1873 35.625C13.9582 34.2708 15.9373 33.2031 18.1248 32.4218C20.3123 31.6406 22.604 31.25 24.9998 31.25C27.3957 31.25 29.6873 31.6406 31.8748 32.4218C34.0623 33.2031 36.0415 34.2708 37.8123 35.625C39.0276 34.2013 39.9738 32.5868 40.6509 30.7812C41.328 28.9757 41.6665 27.0486 41.6665 25C41.6665 20.3819 40.0432 16.4496 36.7967 13.2031C33.5502 9.95656 29.6179 8.33329 24.9998 8.33329C20.3818 8.33329 16.4495 9.95656 13.203 13.2031C9.95643 16.4496 8.33317 20.3819 8.33317 25C8.33317 27.0486 8.67171 28.9757 9.3488 30.7812C10.0259 32.5868 10.9721 34.2013 12.1873 35.625ZM24.9998 27.0833C22.9512 27.0833 21.2238 26.3802 19.8175 24.9739C18.4113 23.5677 17.7082 21.8402 17.7082 19.7916C17.7082 17.743 18.4113 16.0156 19.8175 14.6093C21.2238 13.2031 22.9512 12.5 24.9998 12.5C27.0484 12.5 28.7759 13.2031 30.1821 14.6093C31.5884 16.0156 32.2915 17.743 32.2915 19.7916C32.2915 21.8402 31.5884 23.5677 30.1821 24.9739C28.7759 26.3802 27.0484 27.0833 24.9998 27.0833ZM24.9998 45.8333C22.1179 45.8333 19.4096 45.2864 16.8748 44.1927C14.3401 43.0989 12.1353 41.6145 10.2603 39.7395C8.38525 37.8645 6.90088 35.6597 5.80713 33.125C4.71338 30.5902 4.1665 27.8819 4.1665 25C4.1665 22.118 4.71338 19.4097 5.80713 16.875C6.90088 14.3402 8.38525 12.1354 10.2603 10.2604C12.1353 8.38538 14.3401 6.901 16.8748 5.80725C19.4096 4.7135 22.1179 4.16663 24.9998 4.16663C27.8818 4.16663 30.5901 4.7135 33.1248 5.80725C35.6596 6.901 37.8644 8.38538 39.7394 10.2604C41.6144 12.1354 43.0988 14.3402 44.1925 16.875C45.2863 19.4097 45.8332 22.118 45.8332 25C45.8332 27.8819 45.2863 30.5902 44.1925 33.125C43.0988 35.6597 41.6144 37.8645 39.7394 39.7395C37.8644 41.6145 35.6596 43.0989 33.1248 44.1927C30.5901 45.2864 27.8818 45.8333 24.9998 45.8333Z"
            fill="#1D1B20"
          />
        </svg>
        <p 
          className="font-medium text-lg lg:text-xl text-gray-900 pt-1"
          style={{ fontFamily: 'Noto Sans' }}
        >
          {isLoading 
            ? 'Searching for relevant legal precedents...... ' 
            : 'Here are the relevant legal precedents for your query ...... '}
        </p>
      </div>
    </div>
  );
};

export default PrecedentsSearch;