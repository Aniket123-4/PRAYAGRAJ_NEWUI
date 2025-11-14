// // src/pages/Collection.tsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from "framer-motion";
// import { BookOpen, Newspaper, FileText, Library } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { RootState } from '../redux/store';
// import { fetchCollectionForAdmin } from '../redux/slices/collectionSlice';

// const Collection: React.FC = () => {
//   const dispatch = useDispatch();
//   const { data: collectionData, loading } = useSelector((state: RootState) => state.collection);

//   useEffect(() => {
//     dispatch(fetchCollectionForAdmin() as any);
//   }, [dispatch]);

//   if (loading && !collectionData) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="relative py-20 hero-gradient text-primary-foreground overflow-hidden">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Collection
//             </h1>
//             <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
//               The Diverse Collection at Prayagraj Public Library
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Introduction */}
//       <section className="py-16 bg-background">
//         <div className="container mx-auto px-4">
//           <Card className="card-premium">
//             <CardContent className="p-8 text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
//               {collectionData?.diverseCollectionText}
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Old Newspapers */}
//       {collectionData?.oldBoundVolumes && collectionData.oldBoundVolumes.length > 0 && (
//         <section className="py-16 bg-background-secondary">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-center mb-12"
//             >
//               <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
//                 Availability of Old Bound Volume of Newspapers
//               </h2>
//             </motion.div>

//             <Card className="card-premium overflow-x-auto">
//               <CardContent>
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
//                       <th className="p-3">S.No.</th>
//                       <th className="p-3">Name of Newspaper</th>
//                       <th className="p-3">Duration</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-muted-foreground">
//                     {collectionData.oldBoundVolumes.map((volume, index) => (
//                       <tr key={index}>
//                         <td className="p-3">{index + 1}</td>
//                         <td className="p-3">{volume.name}</td>
//                         <td className="p-3">{volume.duration}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       )}

//       {/* Old Magazines */}
//       {collectionData?.oldMagazines && collectionData.oldMagazines.length > 0 && (
//         <section className="py-16 bg-background">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold mb-6 gradient-text text-center">
//               Availability of Old Bound Volume of Magazines
//             </h2>
//             <Card className="card-premium overflow-x-auto">
//               <CardContent>
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
//                       <th className="p-3">S.No.</th>
//                       <th className="p-3">Name of Publication</th>
//                       <th className="p-3">Duration</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-muted-foreground">
//                     {collectionData.oldMagazines.map((magazine, index) => (
//                       <tr key={index}>
//                         <td className="p-3">{index + 1}</td>
//                         <td className="p-3">{magazine.name}</td>
//                         <td className="p-3">{magazine.duration}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       )}

//       {/* Gazettes */}
//       {collectionData?.gazettes && collectionData.gazettes.length > 0 && (
//         <section className="py-16 bg-background-secondary">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-6 gradient-text">Availability of Old Bound Volume of Gazettes</h2>
//             <Card className="card-premium p-8">
//               <div className="text-lg leading-relaxed text-muted-foreground">
//                 {collectionData.gazettes.map((gazette, index) => (
//                   <p key={index}>{gazette.name} – {gazette.duration}</p>
//                 ))}
//               </div>
//             </Card>
//           </div>
//         </section>
//       )}

//       {/* Current Newspapers */}
//       {collectionData?.currentNewspapers && collectionData.currentNewspapers.length > 0 && (
//         <section className="py-16 bg-background">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Current Newspapers</h2>
//             <Card className="card-premium overflow-x-auto">
//               <CardContent>
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
//                       <th className="p-3">S.No.</th>
//                       <th className="p-3">Name of Newspaper</th>
//                       <th className="p-3">Language</th>
//                       <th className="p-3">Edition</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-muted-foreground">
//                     {collectionData.currentNewspapers.map((newspaper, index) => (
//                       <tr key={index}>
//                         <td className="p-3">{index + 1}</td>
//                         <td className="p-3">{newspaper.name}</td>
//                         <td className="p-3">{newspaper.language}</td>
//                         <td className="p-3">{newspaper.edition}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       )}

//       {/* Current Magazines */}
//       {collectionData?.currentMagazines && collectionData.currentMagazines.length > 0 && (
//         <section className="py-16 bg-background-secondary">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Current Magazines</h2>
//             <Card className="card-premium overflow-x-auto">
//               <CardContent>
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
//                       <th className="p-3">S.No.</th>
//                       <th className="p-3">Name of Magazine</th>
//                       <th className="p-3">Copies</th>
//                       <th className="p-3">Literature</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-muted-foreground">
//                     {collectionData.currentMagazines.map((magazine) => (
//                       <tr key={magazine.serialNo}>
//                         <td className="p-3">{magazine.serialNo}</td>
//                         <td className="p-3">{magazine.name}</td>
//                         <td className="p-3">{magazine.copies}</td>
//                         <td className="p-3">{magazine.literature}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Collection;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { BookOpen, Newspaper, FileText, Library } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { RootState } from '../redux/store';
import { fetchCollectionForAdmin } from '../redux/slices/collectionSlice';
import { useTranslation } from 'react-i18next';

const Collection: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: collectionData, loading } = useSelector((state: RootState) => state.collection);

  useEffect(() => {
    dispatch(fetchCollectionForAdmin() as any);
  }, [dispatch]);

  if (loading && !collectionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('collection.hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              {t('collection.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="card-premium">
            <CardContent className="p-8 text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {collectionData?.diverseCollectionText}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Old Newspapers */}
      {collectionData?.oldBoundVolumes && collectionData.oldBoundVolumes.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                {t('collection.sections.oldNewspapers')}
              </h2>
            </motion.div>

            <Card className="card-premium overflow-x-auto">
              <CardContent>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                      <th className="p-3">{t('collection.tables.serialNo')}</th>
                      <th className="p-3">{t('collection.tables.newspaperName')}</th>
                      <th className="p-3">{t('collection.tables.duration')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {collectionData.oldBoundVolumes.map((volume, index) => (
                      <tr key={index}>
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{volume.name}</td>
                        <td className="p-3">{volume.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Old Magazines */}
      {collectionData?.oldMagazines && collectionData.oldMagazines.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 gradient-text text-center">
              {t('collection.sections.oldMagazines')}
            </h2>
            <Card className="card-premium overflow-x-auto">
              <CardContent>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                      <th className="p-3">{t('collection.tables.serialNo')}</th>
                      <th className="p-3">{t('collection.tables.publicationName')}</th>
                      <th className="p-3">{t('collection.tables.duration')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {collectionData.oldMagazines.map((magazine, index) => (
                      <tr key={index}>
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{magazine.name}</td>
                        <td className="p-3">{magazine.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Gazettes */}
      {collectionData?.gazettes && collectionData.gazettes.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">
              {t('collection.sections.gazettes')}
            </h2>
            <Card className="card-premium p-8">
              <div className="text-lg leading-relaxed text-muted-foreground">
                {collectionData.gazettes.map((gazette, index) => (
                  <p key={index}>{gazette.name} – {gazette.duration}</p>
                ))}
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Current Newspapers */}
      {collectionData?.currentNewspapers && collectionData.currentNewspapers.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 gradient-text text-center">
              {t('collection.sections.currentNewspapers')}
            </h2>
            <Card className="card-premium overflow-x-auto">
              <CardContent>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                      <th className="p-3">{t('collection.tables.serialNo')}</th>
                      <th className="p-3">{t('collection.tables.newspaperName')}</th>
                      <th className="p-3">{t('collection.tables.language')}</th>
                      <th className="p-3">{t('collection.tables.edition')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {collectionData.currentNewspapers.map((newspaper, index) => (
                      <tr key={index}>
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{newspaper.name}</td>
                        <td className="p-3">{newspaper.language}</td>
                        <td className="p-3">{newspaper.edition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Current Magazines */}
      {collectionData?.currentMagazines && collectionData.currentMagazines.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 gradient-text text-center">
              {t('collection.sections.currentMagazines')}
            </h2>
            <Card className="card-premium overflow-x-auto">
              <CardContent>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                      <th className="p-3">{t('collection.tables.serialNo')}</th>
                      <th className="p-3">{t('collection.tables.publicationName')}</th>
                      <th className="p-3">{t('collection.tables.copies')}</th>
                      <th className="p-3">{t('collection.tables.literature')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {collectionData.currentMagazines.map((magazine) => (
                      <tr key={magazine.serialNo}>
                        <td className="p-3">{magazine.serialNo}</td>
                        <td className="p-3">{magazine.name}</td>
                        <td className="p-3">{magazine.copies}</td>
                        <td className="p-3">{magazine.literature}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default Collection;