"use client";

import { useMemo, useState } from "react";
import { DATEICON } from "../../../../const-value/config-icons/page";
import styles from "./DashboardChart.module.css";
import { FaArrowLeft } from "react-icons/fa";

export default function DashboardChart({ event, onBack }) {
  const [selected, setSelected] = useState("Click");

  // 🔐 SAFETY (extra)
  if (!event) return null;

  // Extract statistics from the event object
  const stats = {
    click: event?.viewCount ?? 0,
    view: event?.viewCount ?? 0,
    like: event?.likeCount ?? 0,
  };

  // Memoize chart data calculation based on selected metric
  const chartData = useMemo(() => {
    const total =
      selected === "Click"
        ? stats.click
        : selected === "Views"
        ? stats.view
        : stats.like;

    if (total < 20) {
      return Array(10).fill(total / 4);
    }

    const CURVE_TEMPLATE = [18, 20, 22, 19, 16, 16, 19, 22, 18, 19];
    const baseSum = CURVE_TEMPLATE.reduce((a, b) => a + b, 0);

    return CURVE_TEMPLATE.map((v) =>
      Math.round((v / baseSum) * total),
    );
  }, [selected, stats]);

  // Generate SVG path for the chart visualization
  const generatePath = (data) => {
    const stepX = 100 / (data.length - 1);
    let d = `M0,${40 - data[0] / 2}`;

    data.forEach((val, i) => {
      const x = i * stepX;
      const y = 40 - val / 2;
      d += ` L${x},${y}`;
    });

    return `${d} L100,40 L0,40 Z`;
  };

  const maxY = Math.max(...chartData, 10);

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.left}>
          <button className={styles.backBtn} onClick={onBack}>
            <FaArrowLeft />
          </button>
          <h2>{event?.title || "Event Analytics"}</h2>
        </div>
      </div>

      {/* STATS */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Total Clicks</h3>
          <h2>{stats.click}</h2>
        </div>

        <div className={styles.card}>
          <h3>Total Views</h3>
          <h2>{stats.view}</h2>
        </div>

        <div className={styles.card}>
          <h3>Total Likes</h3>
          <h2>{stats.like}</h2>
        </div>
      </div>

      {/* CHART */}
      <div className={styles.chartBox}>
        <div className={styles.chartTop}>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option>Click</option>
            <option>Views</option>
            <option>Likes</option>
          </select>

          <div>{DATEICON}</div>
        </div>

        <div className={styles.chartArea}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d={generatePath(chartData)} fill="#9B5CFF" />
          </svg>
        </div>
      </div>
    </div>
  );
}
