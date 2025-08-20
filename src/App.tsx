import {
  Layout,
  Hero,
  Features,
  Differentiation,
  Testimonials,
  Blog,
  Pricing,
  Footer,
} from "./components";

function App() {
  return (
    <Layout>
      {/*  Hero Section */}
      <Hero />

      {/* Pricing Section */}
      <Pricing />
      {/* Features Section */}
      <Features />

      {/* Differentiation Section */}
      <Differentiation />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Blog Section */}
      <Blog />

      {/* Meta Showcase Footer */}
      <Footer />
    </Layout>
  );
}

export default App;
