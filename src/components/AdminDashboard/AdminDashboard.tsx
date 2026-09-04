"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Camera, 
  Film, 
  Sparkles, 
  MessageSquareQuote, 
  Mail, 
  Image as ImageIcon, 
  RefreshCw, 
  ArrowUpRight,
  SlidersHorizontal,
  Settings,
  Users as UsersIcon
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import "./styles/dashboard-custom.css";

// Luxury Studio Gold Palette for Charts
const PIE_COLORS = [
  "#F5B301", // Gold primary
  "#FFD04A", // Bright gold
  "#C8920A", // Deep amber gold
  "#10B981", // Emerald
  "#6366F1", // Indigo
  "#EC4899", // Rose
  "#06B6D4", // Cyan
  "#8B5CF6", // Purple
];

const BAR_COLORS = [
  "#F5B301", // Gold
  "#10B981", // Emerald
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#8B5CF6", // Purple
];

type StudioDashboardStats = {
  totalPortfolio: number;
  totalFilms: number;
  totalServices: number;
  totalTestimonials: number;
  totalSubmissions: number;
  totalAlbums: number;
  totalMedia: number;
  totalUsers: number;
  totalPosts: number;
  totalPages: number;
  portfolioByCategory: Array<{ name: string; value: number }>;
  filmsByCategory: Array<{ name: string; count: number }>;
  contentOverview: Array<{ name: string; count: number; fill: string }>;
  submissionsBreakdown: Array<{ name: string; count: number; fill: string }>;
};

// Custom Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rp-chart-tooltip-box">
        <p style={{ margin: "0 0 4px 0", fontWeight: 700, color: "#F5B301" }}>{label || data.name}</p>
        <p style={{ margin: 0 }}>
          Count: <span style={{ fontWeight: 800, color: "#ffffff", fontFamily: "monospace" }}>{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StudioDashboardStats | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/dashboard-stats", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error("Failed to load studio dashboard statistics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, [fetchStats]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="rp-dashboard">
      {/* Header Banner */}
      <div className="rp-header-banner">
        <div>
          <div className="rp-header-meta">
            <span className="rp-live-badge">
              Studio Portal
            </span>
            <div className="rp-live-status">
              <span className="rp-live-dot" />
              <span>Real-Time Database Connected</span>
            </div>
          </div>
          <h1 className="rp-header-title">
            The Golden Light Creations — Studio Overview &amp; Analytics
          </h1>
          <p className="rp-header-desc">
            Real-time counts across visual portfolio, cinematic films, production services, client bookings, and reviews.
          </p>
        </div>

        <div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="rp-btn-refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* 6 Top Stat Metric KPI Cards in Responsive Grid */}
      <div className="rp-kpi-grid">
        {/* Card 1: Portfolio Shoots */}
        <Link
          href="/admin/collections/portfolio"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #F5B301, #FFD04A)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#fef9c3", color: "#a16207" }}>
                <Camera size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Visual Portfolio</p>
            <p className="rp-kpi-value">{stats ? stats.totalPortfolio : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#a16207" }}>
            <span>Manage Shoots</span> &rarr;
          </p>
        </Link>

        {/* Card 2: Cinematic Films */}
        <Link
          href="/admin/collections/films"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #F59E0B, #ea580c)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#fff7ed", color: "#c2410c" }}>
                <Film size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Cinematic Films</p>
            <p className="rp-kpi-value">{stats ? stats.totalFilms : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#c2410c" }}>
            <span>Manage Films</span> &rarr;
          </p>
        </Link>

        {/* Card 3: Production Services */}
        <Link
          href="/admin/collections/services"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #10b981, #14b8a6)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#ecfdf5", color: "#059669" }}>
                <Sparkles size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Production Services</p>
            <p className="rp-kpi-value">{stats ? stats.totalServices : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#059669" }}>
            <span>Manage Offerings</span> &rarr;
          </p>
        </Link>

        {/* Card 4: Client Reviews */}
        <Link
          href="/admin/collections/testimonials"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                <MessageSquareQuote size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Client Reviews</p>
            <p className="rp-kpi-value">{stats ? stats.totalTestimonials : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#4f46e5" }}>
            <span>View Testimonials</span> &rarr;
          </p>
        </Link>

        {/* Card 5: Booking Inquiries */}
        <Link
          href="/admin/collections/contact-submissions"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #ec4899, #e11d48)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#fdf2f8", color: "#db2777" }}>
                <Mail size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Booking Inquiries</p>
            <p className="rp-kpi-value">{stats ? stats.totalSubmissions : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#db2777" }}>
            <span>Client Inquiries</span> &rarr;
          </p>
        </Link>

        {/* Card 6: Media Assets */}
        <Link
          href="/admin/collections/media"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #06b6d4, #3b82f6)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#ecfeff", color: "#0891b2" }}>
                <ImageIcon size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Media Library</p>
            <p className="rp-kpi-value">{stats ? stats.totalMedia : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#0891b2" }}>
            <span>Asset Storage</span> &rarr;
          </p>
        </Link>
      </div>

      {/* Row 1 Charts: Portfolio by Category + Films by Category */}
      <div className="rp-charts-grid-2">
        {/* Donut Chart: Portfolio by Category */}
        <div className="rp-chart-card">
          <div className="rp-chart-header">
            <div>
              <h2 className="rp-chart-title">Portfolio by Category</h2>
              <p className="rp-chart-subtitle">
                Distribution of the {stats?.totalPortfolio || 0} visual photography captures
              </p>
            </div>
            <span className="rp-chart-tag" style={{ background: "#fef9c3", color: "#854d0e" }}>
              {stats?.portfolioByCategory?.length || 0} Categories
            </span>
          </div>

          <div className="rp-chart-body">
            {stats?.portfolioByCategory && stats.portfolioByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.portfolioByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {stats.portfolioByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span style={{ fontSize: 11, color: "#d1d5db", fontWeight: 600 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="rp-empty-state">No portfolio categories available yet</div>
            )}
          </div>
        </div>

        {/* Bar Chart: Films by Category */}
        <div className="rp-chart-card">
          <div className="rp-chart-header">
            <div>
              <h2 className="rp-chart-title">Films by Genre</h2>
              <p className="rp-chart-subtitle">
                Total {stats?.totalFilms || 0} cinematic videos and trailers
              </p>
            </div>
            <span className="rp-chart-tag" style={{ background: "#fff7ed", color: "#c2410c" }}>
              Cinematic Films
            </span>
          </div>

          <div className="rp-chart-body">
            {stats?.filmsByCategory && stats.filmsByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.filmsByCategory} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#9ca3af", fontSize: 10 }}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} allowDecimals={false} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {stats.filmsByCategory.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="rp-empty-state">No film genres available yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Content Overview Full Bar Chart */}
      <div className="rp-chart-card" style={{ marginBottom: 24 }}>
        <div className="rp-chart-header">
          <div>
            <h2 className="rp-chart-title">Studio Content Ecosystem</h2>
            <p className="rp-chart-subtitle">
              Comprehensive volume across photos, films, production offerings, testimonials, and media assets
            </p>
          </div>
          <span className="rp-chart-tag" style={{ background: "#fef9c3", color: "#854d0e" }}>
            The Golden Light Creations
          </span>
        </div>

        <div className="rp-chart-body" style={{ height: 260 }}>
          {stats?.contentOverview && stats.contentOverview.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.contentOverview} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} allowDecimals={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {stats.contentOverview.map((entry, index) => (
                    <Cell key={`content-cell-${index}`} fill={entry.fill || PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="rp-empty-state">Loading content ecosystem...</div>
          )}
        </div>
      </div>

      {/* Quick Access Studio Links Footer */}
      <div className="rp-quick-links-card">
        <h3 className="rp-quick-links-title">Quick Settings &amp; Studio Configurations</h3>
        <div className="rp-quick-links-grid">
          <Link href="/admin/globals/studio-settings" className="rp-quick-link-btn">
            <SlidersHorizontal size={14} className="text-[#F5B301]" />
            <span>Studio Settings (Hero, Story, Stats)</span>
          </Link>
          <Link href="/admin/globals/site-settings" className="rp-quick-link-btn">
            <Settings size={14} className="text-[#F5B301]" />
            <span>Contact Info &amp; WhatsApp Details</span>
          </Link>
          <Link href="/admin/collections/users" className="rp-quick-link-btn">
            <UsersIcon size={14} className="text-[#F5B301]" />
            <span>Admin Users &amp; Roles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
