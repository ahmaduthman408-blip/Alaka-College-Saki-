import React, { useState } from 'react';
import { useSiteData } from '../context/SiteContext';
import { Save, Plus, Trash2, Edit3, Image as ImageIcon, Video, LogIn, Upload, ArrowLeft, Building } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('adminAuth') === 'true');
  const [activeTab, setActiveTab] = useState<'hero' | 'gallery' | 'videos' | 'facilities'>('hero');
  const { data, updateData } = useSiteData();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Abu Nasir') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      alert('Incorrect Password');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64Str: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB for browser storage limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <div className="flex justify-center mb-6">
             <div className="h-16 w-16 bg-blue-900 rounded-xl flex items-center justify-center text-white">
                <LogIn className="h-8 w-8" />
             </div>
          </div>
          <h2 className="text-2xl font-extrabold text-center mb-6 text-slate-900">Admin Login</h2>
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Enter admin password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <Link to="/" className="flex items-center gap-2 mb-8 text-slate-400 hover:text-white transition">
           <ArrowLeft className="h-4 w-4" /> Back to Website
        </Link>
        <h2 className="text-xl font-extrabold mb-8 text-blue-400">Admin Dashboard</h2>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm ${activeTab === 'hero' ? 'bg-blue-900' : 'hover:bg-slate-800'}`}
          >
            <Edit3 className="h-4 w-4" /> Content & Hero
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm ${activeTab === 'gallery' ? 'bg-blue-900' : 'hover:bg-slate-800'}`}
          >
            <ImageIcon className="h-4 w-4" /> Gallery Images
          </button>
          <button 
            onClick={() => setActiveTab('facilities')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm ${activeTab === 'facilities' ? 'bg-blue-900' : 'hover:bg-slate-800'}`}
          >
            <Building className="h-4 w-4" /> Facilities
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm ${activeTab === 'videos' ? 'bg-blue-900' : 'hover:bg-slate-800'}`}
          >
            <Video className="h-4 w-4" /> Video Links
          </button>
        </div>

        <div className="mt-auto pt-8">
          <button 
            onClick={() => {
              setIsAuthenticated(false);
              sessionStorage.removeItem('adminAuth');
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <LogIn className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        
        {activeTab === 'hero' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900 border-b pb-4">Content & Hero Settings</h3>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-lg mb-4">Hero Background Image</h4>
              <div className="flex gap-4 items-center">
                 <img src={data.heroImage} alt="Hero" className="w-32 h-20 object-cover rounded shadow" />
                 <div className="flex-1 space-y-3">
                    <input 
                      type="text" 
                      value={data.heroImage}
                      onChange={(e) => updateData({ heroImage: e.target.value })}
                      className="w-full px-4 py-2 text-sm border rounded"
                      placeholder="Image URL"
                    />
                    <label className="flex items-center gap-2 bg-slate-100 border border-slate-300 px-4 py-2 rounded text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-200 w-fit">
                      <Upload className="h-4 w-4" /> Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (res) => updateData({heroImage: res}))} />
                    </label>
                 </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <h4 className="font-bold text-lg">Hero Texts</h4>
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Title Part 1</label>
                 <input type="text" value={data.heroTitle1} onChange={e => updateData({heroTitle1: e.target.value})} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Title Part 2 (Highlighted)</label>
                 <input type="text" value={data.heroTitle2} onChange={e => updateData({heroTitle2: e.target.value})} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Subtitle</label>
                 <textarea value={data.heroSubtitle} onChange={e => updateData({heroSubtitle: e.target.value})} className="w-full px-4 py-2 border rounded resize-y" rows={3}></textarea>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-lg mb-4">Other Images</h4>
              
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 mb-2">Welcome Section Image</label>
                <div className="flex gap-4 items-center">
                  <img src={data.welcomeImage} className="w-20 h-20 object-cover rounded shadow" />
                  <div className="flex-1 space-y-2">
                    <input type="text" value={data.welcomeImage} onChange={e => updateData({welcomeImage: e.target.value})} className="w-full px-4 py-2 text-sm border rounded" />
                    <label className="flex items-center gap-2 bg-slate-100 border border-slate-300 px-4 py-2 rounded text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-200 w-fit">
                      <Upload className="h-4 w-4" /> Upload
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (res) => updateData({welcomeImage: res}))} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Principal Photo</label>
                <div className="flex gap-4 items-center">
                  <img src={data.principalImage} className="w-20 h-20 object-cover rounded shadow" />
                  <div className="flex-1 space-y-2">
                    <input type="text" value={data.principalImage} onChange={e => updateData({principalImage: e.target.value})} className="w-full px-4 py-2 text-sm border rounded" />
                    <label className="flex items-center gap-2 bg-slate-100 border border-slate-300 px-4 py-2 rounded text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-200 w-fit">
                      <Upload className="h-4 w-4" /> Upload
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (res) => updateData({principalImage: res}))} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <h3 className="text-2xl font-extrabold text-slate-900">Gallery Management</h3>
               <button 
                 onClick={() => updateData({ gallery: [...data.gallery, ""] })}
                 className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded font-bold hover:bg-blue-800"
               >
                 <Plus className="h-4 w-4" /> Add Image
               </button>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
               {data.gallery.map((img, i) => (
                 <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative group">
                   {img ? (
                     <img src={img} alt={`Gallery ${i}`} className="w-full h-40 object-cover rounded mb-4" />
                   ) : (
                     <div className="w-full h-40 bg-slate-100 rounded mb-4 flex items-center justify-center text-slate-400">No Image</div>
                   )}
                   <input 
                     type="text" 
                     value={img} 
                     onChange={(e) => {
                       const newGallery = [...data.gallery];
                       newGallery[i] = e.target.value;
                       updateData({ gallery: newGallery });
                     }}
                     placeholder="Image URL"
                     className="w-full px-3 py-2 border rounded text-sm mb-2"
                   />
                   <label className="flex items-center justify-center gap-2 bg-slate-100 border border-slate-300 px-4 py-2 rounded text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-200 mb-2">
                      <Upload className="h-4 w-4" /> Upload Instead
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (res) => {
                         const newGallery = [...data.gallery];
                         newGallery[i] = res;
                         updateData({ gallery: newGallery });
                      })} />
                   </label>
                   <button 
                     onClick={() => {
                        const newGallery = data.gallery.filter((_, idx) => idx !== i);
                        updateData({ gallery: newGallery });
                     }}
                     className="mt-2 text-red-500 flex items-center gap-1 text-sm font-bold hover:text-red-700"
                   >
                     <Trash2 className="h-4 w-4" /> Remove
                   </button>
                 </div>
               ))}
               {data.gallery.length === 0 && (
                 <div className="col-span-2 text-center text-slate-500 py-10">No images in gallery.</div>
               )}
            </div>
          </motion.div>
        )}

        {activeTab === 'facilities' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
               <h3 className="text-2xl font-extrabold text-slate-900">Facilities</h3>
               <button 
                 onClick={() => updateData({ facilities: [...data.facilities, { title: "New Facility", description: "", image1: "", image2: "", reverse: false }] })}
                 className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded font-bold hover:bg-blue-800"
               >
                 <Plus className="h-4 w-4" /> Add Facility
               </button>
            </div>
            <div className="space-y-6">
              {data.facilities.map((fac, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex justify-between items-start mb-4">
                     <h4 className="font-bold text-lg">Facility {i + 1}</h4>
                     <button 
                       onClick={() => {
                          const newFac = data.facilities.filter((_, idx) => idx !== i);
                          updateData({ facilities: newFac });
                       }}
                       className="p-2 text-red-500 hover:bg-red-50 rounded"
                     >
                       <Trash2 className="h-5 w-5" />
                     </button>
                   </div>
                   <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                        <input type="text" value={fac.title} onChange={e => {
                          const newFac = [...data.facilities];
                          newFac[i].title = e.target.value;
                          updateData({ facilities: newFac });
                        }} className="w-full px-4 py-2 border rounded" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                        <textarea value={fac.description} onChange={e => {
                          const newFac = [...data.facilities];
                          newFac[i].description = e.target.value;
                          updateData({ facilities: newFac });
                        }} className="w-full px-4 py-2 border rounded resize-y" rows={3}></textarea>
                      </div>
                      
                      {/* Image 1 */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Image 1</label>
                        <div className="flex gap-4 items-center">
                          {fac.image1 ? <img src={fac.image1} className="w-20 h-20 object-cover rounded shadow" /> : <div className="w-20 h-20 bg-slate-100 rounded"></div>}
                          <div className="flex-1 space-y-2">
                            <input type="text" value={fac.image1} onChange={e => {
                               const newFac = [...data.facilities];
                               newFac[i].image1 = e.target.value;
                               updateData({ facilities: newFac });
                            }} className="w-full px-4 py-2 text-sm border rounded" placeholder="Image URL" />
                            <label className="flex items-center gap-2 bg-slate-100 border border-slate-300 px-4 py-2 rounded text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-200 w-fit">
                              <Upload className="h-4 w-4" /> Upload
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (res) => {
                                 const newFac = [...data.facilities];
                                 newFac[i].image1 = res;
                                 updateData({ facilities: newFac });
                              })} />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Image 2 */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Image 2</label>
                        <div className="flex gap-4 items-center">
                          {fac.image2 ? <img src={fac.image2} className="w-20 h-20 object-cover rounded shadow" /> : <div className="w-20 h-20 bg-slate-100 rounded"></div>}
                          <div className="flex-1 space-y-2">
                            <input type="text" value={fac.image2} onChange={e => {
                               const newFac = [...data.facilities];
                               newFac[i].image2 = e.target.value;
                               updateData({ facilities: newFac });
                            }} className="w-full px-4 py-2 text-sm border rounded" placeholder="Image URL" />
                            <label className="flex items-center gap-2 bg-slate-100 border border-slate-300 px-4 py-2 rounded text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-200 w-fit">
                              <Upload className="h-4 w-4" /> Upload
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (res) => {
                                 const newFac = [...data.facilities];
                                 newFac[i].image2 = res;
                                 updateData({ facilities: newFac });
                              })} />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 pt-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={fac.reverse || false} onChange={e => {
                            const newFac = [...data.facilities];
                            newFac[i].reverse = e.target.checked;
                            updateData({ facilities: newFac });
                          }} className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm font-bold text-slate-700">Reverse Layout</span>
                        </label>
                      </div>
                   </div>
                </div>
              ))}
              {data.facilities.length === 0 && (
                <div className="text-center text-slate-500 py-10 bg-white rounded-xl border border-slate-200 border-dashed">
                  No facilities added yet. Click "Add Facility" to begin.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'videos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
             <div className="flex justify-between items-center border-b pb-4">
               <h3 className="text-2xl font-extrabold text-slate-900">Video Links</h3>
               <button 
                 onClick={() => updateData({ videos: [...data.videos, { id: Date.now().toString(), title: "New Video", url: "" }] })}
                 className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded font-bold hover:bg-blue-800"
               >
                 <Plus className="h-4 w-4" /> Add Video
               </button>
             </div>

             <div className="space-y-4">
                {data.videos.map((vid, i) => (
                  <div key={vid.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex gap-4 items-start">
                     <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Video Title</label>
                          <input 
                            type="text" 
                            value={vid.title}
                            onChange={(e) => {
                              const newVids = [...data.videos];
                              newVids[i] = { ...vid, title: e.target.value };
                              updateData({ videos: newVids });
                            }}
                            className="w-full px-4 py-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">YouTube URL / Embed Link</label>
                          <input 
                            type="text" 
                            value={vid.url}
                            onChange={(e) => {
                              const newVids = [...data.videos];
                              newVids[i] = { ...vid, url: e.target.value };
                              updateData({ videos: newVids });
                            }}
                            placeholder="https://www.youtube.com/embed/..."
                            className="w-full px-4 py-2 border rounded text-sm"
                          />
                        </div>
                     </div>
                     <button 
                       onClick={() => {
                          const newVids = data.videos.filter(v => v.id !== vid.id);
                          updateData({ videos: newVids });
                       }}
                       className="p-2 text-red-500 hover:bg-red-50 rounded"
                     >
                       <Trash2 className="h-5 w-5" />
                     </button>
                  </div>
                ))}
                {data.videos.length === 0 && (
                   <div className="text-center text-slate-500 py-10 bg-white rounded-xl border border-slate-200 border-dashed">
                      No videos added yet. Click "Add Video" to begin.
                   </div>
                )}
             </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
