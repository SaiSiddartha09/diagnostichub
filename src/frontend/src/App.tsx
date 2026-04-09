import { PageLoader } from "@/components/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const PatientDashboard = lazy(() => import("@/pages/patient/DashboardPage"));
const PatientReports = lazy(() => import("@/pages/patient/ReportsPage"));
const PatientReportDetail = lazy(
  () => import("@/pages/patient/ReportDetailPage"),
);
const PatientAppointments = lazy(
  () => import("@/pages/patient/AppointmentsPage"),
);
const PatientProfile = lazy(() => import("@/pages/patient/ProfilePage"));
const AdminDashboard = lazy(() => import("@/pages/admin/DashboardPage"));
const AdminPatients = lazy(() => import("@/pages/admin/PatientsPage"));
const AdminPatientDetail = lazy(
  () => import("@/pages/admin/PatientDetailPage"),
);
const AdminReports = lazy(() => import("@/pages/admin/ReportsPage"));
const AdminReportUpload = lazy(() => import("@/pages/admin/ReportUploadPage"));
const AdminDoctors = lazy(() => import("@/pages/admin/DoctorsPage"));
const AdminAppointments = lazy(() => import("@/pages/admin/AppointmentsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>
  ),
  notFoundComponent: NotFoundPage,
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
  component: () => null,
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Patient wrapper — lazy guard component
function PatientGuard() {
  const { isLoginSuccess, loginStatus } = useInternetIdentity();
  if (loginStatus === "logging-in" || loginStatus === "initializing")
    return <PageLoader />;
  if (!isLoginSuccess) {
    throw redirect({ to: "/login" });
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

const patientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient",
  component: PatientGuard,
});

const patientIndexRoute = createRoute({
  getParentRoute: () => patientRoute,
  path: "/",
  component: PatientDashboard,
});

const patientReportsRoute = createRoute({
  getParentRoute: () => patientRoute,
  path: "/reports",
  component: PatientReports,
});

const patientReportDetailRoute = createRoute({
  getParentRoute: () => patientRoute,
  path: "/reports/$id",
  component: PatientReportDetail,
});

const patientAppointmentsRoute = createRoute({
  getParentRoute: () => patientRoute,
  path: "/appointments",
  component: PatientAppointments,
});

const patientProfileRoute = createRoute({
  getParentRoute: () => patientRoute,
  path: "/profile",
  component: PatientProfile,
});

// Admin wrapper
function AdminGuard() {
  const { isLoginSuccess, loginStatus } = useInternetIdentity();
  if (loginStatus === "logging-in" || loginStatus === "initializing")
    return <PageLoader />;
  if (!isLoginSuccess) {
    throw redirect({ to: "/login" });
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminGuard,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: AdminDashboard,
});

const adminPatientsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/patients",
  component: AdminPatients,
});

const adminPatientDetailRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/patients/$id",
  component: AdminPatientDetail,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/reports",
  component: AdminReports,
});

const adminReportUploadRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/reports/upload",
  component: AdminReportUpload,
});

const adminDoctorsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/doctors",
  component: AdminDoctors,
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/appointments",
  component: AdminAppointments,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  patientRoute.addChildren([
    patientIndexRoute,
    patientReportsRoute,
    patientReportDetailRoute,
    patientAppointmentsRoute,
    patientProfileRoute,
  ]),
  adminRoute.addChildren([
    adminIndexRoute,
    adminPatientsRoute,
    adminPatientDetailRoute,
    adminReportsRoute,
    adminReportUploadRoute,
    adminDoctorsRoute,
    adminAppointmentsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
