
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { fetchHistory } from "@/redux/slices/historySlice";
// import { Loader2 } from "lucide-react";

// export default function History() {
//   const dispatch = useDispatch();
//   const { data: historyData, loading, error } = useSelector((state: RootState) => state.history);

//   useEffect(() => {
//     dispatch(fetchHistory() as any);
//   }, [dispatch]);

//   // Show loading only when loading AND no data exists
//   if (loading && !historyData) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // If no data and not loading, show error or fallback
//   if (!historyData) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-destructive mb-4">No History Data Available</h2>
//           <p className="text-muted-foreground">Please try refreshing the page.</p>
//         </div>
//       </div>
//     );
//   }

//   // Use the data from Redux store (now guaranteed to be non-null)
//   const displayData = historyData;

//   return (
//     <div className="min-h-screen bg-background py-20">
//       <div className="container mx-auto px-4">
//         {/* Page Title */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold pb-4 gradient-text">
//             {displayData.firmName}
//           </h1> 
//         </motion.div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
//           {[
//             { label: "Established", value: displayData.establishedYear },
//             { label: "Location", value: displayData.locationHistory },
//             { label: "Architect", value: displayData.architect },
//             { label: "Architecture Style", value: displayData.architectureStyle },
//             { label: "Collection", value: displayData.collectionHistory },
//           ].map((item, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.1 }}
//             >
//               <Card className="card-premium hover:shadow-lg transition">
//                 <CardHeader>
//                   <CardTitle className="text-xl font-semibold text-primary">
//                     {item.label}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="text-muted-foreground text-lg">
//                   {item.value}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Narrative Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Card className="card-premium p-8 shadow-xl">
//             <CardContent>
//               <p className="text-lg leading-relaxed text-muted-foreground">
//                 {displayData.description}
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-center"
//           >
//             <p className="text-yellow-800">
//               Note: {error}
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchHistory } from "@/redux/slices/historySlice";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function History() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: historyData, loading, error } = useSelector((state: RootState) => state.history);

  useEffect(() => {
    dispatch(fetchHistory() as any);
  }, [dispatch]);

  // Show loading only when loading AND no data exists
  if (loading && !historyData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-4 text-muted-foreground">{t('common.loading')}</span>
      </div>
    );
  }

  // If no data and not loading, show error or fallback
  if (!historyData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">
            {t('history.noData')}
          </h2>
          <p className="text-muted-foreground">
            {t('history.refresh')}
          </p>
        </div>
      </div>
    );
  }

  // Use the data from Redux store (now guaranteed to be non-null)
  const displayData = historyData;

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold pb-4 gradient-text">
            {displayData.firmName}
          </h1> 
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            { label: t('history.info.established'), value: displayData.establishedYear },
            { label: t('history.info.location'), value: displayData.locationHistory },
            { label: t('history.info.architect'), value: displayData.architect },
            { label: t('history.info.architectureStyle'), value: displayData.architectureStyle },
            { label: t('history.info.collection'), value: displayData.collectionHistory },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="card-premium hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-lg">
                  {item.value}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Narrative Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="card-premium p-8 shadow-xl">
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {displayData.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-center"
          >
            <p className="text-yellow-800">
              {t('history.error', { error })}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}