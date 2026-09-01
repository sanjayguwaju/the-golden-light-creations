"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Package, 
  FileText, 
  Users, 
  Palette, 
  Store, 
  Inbox, 
  RefreshCw, 
  ArrowUpRight
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

// Vivid Color Palettes for Charts
const PIE_COLORS = [
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EF4444", // Red
  "#3B82F6", // Blue
];

const BAR_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
];

type DashboardStats = {
  totalProducts: number;
  totalPosts: number;
  totalUsers: number;
  totalColors: number;
  totalStores: number;
  totalPages: number;
  totalMedia: number;
  totalSubmissions: number;
  productsByCategory: Array<{ name: string; value: number }>;
  postsByCategory: Array<{ name: string; count: number }>;
  contentOverview: Array<{ name: string; count: number; fill: string }>;
  submissionsBreakdown: Array<{ name: string; count: number; fill: string }>;
};

// Custom Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rp-chart-tooltip-box">
        <p style={{ margin: "0 0 4px 0", fontWeight: 700, color: "#f59e0b" }}>{label || data.name}</p>
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
  const [stats, setStats] = useState<DashboardStats | null>(null);
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
      console.error("Failed to load dashboard statistics:", err);
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
              Live Analytics
            </span>
            <div className="rp-live-status">
              <span className="rp-live-dot" />
              <span>Real-Time Database Connected</span>
            </div>
          </div>
          <h1 className="rp-header-title">
            Reliance Paints Overview & Analytics
          </h1>
          <p className="rp-header-desc">
            Real-time counts across products, articles, paint shades, store network, and customer inquiries.
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
        {/* Card 1: Total Products */}
        <Link
          href="/admin/collections/products"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                <Package size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Total Products</p>
            <p className="rp-kpi-value">{stats ? stats.totalProducts : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#4f46e5" }}>
            <span>In Catalog</span> &rarr;
          </p>
        </Link>

        {/* Card 2: Total Blogs / Posts */}
        <Link
          href="/admin/collections/posts"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #10b981, #14b8a6)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#ecfdf5", color: "#059669" }}>
                <FileText size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Total Articles</p>
            <p className="rp-kpi-value">{stats ? stats.totalPosts : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#059669" }}>
            <span>Published Blogs</span> &rarr;
          </p>
        </Link>

        {/* Card 3: Total Users */}
        <Link
          href="/admin/collections/users"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#eff6ff", color: "#2563eb" }}>
                <Users size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Total Users</p>
            <p className="rp-kpi-value">{stats ? stats.totalUsers : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#2563eb" }}>
            <span>Admins & Editors</span> &rarr;
          </p>
        </Link>

        {/* Card 4: Paint Shades */}
        <Link
          href="/admin/collections/colors"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #f59e0b, #ea580c)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#fffbeb", color: "#d97706" }}>
                <Palette size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Paint Shades</p>
            <p className="rp-kpi-value">{stats ? stats.totalColors : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#d97706" }}>
            <span>Color Palette</span> &rarr;
          </p>
        </Link>

        {/* Card 5: Store Network */}
        <Link
          href="/admin/collections/stores"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #ec4899, #e11d48)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#fdf2f8", color: "#db2777" }}>
                <Store size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Store Network</p>
            <p className="rp-kpi-value">{stats ? stats.totalStores : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#db2777" }}>
            <span>Dealers & Outlets</span> &rarr;
          </p>
        </Link>

        {/* Card 6: Inquiries & Submissions */}
        <Link
          href="/admin/collections/contact-submissions"
          className="rp-kpi-card"
        >
          <div className="rp-kpi-bar" style={{ background: "linear-gradient(90deg, #8b5cf6, #7c3aed)" }} />
          <div>
            <div className="rp-kpi-card-header">
              <div className="rp-kpi-icon-box" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
                <Inbox size={18} />
              </div>
              <ArrowUpRight size={16} className="rp-kpi-arrow" />
            </div>
            <p className="rp-kpi-label">Inquiries & Forms</p>
            <p className="rp-kpi-value">{stats ? stats.totalSubmissions : "..."}</p>
          </div>
          <p className="rp-kpi-footer" style={{ color: "#7c3aed" }}>
            <span>Submissions</span> &rarr;
          </p>
        </Link>
      </div>

      {/* Row 1 Charts: Products by Category + Articles by Category */}
      <div className="rp-charts-grid-2">
        {/* Donut Chart: Products by Category */}
        <div className="rp-chart-card">
          <div className="rp-chart-header">
            <div>
              <h2 className="rp-chart-title">Products by Category</h2>
              <p className="rp-chart-subtitle">
                Distribution of the {stats?.totalProducts || 0} paints across categories
              </p>
            </div>
            <span className="rp-chart-tag" style={{ background: "#eef2ff", color: "#4338ca" }}>
              {stats?.productsByCategory?.length || 0} Categories
            </span>
          </div>

          <div className="rp-chart-body">
            {stats?.productsByCategory && stats.productsByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.productsByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stats.productsByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span style={{ fontSize: "11px", fontWeight: 600, color: "#334155" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="rp-chart-loading">Loading products distribution...</div>
            )}
          </div>
        </div>

        {/* Bar Chart: Articles by Category */}
        <div className="rp-chart-card">
          <div className="rp-chart-header">
            <div>
              <h2 className="rp-chart-title">Blog Posts by Category</h2>
              <p className="rp-chart-subtitle">
                Article breakdown across blog categories ({stats?.totalPosts || 0} total posts)
              </p>
            </div>
            <span className="rp-chart-tag" style={{ background: "#ecfdf5", color: "#047857" }}>
              Content Hub
            </span>
          </div>

          <div className="rp-chart-body">
            {stats?.postsByCategory && stats.postsByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.postsByCategory} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} interval={0} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                    {stats.postsByCategory.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="rp-chart-loading">Loading blog categories...</div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Content Ecosystem + Inquiries Breakdown */}
      <div className="rp-charts-grid-split">
        {/* Bar Chart: Content Overview */}
        <div className="rp-chart-card">
          <div className="rp-chart-header">
            <div>
              <h2 className="rp-chart-title">Platform Content Ecosystem</h2>
              <p className="rp-chart-subtitle">
                Total item count comparison across collections
              </p>
            </div>
            <span className="rp-chart-tag" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
              Collections
            </span>
          </div>

          <div className="rp-chart-body">
            {stats?.contentOverview && stats.contentOverview.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={stats.contentOverview}
                  margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#64748b" }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#334155", fontWeight: 600 }} width={75} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                    {stats.contentOverview.map((entry, index) => (
                      <Cell key={`content-bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="rp-chart-loading">Loading overview...</div>
            )}
          </div>
        </div>

        {/* Submissions & Interactions Breakdown */}
        <div className="rp-chart-card">
          <div>
            <div className="rp-chart-header">
              <div>
                <h2 className="rp-chart-title">Inquiries & Applications</h2>
                <p className="rp-chart-subtitle">
                  Breakdown of customer & contractor submissions
                </p>
              </div>
              <span className="rp-chart-tag" style={{ background: "#f5f3ff", color: "#6d28d9" }}>
                {stats?.totalSubmissions || 0} Total
              </span>
            </div>

            <div className="rp-submissions-list">
              {stats?.submissionsBreakdown?.map((item, idx) => (
                <div key={idx} className="rp-submission-item">
                  <div className="rp-submission-info">
                    <div className="rp-submission-dot" style={{ backgroundColor: item.fill }} />
                    <span className="rp-submission-name">{item.name}</span>
                  </div>
                  <span className="rp-submission-count">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rp-submissions-footer">
            <span>Last refreshed</span>
            <span className="rp-refresh-time">{lastRefreshed.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
