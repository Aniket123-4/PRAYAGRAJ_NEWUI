// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/button';
// import { ArrowLeft, Save, Edit, Trash2 } from 'lucide-react';

// const BlogForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [blogData, setBlogData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     image: null as File | null
//   });

//   const blogs = [
//     {
//       id: 1,
//       title: 'Book Search and Reservation',
//       description: 'Allows users to search for books, magazines, or manuscripts from the library\'s digital catalog. Features: Real-time book availability status. Reserve a book for pick-up.',
//       location: 'EServices',
//       image: 'image'
//     },
//     {
//       id: 2,
//       title: 'About Title',
//       description: 'About Description',
//       location: 'AboutUs',
//       image: 'image'
//     }
//   ];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Blog data:', blogData);
//     alert('Blog submitted successfully!');
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setBlogData({ ...blogData, image: event.target.files[0] });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-4 mb-6">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => navigate('/admin')}
//             className="border-border text-primary hover:bg-background-secondary"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Dashboard
//           </Button>
//           <h1 className="text-2xl font-bold text-foreground">Blog Form</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Blog Form */}
//           <div className="bg-card rounded-lg shadow-sm border border-border p-6">
//             <form onSubmit={handleSubmit}>
//               {/* Title Section */}
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-foreground mb-4">Title</h2>
//                 <input
//                   type="text"
//                   value={blogData.title}
//                   onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
//                   className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//                   placeholder="Enter blog title"
//                 />
//                 <div className="flex items-center mt-2">
//                   <input type="checkbox" id="saveTitle" className="mr-2 rounded border-input text-primary focus:ring-ring" />
//                   <label htmlFor="saveTitle" className="text-sm text-foreground">
//                     Save Title to Image
//                   </label>
//                 </div>
//               </div>

//               <div className="border-t border-border my-6"></div>

//               {/* Description Section */}
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
//                 <textarea
//                   value={blogData.description}
//                   onChange={(e) => setBlogData({ ...blogData, description: e.target.value })}
//                   rows={4}
//                   className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//                   placeholder="Write Description"
//                 />
//               </div>

//               <div className="border-t border-border my-6"></div>

//               {/* Status & Location */}
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-foreground mb-4">Status</h2>
//                 <select
//                   value={blogData.location}
//                   onChange={(e) => setBlogData({ ...blogData, location: e.target.value })}
//                   className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//                 >
//                   <option value="">Select Location</option>
//                   <option value="EServices">EServices</option>
//                   <option value="AboutUs">AboutUs</option>
//                 </select>
//               </div>

//               {/* Upload Photo */}
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-foreground mb-4">UPLOAD PHOTO</h2>
//                 <div className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-background">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     id="blog-image-upload"
//                   />
//                   <label
//                     htmlFor="blog-image-upload"
//                     className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-block"
//                   >
//                     Choose File
//                   </label>
//                   <p className="text-xs text-muted-foreground mt-2">
//                     {blogData.image ? blogData.image.name : 'No file chosen'}
//                   </p>
//                   <p className="text-xs text-muted-foreground mt-1">(Allowed 5MB Max.)</p>
//                 </div>
//               </div>

//               <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
//                 SUBMIT DETAILS
//               </Button>
//             </form>
//           </div>

//           {/* Blogs Table */}
//           <div className="bg-card rounded-lg shadow-sm border border-border p-6">
//             <h2 className="text-lg font-semibold text-foreground mb-4">Existing Blogs</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-background-secondary">
//                     <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Title</th>
//                     <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Description</th>
//                     <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Location</th>
//                     <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Image</th>
//                     <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {blogs.map((blog) => (
//                     <tr key={blog.id} className="border-t border-border">
//                       <td className="px-4 py-2 text-sm text-foreground">{blog.title}</td>
//                       <td className="px-4 py-2 text-sm text-foreground max-w-xs truncate">{blog.description}</td>
//                       <td className="px-4 py-2 text-sm text-foreground">{blog.location}</td>
//                       <td className="px-4 py-2 text-sm text-foreground">{blog.image}</td>
//                       <td className="px-4 py-2">
//                         <div className="flex gap-2">
//                           <Button size="sm" variant="outline" className="h-8">
//                             <Edit className="h-3 w-3 mr-1" />
//                             UPDATE
//                           </Button>
//                           <Button size="sm" variant="outline" className="h-8 text-red-600 border-red-200 hover:bg-red-50">
//                             <Trash2 className="h-3 w-3 mr-1" />
//                             DELETE
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogForm;












import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, User, Lock, BookOpen, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useTheme();
  const t = useTranslation();

  const { loading, error, token } = useSelector((state: any) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Username and password are required");
      return;
    }

    try {
      const resultAction = await dispatch(
        loginUser({ loginName: username, password }) as any
      );

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        const from = location.state?.from?.pathname || "/admin";
        navigate(from, { replace: true });
      } else if (loginUser.rejected.match(resultAction)) {
        toast.error("Invalid credentials or server error.");
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
    }
  };

  const handleBack = () => navigate(-1);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const buttonGradient = "bg-gradient-to-r from-primary to-primary-light";
  const buttonHoverGradient = "hover:from-primary-dark hover:to-primary";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm sm:max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground hover:text-primary p-2 h-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Library Admin
            </span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border border-border bg-card overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-light p-4 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-white">
              Admin Login
            </CardTitle>
          </div>

          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-10 text-sm bg-background border-input focus:ring-2 focus:ring-ring"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 text-sm bg-background border-input focus:ring-2 focus:ring-ring"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-xs text-center text-red-600 bg-red-50 border border-red-200 rounded p-2">
                  {error}
                </p>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className={`w-full h-10 ${buttonGradient} ${buttonHoverGradient} text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4"
        >
          <div className="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400">
            <Shield className="h-3 w-3" />
            <span className="text-xs">Secure Access • Prayagraj Public Library</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
