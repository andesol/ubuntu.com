import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Integrations } from "@sentry/tracing";
import { ReactQueryDevtools } from "react-query/devtools";
import Exams from "./routes/Exams";
import Keys from "./components/Keys/Keys";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const oneHour = 1000 * 60 * 60;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: oneHour,
      retryOnMount: false,
    },
  },
});

Sentry.init({
  dsn: "https://0293bb7fc3104e56bafd2422e155790c@sentry.is.canonical.com//13",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["ubuntu.com"],
    }),
  ],
  allowUrls: ["ubuntu.com"],
});

function App() {
  return (
    <Router basename="/credentials/dashboard">
      <Sentry.ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <div className="l-application">
            <Sidebar />
            <main className="l-main">
              <section style={{ padding: "2rem" }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/exams" />} />
                  <Route path="/exams" element={<Exams />} />
                  <Route path="/keys" element={<Keys />} />
                </Routes>
              </section>
            </main>
          </div>
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("credentials-dashboard-app"));
