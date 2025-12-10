import { useState, useCallback } from 'react';
// import { precedentsApi } from '@/api/precedentsApi'; // TODO: Create when backend is ready

const MOCK_PRECEDENTS = [
  {
    id: 1,
    srNo: 1,
    caseNo: 'Crl.  Revision 21000/24',
    title: 'MST KOSAR MAI VS SHO ETC',
    judge: 'Mr. Justice Anwaarul Haq Pannun',
  },
  {
    id:  2,
    srNo:  2,
    caseNo: 'Crl.  Misc.-Habeas Corpus 2446-H-20',
    title: 'Corpus 2446-H-20 MST KOSAR MAI VS SHO ETC',
    judge: 'Mr. Justice Anwaarul Haq Pannun',
  },
  {
    id: 3,
    srNo: 3,
    caseNo: 'Crl. Misc.  63668/24',
    title: 'Waseem Vs The State etc.',
    judge: 'Mr. Justice Shakil Ahmad',
  },
  {
    id: 4,
    srNo: 4,
    caseNo: 'Jail Appeal 24464/21',
    title: 'Muhammad Arshad etc. Vs The State.',
    judge: 'Mr.  Justice Shakil Ahmad',
  },
];

export const useLegalPrecedents = () => {
  const [precedents, setPrecedents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchPrecedents = useCallback(async (query) => {
    try {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      // TODO: Replace with actual API call
      // const response = await precedentsApi.search(query);
      
      // Mock search with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Filter mock data based on query
      const filtered = MOCK_PRECEDENTS. filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.caseNo.toLowerCase().includes(query.toLowerCase()) ||
        p.judge.toLowerCase().includes(query.toLowerCase())
      );

      setPrecedents(filtered. length > 0 ? filtered :  MOCK_PRECEDENTS);
      
    } catch (err) {
      setError(err.message);
      console.error('Precedents search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadJudgment = useCallback(async (precedentId) => {
    try {
      console.log('Downloading judgment for precedent:', precedentId);
      // TODO:  Implement actual download
      // await precedentsApi.downloadJudgment(precedentId);
    } catch (err) {
      console.error('Download error:', err);
    }
  }, []);

  const clearResults = useCallback(() => {
    setPrecedents([]);
    setHasSearched(false);
    setError(null);
  }, []);

  return {
    precedents,
    isLoading,
    error,
    hasSearched,
    searchPrecedents,
    downloadJudgment,
    clearResults
  };
};

export default useLegalPrecedents;