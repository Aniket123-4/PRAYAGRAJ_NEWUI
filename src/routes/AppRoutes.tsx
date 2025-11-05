import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ScrollToTop from "../components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute

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
          
          {/* Public Routes */}
          <Route path="services/services" element={<Services />} />
          <Route path="services/e-services" element={<EServices />} />
          <Route path="membership" element={<Membership />} />
          <Route path="collection" element={<Collection />} />
          <Route path="archives/history" element={<History />} />
          <Route path="archives/gallery" element={<Gallery />} />
          <Route path="manuscript" element={<Manuscript />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tender" element={<Tender />} />

          {/* Other Public Pages */}
          <Route path="important-links" element={<ImportantLinks />} />
          <Route path="gazette" element={<Gazette />} />
          <Route path="magazine" element={<Magazine />} />
          <Route path="pandulipi-sanskriti" element={<PandulipiSanskriti />} />
          <Route path="old-bound-newspapers" element={<OldBoundNewspapers />} />
          <Route path="newspapers-availability" element={<NewspapersAvailability />} />

          {/* 🔐 PROTECTED ADMIN ROUTES */}
          <Route 
            path="admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/about" 
            element={
              <ProtectedRoute>
                <AboutUsForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/collection" 
            element={
              <ProtectedRoute>
                <CollectionForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/blogs" 
            element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/gallery" 
            element={
              <ProtectedRoute>
                <GalleryUpload />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/manuscript" 
            element={
              <ProtectedRoute>
                <ManuscriptForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/history" 
            element={
              <ProtectedRoute>
                <EditHistory />
              </ProtectedRoute>
            } 
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;