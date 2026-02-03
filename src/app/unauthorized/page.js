/* Unauthorized Page Component
 * Displays access denied message when users lack proper authentication
 * Provides link to login page for re-authentication
 */
export default function UnauthorizedPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Error Title */}
      <h1>Unauthorized</h1>
      
      {/* Error Description */}
      <p>Your session has expired or you are not authorized.</p>
      
      {/* Login Link */}
      <a
        href="/auth/user/login"
        style={{
          color: "#4f46e5",
          textDecoration: "underline",
        }}
      >
        Go to Login
      </a>
    </div>
  );
}
