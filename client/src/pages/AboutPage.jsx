import React from 'react';
import { Compass, Sparkles, Code, Server, Database, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-golden rounded-3xl p-8 lg:p-12 text-white shadow-glow relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <span>✈️</span>
            <span>About Traverge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Smart Travel Planning Platform
          </h1>
          <p className="text-base sm:text-lg font-medium text-yellow-100 leading-relaxed">
            Traverge is designed to make travel planning simple by bringing destination discovery, accommodation suggestions, weather information, budgeting, and itinerary planning together in one platform.
          </p>
        </div>
      </div>

      {/* Core Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center font-bold text-2xl">
            🎯
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">The Problem We Solve</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Travelers today jump across multiple tabs for destination research, weather forecasts, hotel availability, and Excel spreadsheets for budgeting. Traverge unifies all these essential steps into a cohesive, intelligent 60-second workflow.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl">
            🚀
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Developer Portfolio Tech Product</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Built as a production-grade full-stack web application showcasing modular MVC backend architecture (Express + Node.js), robust database modeling (MongoDB), real-time external Weather API integration, and responsive UI design (React + Tailwind CSS).
          </p>
        </div>

      </div>

      {/* Tech Architecture Stack */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Engineering Architecture
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Full-Stack Tech Architecture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Code className="w-6 h-6 text-brand-orange" />
            <h3 className="text-sm font-extrabold text-slate-900">React Frontend</h3>
            <p className="text-xs text-slate-500 font-medium">Vite + React Router DOM + Tailwind CSS with custom Orange & Golden Yellow theme.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Server className="w-6 h-6 text-amber-500" />
            <h3 className="text-sm font-extrabold text-slate-900">Express REST API</h3>
            <p className="text-xs text-slate-500 font-medium">Clean MVC architecture with controllers, services, middleware, and route modules.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Database className="w-6 h-6 text-emerald-600" />
            <h3 className="text-sm font-extrabold text-slate-900">MongoDB Database</h3>
            <p className="text-xs text-slate-500 font-medium">Mongoose schemas for Destinations, Hotels, Trips, and Itineraries with in-memory fallback.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h3 className="text-sm font-extrabold text-slate-900">Smart Engine</h3>
            <p className="text-xs text-slate-500 font-medium">Rules-based recommendation service and dynamic day-wise itinerary generator.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-brand-orange to-brand-golden p-8 rounded-3xl text-white text-center space-y-4 shadow-glow">
        <h2 className="text-2xl font-extrabold">Ready to Explore Traverge?</h2>
        <div className="flex justify-center gap-4">
          <Link
            to="/itinerary"
            className="px-6 py-3 rounded-2xl bg-white text-brand-orange font-bold text-xs shadow-md hover:scale-105 transition-all"
          >
            Start Trip Planner
          </Link>
          <Link
            to="/indian-trips"
            className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
          >
            Browse Destinations
          </Link>
        </div>
      </div>

    </div>
  );
}
