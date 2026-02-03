"use client";

// React hooks for state, effects, and refs
import { useState, useEffect, useRef } from "react";
import styles from "./CalendarModal.module.css";
// Icons for add and delete actions
import { ADDICON, DELETICON } from "../../../const-value/config-icons/page";

/**
 * CalendarModal Component
 * Modal for scheduling events with date and time selection
 * Supports single and multi-date event scheduling
 */
export default function CalendarModal({ onClose, onSave }) {

  const [multiDate, setMultiDate] = useState(false);
  // State for managing multiple date-time rows
  const [rows, setRows] = useState([
    { startDate: "", startTime: "", endDate: "", endTime: "" },
  ]);

  const rowsRef = useRef(null);

  // Get today's date and current time for validation
  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);


  // Auto-scroll to bottom when new rows are added
  useEffect(() => {
    if (rowsRef.current) {
      rowsRef.current.scrollTop = rowsRef.current.scrollHeight;
    }
  }, [rows.length]);

  // Adds a new date-time row for multi-date scheduling
  const addRow = () => {
    setRows([
      ...rows,
      { startDate: "", startTime: "", endDate: "", endTime: "" },
    ]);
  };

  // Removes a specific date-time row
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Updates a specific field in a row with validation
  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    // reset invalid end date/time
    if (field === "startDate") {
      if (updated[index].endDate < value) {
        updated[index].endDate = "";
        updated[index].endTime = "";
      }
    }

    // Reset invalid end time when start time changes on same day
    if (field === "startTime") {
      if (
        updated[index].endDate === updated[index].startDate &&
        updated[index].endTime < value
      ) {
        updated[index].endTime = "";
      }
    }

    setRows(updated);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3 className={styles.title}>
          Calendar <span className={styles.req}>*</span>
        </h3>

        {/* TIME ZONE */}
        <label className={styles.label}>Select Your Time Zone</label>
        <select className={styles.input}>
          <option>(UTC-12:00)</option>
          <option>(UTC+05:30) India</option>
        </select>

        {/* DATE ROWS */}
        <div className={styles.rowsContainer} ref={rowsRef}>
          {/* Add row button for multi-date mode */}
          {multiDate && (
            <div className={styles.addRow} onClick={addRow}>
              {ADDICON} Add
            </div>
          )}

          {/* Render date-time input rows */}
          {rows.map((row, index) => (
            <div key={index} className={styles.rowGrid}>
              <div className={styles.field}>
                <label>
                  Start Date <span>*</span>
                </label>
                <input
                  type="date"
                  className={styles.input}
                  min={today}
                  value={row.startDate}
                  onChange={(e) =>
                    updateRow(index, "startDate", e.target.value)
                  }
                />
              </div>

              <div className={styles.field}>
                <label>
                  Start Time <span>*</span>
                </label>
                <input
                  type="time"
                  className={styles.input}
                  min={row.startDate === today ? nowTime : undefined}
                  value={row.startTime}
                  onChange={(e) =>
                    updateRow(index, "startTime", e.target.value)
                  }
                />
              </div>

              <div className={styles.field}>
                <label>
                  End Date <span>*</span>
                </label>
                <input
                  type="date"
                  className={styles.input}
                  min={row.startDate || today}
                  value={row.endDate}
                  onChange={(e) =>
                    updateRow(index, "endDate", e.target.value)
                  }
                />
              </div>

              <div className={styles.field}>
                <label>
                  End Time <span>*</span>
                </label>
                <input
                  type="time"
                  className={styles.input}
                  min={
                    row.endDate === row.startDate
                      ? row.startTime
                      : undefined
                  }
                  value={row.endTime}
                  onChange={(e) =>
                    updateRow(index, "endTime", e.target.value)
                  }
                />
              </div>

              {/* Delete button for multi-date rows */}
              {multiDate && index > 0 && (
                <div
                  className={styles.deleteIcon}
                  onClick={() => removeRow(index)}
                >
                  {DELETICON}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MULTI DATE TOGGLE */}
        <div className={styles.toggleRow}>
          <span>Schedule on Multiple Dates</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={multiDate}
              onChange={() => {
                setMultiDate(!multiDate);
                if (!multiDate && rows.length === 1) addRow();
              }}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button className={styles.save} onClick={() => onSave(rows)}>
            Save
          </button>
        </div>

        {/* Close button */}
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

