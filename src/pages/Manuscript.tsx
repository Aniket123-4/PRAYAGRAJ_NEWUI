// // src/pages/Manuscript.tsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, CardContent } from "@/components/ui/card";
// import { RootState } from '../redux/store';
// import { fetchManuscripts } from '../redux/slices/manuscriptSlice';

// const Manuscript = () => {
//   const dispatch = useDispatch();
//   const { data: manuscripts, loading } = useSelector((state: RootState) => state.manuscript);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     dispatch(fetchManuscripts() as any);
//   }, [dispatch]);

//   // Pagination calculations
//   const totalPages = Math.ceil(manuscripts.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentManuscripts = manuscripts.slice(startIndex, startIndex + rowsPerPage);

//   if (loading && manuscripts.length === 0) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background py-12 px-6 md:px-16">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
//           Manuscript Collection
//         </h1>
//         <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
//           Explore our extensive manuscript collection, featuring unique and rare documents 
//           that illuminate the history and culture of significant eras. This collection includes handwritten 
//           letters, diaries, legal documents, and more, offering invaluable insights into 
//           the lives and thoughts of individuals from ancient times.
//         </p>

//         {/* Table */}
//         <Card className="card-premium rounded-2xl overflow-hidden">
//           <CardContent className="overflow-x-auto">
//             <table className="w-full border-collapse text-sm md:text-base">
//               <thead>
//                 <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground text-left">
//                   <th className="px-4 py-3">Sr No.</th>
//                   <th className="px-4 py-3">Title</th>
//                   <th className="px-4 py-3">Author</th>
//                   <th className="px-4 py-3">Year</th>
//                   <th className="px-4 py-3">Call No.</th>
//                 </tr>
//               </thead>
//               <tbody className="text-foreground">
//                 {currentManuscripts.length > 0 ? (
//                   currentManuscripts.map((item) => (
//                     <tr
//                       key={item._id}
//                       className="border-b border-border hover:bg-background-secondary transition"
//                     >
//                       <td className="px-4 py-3">{item.srNo}</td>
//                       <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
//                       <td className="px-4 py-3">{item.author || "-"}</td>
//                       <td className="px-4 py-3">{item.year || "-"}</td>
//                       <td className="px-4 py-3">{item.callNo}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
//                       No manuscripts available.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             {/* Pagination for public view */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center mt-6 space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-secondary"
//                 >
//                   Previous
//                 </button>
                
//                 <span className="px-3 py-1 text-sm text-foreground">
//                   Page {currentPage} of {totalPages}
//                 </span>
                
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-secondary"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Manuscript;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from '../redux/store';
import { fetchManuscripts } from '../redux/slices/manuscriptSlice';
import { useTranslation } from 'react-i18next';

const Manuscript = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: manuscripts, loading } = useSelector((state: RootState) => state.manuscript);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchManuscripts() as any);
  }, [dispatch]);

  // Pagination calculations
  const totalPages = Math.ceil(manuscripts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentManuscripts = manuscripts.slice(startIndex, startIndex + rowsPerPage);

  if (loading && manuscripts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
          {t('manuscript.title')}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
          {t('manuscript.description')}
        </p>

        {/* Table */}
        <Card className="card-premium rounded-2xl overflow-hidden">
          <CardContent className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground text-left">
                  <th className="px-4 py-3">{t('manuscript.table.srNo')}</th>
                  <th className="px-4 py-3">{t('manuscript.table.title')}</th>
                  <th className="px-4 py-3">{t('manuscript.table.author')}</th>
                  <th className="px-4 py-3">{t('manuscript.table.year')}</th>
                  <th className="px-4 py-3">{t('manuscript.table.callNo')}</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                {currentManuscripts.length > 0 ? (
                  currentManuscripts.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-border hover:bg-background-secondary transition"
                    >
                      <td className="px-4 py-3">{item.srNo}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
                      <td className="px-4 py-3">{item.author || "-"}</td>
                      <td className="px-4 py-3">{item.year || "-"}</td>
                      <td className="px-4 py-3">{item.callNo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      {t('manuscript.table.noManuscripts')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination for public view */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-secondary"
                >
                  {t('manuscript.pagination.previous')}
                </button>
                
                <span className="px-3 py-1 text-sm text-foreground">
                  {t('manuscript.pagination.page', { current: currentPage, total: totalPages })}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-secondary"
                >
                  {t('manuscript.pagination.next')}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Manuscript;