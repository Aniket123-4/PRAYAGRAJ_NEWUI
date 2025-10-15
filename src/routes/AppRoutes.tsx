import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ScrollToTop from "../components/ScrollToTop";

// Pages
import Home from "../pages/Home";
import Membership from "../pages/Membership";
import About from "../pages/About";
import Services from "../pages/Services";
import NotFound from "../pages/NotFound";
import Collection from "../pages/Collection";
import History from "../pages/Archives/History";
import Gallery from "../pages/Archives/Gallery";
import Manuscript from "../pages/Manuscript";
import Contact from "../pages/Contact";
import Tender from "../pages/Tender";
import EServices from "../pages/E-Service";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";
import AboutUsForm from "../pages/AdminPages/AboutUsForm";
import CollectionForm from "../pages/AdminPages/CollectionForm";
import BlogForm from "../pages/AdminPages/BlogForm";
import GalleryUpload from "../pages/AdminPages/GalleryUpload";
import ManuscriptForm from "../pages/AdminPages/ManuscriptForm";
import EditHistory from "../pages/AdminPages/EditHistory";
import ImportantLinks from "../pages/ImportantLinks";
import Gazette from "../pages/Gazette";
import Magazine from "../pages/Magazine";
import PandulipiSanskriti from "../pages/PandulipiSanskriti";
import OldBoundNewspapers from "../pages/OldBoundNewspapers";
import NewspapersAvailability from "../pages/NewspapersAvailability";

const AppRoutes = () => {
  return (

    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminDashboard />} />

          <Route path="services/services" element={<Services />} />
          <Route path="services/e-services" element={<EServices />} />
          <Route path="membership" element={<Membership />} />
          <Route path="collection" element={<Collection />} />
          <Route path="archives/history" element={<History />} />
          <Route path="archives/gallery" element={<Gallery />} />
          <Route path="manuscript" element={<Manuscript />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tender" element={<Tender />} />

          {/* Admin Pages */}
          <Route path="admin/about" element={<AboutUsForm />} />
          <Route path="admin/collection" element={<CollectionForm />} />
          <Route path="admin/blogs" element={<BlogForm />} />
          <Route path="admin/gallery" element={<GalleryUpload />} />
          <Route path="admin/manuscript" element={<ManuscriptForm />} />
          <Route path="admin/history" element={<EditHistory />} />

          {/* Other Pages */}
          <Route path="important-links" element={<ImportantLinks />} />
          <Route path="gazette" element={<Gazette />} />
          <Route path="magazine" element={<Magazine />} />
          <Route path="pandulipi-sanskriti" element={<PandulipiSanskriti />} />
          <Route path="old-bound-newspapers" element={<OldBoundNewspapers />} />
          <Route path="newspapers-availability" element={<NewspapersAvailability />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
