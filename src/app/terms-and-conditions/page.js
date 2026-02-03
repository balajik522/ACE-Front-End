/**
 * Terms and Conditions Page
 * Displays platform terms, user responsibilities, and legal agreements
 * Provides interactive section navigation for easy access to specific terms
 */

"use client";

import { useState } from "react";
import styles from "./terms-and-conditions.module.css";
import Footer from "../../components/global/Footer/Footer";

// Configuration for terms and conditions sections
const SECTIONS = [
  // Section 1: Introduction - Platform overview and acceptance of terms
  {
    id: "intro",
    label: "Introduction",
    content: (
      <>
        <h3>Platform Overview</h3>
        <p>
          All College Event (ACE), a product of ECLearnix EdTech Private
          Limited, is a digital platform for listing, discovering, promoting,
          and facilitating a wide range of academic and non-academic events,
          including educational, professional, cultural, technical, creative,
          entertainment, and community-based events.
        </p>

        <h3>Acceptance of Terms</h3>
        <p>
          By accessing or using the ACE website or mobile application, you agree
          to be legally bound by these Terms & Conditions, along with the
          Privacy Policy and No-Refund Policy.
        </p>

        <h3>Binding Nature</h3>
        <p>
          Your continued use of the platform confirms that you have read,
          understood, and accepted these Terms & Conditions in full.
        </p>
      </>
    ),
  },
  // Section 2: Platform Purpose - Explains ACE's role as an intermediary
  {
    id: "purpose",
    label: "Platform Purpose",
    content: (
      <>
        <h3>Role of All College Event</h3>
        <p>
          All College Event functions solely as a technology intermediary that
          enables event discovery, listing, and registration. ACE does not own,
          host, manage, or conduct any events.
        </p>

        <h3>Event Coverage</h3>
        <p>
          The platform supports both academic and non-academic events including
          conferences, workshops, FDPs, STTPs, hackathons, seminars, concerts,
          exhibitions, competitions, meetups, and commercial events.
        </p>

        <h3>Open Participation</h3>
        <p>
          Participation on ACE is open to students, professionals, faculty,
          creators, entrepreneurs, freelancers, institutions, and the general
          public unless explicitly restricted by the event organizer.
        </p>
      </>
    ),
  },
  // Section 3: User Accounts - Account requirements and responsibilities
  {
    id: "accounts",
    label: "User Accounts",
    content: (
      <>
        <h3>Eligibility Criteria</h3>
        <p>
          The platform is intended for users aged 18 years and above. Users
          below 18 may participate only with parental or legal guardian consent,
          subject to organizer-defined rules.
        </p>

        <h3>Account Registration</h3>
        <p>
          Users must register using accurate, complete, and up-to-date
          information to access features such as event registration, ticket
          booking, or event creation.
        </p>

        <h3>Account Security & Responsibility</h3>
        <p>
          Users are responsible for maintaining the confidentiality of login
          credentials and all activities performed through their account.
        </p>
        <h3>Account Misuse</h3>
        <p>
          Accounts with false, misleading, fraudulent, or unauthorized activity
          may be suspended or permanently terminated without prior notice.
        </p>
      </>
    ),
  },
  // Section 4: Events & Participation - Organizer and attendee guidelines
  {
    id: "events",
    label: "Events & Participation",
    content: (
      <>
        <h3>Organizer Eligibility & Collaboration</h3>
        <p>
          Any individual, group, institution, or organization may create and
          publish events. Organizers may collaborate with co-hosts, sponsors, or
          partners, with joint responsibility for event accuracy and execution.
        </p>

        <h3>Event Information Accuracy</h3>
        <p>
          Organizers must provide complete and truthful event details, including
          title, description, date, time, venue, mode, pricing, eligibility, and
          applicable policies.
        </p>

        <h3>Organizer Responsibilities</h3>
        <p>
          Organizers are solely responsible for event planning, execution,
          safety, permissions, legal compliance, and intellectual property
          rights.
        </p>

        <h3>Event Registration & Attendance</h3>
        <p>
          Event registration is confirmed only upon successful completion of the
          registration or payment process. Participation, certificates, and
          outcomes are managed exclusively by the organizer.
        </p>
      </>
    ),
  },
  // Section 5: Payments & Refunds - Financial terms and policies
  {
    id: "payments",
    label: "Payments & Refunds",
    content: (
      <>
        <h3>Platform Fees & Services</h3>
        <p>
          All College Event may introduce platform fees, premium listings,
          subscriptions, promotional tools, or convenience charges at its
          discretion.
        </p>

        <h3>No-Refund Policy</h3>
        <p>
          All payments made through the platform are governed by the No-Refund
          Policy unless explicitly stated otherwise by the event organizer.
        </p>

        <h3>Organizer Financial Responsibility</h3>
        <p>
          Refunds, if applicable, are the sole responsibility of the event
          organizer. ACE is not liable for payment disputes between participants
          and organizers.
        </p>
      </>
    ),
  },
  // Section 6: Content & Disclaimers - Content ownership and platform disclaimers
  {
    id: "content",
    label: "Content & Disclaimers",
    content: (
      <>
        <h3>User-Generated Content</h3>
        <p>
          Organizers retain ownership of uploaded content but grant ACE a
          non-exclusive, worldwide, royalty-free license to host, display,
          promote, and distribute such content.
        </p>

        <h3>Third-Party Rights</h3>
        <p>
          Organizers are responsible for ensuring content does not infringe on
          third-party intellectual property or privacy rights.
        </p>

        <h3>Platform & Third-Party Disclaimer</h3>
        <p>
          All College Event is not an organizer, co-organizer, sponsor, or
          participant in any event and bears no responsibility for event
          quality, safety, cancellations, or outcomes.
        </p>
      </>
    ),
  },
  // Section 7: Liability & Legal - Legal terms, limitations, and jurisdiction
  {
    id: "legal",
    label: "Liability & Legal",
    content: (
      <>
        <h3>Limitation of Liability</h3>
        <p>
          All College Event shall not be liable for any direct or indirect
          damages arising from event participation, organizer actions,
          cancellations, or third-party services.
        </p>

        <h3>Indemnification</h3>
        <p>
          Users and organizers agree to indemnify and hold ACE harmless from any
          claims resulting from their actions or violations.
        </p>

        <h3>Modifications & Termination</h3>
        <p>
          All College Event reserves the right to modify these Terms &
          Conditions and suspend or terminate accounts for violations, misuse,
          or legal non-compliance.
        </p>
        
        <h3>Governing Law & Jurisdiction</h3>
        <p>
          These Terms & Conditions are governed by the laws of India, with
          exclusive jurisdiction vested in the courts of Coimbatore, Tamil Nadu.
        </p>
      </>
    ),
  },
];

// Main client component for Terms and Conditions page
export default function TermsConditionsClient() {
  // Tracks currently active section for navigation
  const [active, setActive] = useState("intro");

  // Finds the active section content based on current state
  const activeSection = SECTIONS.find((s) => s.id === active);

  return (
    <>
      {/* Page header with title and description */}
      <div className={styles.root}>
        {/* HEADER */}
        <div className={styles.header}>
          <h1>
            Terms & <span>Conditions</span>
          </h1>
          <p>
            These terms describe acceptable use, organizer responsibilities,
            <br />
            and AllCollegeEvent’s role as an intermediary platform.
          </p>
        </div>

        {/* BODY */}
        <div className={styles.container}>
          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <ul>
              {SECTIONS.map((item) => (
                <li
                  key={item.id}
                  className={active === item.id ? styles.active : ""}
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </aside>

          {/* CONTENT */}
          <section className={styles.content} style={{ paddingTop: "20px" }}>
            {activeSection?.content}
          </section>
        </div>
      </div>
      {/* Footer component for consistent page layout */}
      <Footer />
    </>
  );
}

