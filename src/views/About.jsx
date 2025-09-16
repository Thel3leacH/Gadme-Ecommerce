import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  Globe,
  Camera,
  Link,
  Star,
  Award,
  Zap,
  X,
  Edit,
} from "lucide-react";

export default function About() {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "BOSS",
      role: "CEO & Founder",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gradient: "from-teal-400 to-teal-600",
    },
    {
      name: "BOOM",
      role: "CTO",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      name: "GAM",
      role: "CPO",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gradient: "from-cyan-400 to-cyan-600",
    },
    {
      name: "EVE",
      role: "CMO",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      name: "GOLF",
      role: "COO",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gradient: "from-emerald-500 to-cyan-500",
    },
  ]);

  const [editingMember, setEditingMember] = useState(null);
  const [tempImageUrl, setTempImageUrl] = useState("");

  const handleSaveImage = () => {
    if (editingMember !== null) {
      setTeamMembers((prev) =>
        prev.map((member, index) =>
          index === editingMember
            ? { ...member, imageUrl: tempImageUrl.trim() }
            : member
        )
      );
    }
    setEditingMember(null);
    setTempImageUrl("");
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setTempImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Hero Section - Apple Style */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_50%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-thin text-slate-800 mb-6 tracking-tight">
            About{" "}
            <span className="font-medium bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              GadMe
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            We connect people with the smartest gadgets, powered by AI
            recommendations that understand your lifestyle.
          </p>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>
      </section>

      {/* Mission & Vision - Enhanced Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To make technology accessible by providing personalized gadget
                  recommendations for everyone, everywhere.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To become the world's leading gadget discovery platform with
                  global reach and unmatched intelligence.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Our Values
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Innovation, trust, and customer-first approach drive
                  everything we do in this connected world.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-light mb-12">Why Choose GadMe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Star className="mb-4" size={40} />
              <div className="text-4xl font-thin mb-2">50K+</div>
              <div className="text-teal-100">Happy Customers</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="mb-4" size={40} />
              <div className="text-4xl font-thin mb-2">10K+</div>
              <div className="text-teal-100">Gadgets Reviewed</div>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="mb-4" size={40} />
              <div className="text-4xl font-thin mb-2">99%</div>
              <div className="text-teal-100">AI Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced with Image URL Management */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-5xl font-thin text-slate-800 mb-6">
            Meet Our Leadership Team
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            GadMe is built by passionate visionaries, engineers, and innovators
            who believe in the transformative power of smart technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {teamMembers.map((member, idx) => (
            <Card
              key={idx}
              className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-white/90 backdrop-blur-sm relative"
            >
              <CardContent className="p-6 relative">
                <div className="relative mb-6">
                  <div
                    className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${member.gradient} p-1 shadow-xl`}
                  >
                    {member.imageUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              member.imageUrl
                            );
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div
                          className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                          style={{ display: "none" }}
                        >
                          <Camera className="text-white/80" size={32} />
                        </div>
                        {/* Remove Image Button */}
                        {/* <button
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <X size={12} className="text-white" />
                        </button> */}
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center">
                        <Camera className="text-white/80 mb-1" size={24} />
                        <span className="text-white/60 text-xs">Add Photo</span>
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-slate-800 mb-1">
                  {member.name}
                </h4>
                <p className="text-slate-600 text-sm font-medium">
                  {member.role}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Image URL Edit Modal */}
      {editingMember !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                Add Photo for {teamMembers[editingMember].name}
              </h3>
              <p className="text-slate-600 text-sm">
                Enter a URL for the profile image
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={tempImageUrl}
                  onChange={(e) => setTempImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && tempImageUrl.trim()) {
                      handleSaveImage();
                    }
                  }}
                />
              </div>

              {/* Preview */}
              {tempImageUrl && (
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-2">Preview:</p>
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={tempImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-full flex items-center justify-center text-gray-400 text-xs"
                      style={{ display: "none" }}
                    >
                      Invalid URL
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveImage}
                  disabled={!tempImageUrl.trim()}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Photo
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="flex-1 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-medium"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Apple Style */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-thin text-slate-800 mb-6">
            Join Us on Our{" "}
            <span className="font-medium bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Be part of the future of gadget discovery and AI-powered shopping
            experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-2xl px-12 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 rounded-2xl px-12 py-4 text-lg font-medium transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-teal-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-200/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}
