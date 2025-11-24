import AppRouter from "@app/router";
import ErrorBoundary from "@app/ErrorBoundary";
import Layout from "@app/Layout";

const App = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <AppRouter />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
