"use client";

import { useEffect, useState } from "react";
import { getOrgCategoriesApi } from "../../../../../lib/api/event.api";
import styles from "./OrganizerDetails.module.css";

/* OrganizerDetails Component
 * Manages hosting information for events - supports multiple organizers
 * Allows adding/removing collaborator organizations (max 3)
 */
export default function OrganizerDetails({
  data,
  resetSignal,
  setData,
  onNext,
}) {
  // Organization categories loaded from API
  const [orgCategories, setOrgCategories] = useState([]);
  
  // Organizations array - supports multiple collaborators
  const organizations = data.organizations || [
    {
      hostBy: "",
      orgName: "",
      location: "",
      organizerName: "",
      organizerNumber: "",
      department: "",
    },
  ];

  /* ================= FETCH ORG CATEGORIES ================= */
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await getOrgCategoriesApi();
        console.log("check cat",res)
        if (res?.status) {
          setOrgCategories(res.data);
        }
      } catch (err) {
        console.error("Org category fetch failed", err);
      }
    }

    loadCategories();
  }, []);

  /* Add new organization collaborator (max 3 allowed) */
  const addOrganization = () => {
    if (organizations.length >= 3) {
      console.warn("Maximum 3 collaborators allowed");
      console.log("CURRENT COLLABORATORS →", organizations);
      return;
    }

    const updated = [
      ...organizations,
      {
        hostBy: "",
        orgName: "",
        location: "",
        organizerName: "",
        organizerNumber: "",
        department: "",
      },
    ];

    console.log("AFTER ADD COLLABORATOR →", updated);

    setData({ ...data, organizations: updated });
  };

  /* Update organization field value at specific index */
  const updateOrg = (index, key, value) => {
    const updated = [...organizations];
    updated[index][key] = value;

    // Clear department if host type doesn't require it
    if (key === "hostBy" && !showDepartment(value)) {
      updated[index].department = "";
    }

    console.log("UPDATED ORGANIZATIONS →", updated);

    setData({ ...data, organizations: updated });
  };

  /* Remove organization by index */
  const deleteOrganization = (index) => {
    const updated = organizations.filter((_, i) => i !== index);

    console.log("AFTER DELETE →", updated);

    setData({ ...data, organizations: updated });
  };

  /* Check if selected host type requires department field */
  const showDepartment = (hostBy) => {
    const selectedCategory = orgCategories.find((c) => c.identity === hostBy);

    if (!selectedCategory) return false;

    const name = selectedCategory.categoryName;

    return (
      name === "College / University" ||
      name === "Training & Coaching Institute"
    );
  };

  /* Reset form when resetSignal is triggered */
  useEffect(() => {
    if (!resetSignal) return;

    setData({
      organizations: [
        {
          hostBy: "",
          orgName: "",
          location: "",
          organizerName: "",
          organizerNumber: "",
          department: "",
        },
      ],
    });
  }, [resetSignal]);


  return (
    <>
      {/* Hosting Information Card */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Hosting Information</h3>

        {/* Render each organization block */}
        {organizations.map((org, index) => (
          <div key={index} className={styles.orgBlock}>
            {/* Organization header with title and delete action */}
            <div className={styles.orgHeader}>
              <span>Organization {index + 1}</span>

              {/* Delete button - only show for non-first organizations */}
              {index !== 0 && (
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteOrganization(index)}
                >
                  Delete
                </button>
              )}
            </div>

            {/* Event host by dropdown */}
            <div className={styles.field}>
              <label>
                Event Host By <span>*</span>
              </label>

              <select
                className={styles.input}
                value={org.hostBy}
                onChange={(e) => updateOrg(index, "hostBy", e.target.value)}
              >
                <option value="">Select Category</option>

                {orgCategories.map((category) => (
                  <option key={category.identity} value={category.identity}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Two-column grid for organization details */}
            <div className={styles.grid2}>
              {/* Organization name input */}
              <div className={styles.field}>
                <label>
                  Organization Name <span>*</span>
                </label>
                <input
                  className={styles.input}
                  value={org.orgName}
                  onChange={(e) => updateOrg(index, "orgName", e.target.value)}
                  placeholder="Enter organization name"
                />
              </div>

              {/* Location input */}
              <div className={styles.field}>
                <label>
                  Location <span>*</span>
                </label>
                <input
                  className={styles.input}
                  value={org.location}
                  onChange={(e) => updateOrg(index, "location", e.target.value)}
                  placeholder="Enter a location "
                />
              </div>

              {/* Organizer name input */}
              <div className={styles.field}>
                <label>
                  Organizer Name <span>*</span>
                </label>
                <input
                  className={styles.input}
                  value={org.organizerName}
                  placeholder="Enter organizer name"
                  onChange={(e) =>
                    updateOrg(index, "organizerName", e.target.value)
                  }
                />
              </div>

              {/* Organizer phone number input - numeric only */}
              <div className={styles.field}>
                <label>
                  Organizer Number <span>*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  className={styles.input}
                  value={org.organizerNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      updateOrg(index, "organizerNumber", value);
                    }
                  }}
                  placeholder="(000-000-0000)"
                />
              </div>
            </div>

            {/* Department dropdown - conditionally shown based on host type */}
            {showDepartment(org.hostBy) && (
              <div className={styles.field}>
                <label>
                  Department <span>*</span>
                </label>

                <select
                  className={styles.input}
                  value={org.department}
                  onChange={(e) =>
                    updateOrg(index, "department", e.target.value)
                  }
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="IT">IT</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="School of Management">
                    School of Management
                  </option>
                  <option value="Science">Science</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>
            )}
          </div>
        ))}

        {/* Add collaborator button */}
        <div className={styles.addWrap}>
          <button className={styles.addBtn} onClick={addOrganization}>
            + Add Collaborators
          </button>
        </div>
      </div>

      {/* Form action buttons */}
      <div className={styles.actionEnd}>
        <button
          className={styles.nextBtn}
          onClick={() => {
            console.log(
              "FINAL COLLABORATORS BEFORE NEXT →",
              data.organizations
            );
            onNext();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
