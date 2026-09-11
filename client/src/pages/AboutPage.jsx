import React from 'react';
import { Compass, Sparkles, Code, Server, Database, Target, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-8 lg:p-12 text-white shadow-card-dark border border-[#232E3C] space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B0F14] text-[#FFF449] border border-[#232E3C] text-xs font-extrabold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-[#B2D959]" />
          <span>About Traverge</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Smart Travel Planning Platform
        </h1>
        <p className="text-base sm:text-lg font-normal text-gray-400 max-w-3xl leading-relaxed">
          Traverge is designed to make travel planning simple by bringing destination discovery, accommodation suggestions, weather information, budgeting, and itinerary planning together in one platform.
        </p>
      </div>

      {/* Core Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="interactive-card bg-[#131920] rounded-3xl p-8 shadow-card-dark border border-[#232E3C] hover:border-[#FFF449]/50 transition-all duration-300 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">The Problem We Solve</h2>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">
            Travelers today jump across multiple tabs for destination research, weather forecasts, hotel availability, and Excel spreadsheets for budgeting. Traverge unifies all these essential steps into a cohesive, intelligent 60-second workflow.
          </p>
        </div>

        <div className="interactive-card bg-[#131920] rounded-3xl p-8 shadow-card-dark border border-[#232E3C] hover:border-[#B2D959]/50 transition-all duration-300 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-brand text-[#0B0F14] flex items-center justify-center font-bold shadow-glow-yellow">
            <Rocket className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Developer Portfolio Tech Product</h2>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">
            Built as a production-grade full-stack web application showcasing modular MVC backend architecture (Express + Node.js), robust database modeling (MongoDB), real-time external Weather API integration, and responsive UI design (React + Tailwind CSS).
          </p>
        </div>

      </div>

      {/* Tech Architecture Stack */}
      <div className="interactive-card bg-[#131920] rounded-3xl p-8 shadow-card-dark border border-[#232E3C] space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#B2D959]">
            Engineering Architecture
          </span>
          <h2 className="text-2xl font-black text-white">Full-Stack Tech Architecture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-[#0B0F14] border border-[#232E3C] space-y-2">
            <Code className="w-6 h-6 text-[#FFF449]" />
            <h3 className="text-sm font-bold text-white">React Frontend</h3>
            <p className="text-xs text-gray-400 font-normal">Vite + React Router DOM + Tailwind CSS with dark theme and yellow-green accents.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0F14] border border-[#232E3C] space-y-2">
            <Server className="w-6 h-6 text-[#B2D959]" />
            <h3 className="text-sm font-bold text-white">Express REST API</h3>
            <p className="text-xs text-gray-400 font-normal">Clean MVC architecture with controllers, services, middleware, and route modules.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0F14] border border-[#232E3C] space-y-2">
            <Database className="w-6 h-6 text-[#7EC151]" />
            <h3 className="text-sm font-bold text-white">MongoDB Database</h3>
            <p className="text-xs text-gray-400 font-normal">Mongoose schemas for Destinations, Hotels, Trips, and Itineraries with in-memory fallback.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0F14] border border-[#232E3C] space-y-2">
            <Sparkles className="w-6 h-6 text-[#FED24F]" />
            <h3 className="text-sm font-bold text-white">Smart Engine</h3>
            <p className="text-xs text-gray-400 font-normal">Rules-based recommendation service and dynamic day-wise itinerary generator.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="interactive-card bg-[#131920] p-8 lg:p-12 rounded-3xl text-white text-center space-y-6 shadow-card-dark border border-[#232E3C]">
        <h2 className="text-2xl sm:text-3xl font-black text-white">Ready to Explore Traverge?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/itinerary"
            className="px-8 py-3.5 rounded-xl bg-gradient-brand hover:bg-gradient-brand-hover text-[#0B0F14] font-black text-xs shadow-glow-yellow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>Start Trip Planner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/indian-trips"
            className="px-8 py-3.5 rounded-xl bg-[#0B0F14] text-white font-bold text-xs border border-[#232E3C] hover:border-[#FFF449] shadow-card-dark hover:scale-105 transition-all flex items-center justify-center"
          >
            Browse Destinations
          </Link>
        </div>
      </div>

    </div>
  );
}
