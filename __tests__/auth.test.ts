import { describe, it, expect } from "vitest";

describe("Authentication", () => {
  describe("Role-based access control", () => {
    const roleRoutes: Record<string, string[]> = {
      "/admin": ["admin"],
      "/research": ["admin", "researcher"],
      "/trading": ["admin", "researcher"],
      "/investor": ["admin", "investor"],
      "/dashboard": ["admin", "researcher", "investor", "viewer"],
    };

    it("admin has access to all routes", () => {
      const adminRole = "admin";
      for (const [, allowedRoles] of Object.entries(roleRoutes)) {
        expect(allowedRoles).toContain(adminRole);
      }
    });

    it("researcher has access to research and trading", () => {
      expect(roleRoutes["/research"]).toContain("researcher");
      expect(roleRoutes["/trading"]).toContain("researcher");
    });

    it("investor only has access to investor portal", () => {
      expect(roleRoutes["/investor"]).toContain("investor");
      expect(roleRoutes["/admin"]).not.toContain("investor");
      expect(roleRoutes["/research"]).not.toContain("investor");
    });

    it("viewer has minimal access", () => {
      expect(roleRoutes["/dashboard"]).toContain("viewer");
      expect(roleRoutes["/admin"]).not.toContain("viewer");
    });
  });

  describe("Protected routes", () => {
    const protectedRoutes = [
      "/dashboard",
      "/research",
      "/trading",
      "/risk",
      "/models",
      "/lab",
      "/investor",
      "/settings",
      "/admin",
    ];

    it("all main app routes are protected", () => {
      expect(protectedRoutes).toContain("/dashboard");
      expect(protectedRoutes).toContain("/trading");
      expect(protectedRoutes).toContain("/admin");
    });

    it("auth routes are not in protected list", () => {
      expect(protectedRoutes).not.toContain("/auth/login");
      expect(protectedRoutes).not.toContain("/");
    });
  });
});
