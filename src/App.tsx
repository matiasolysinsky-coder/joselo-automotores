import { AppProvider } from '@/context/AppContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Catalog from '@/sections/Catalog';
import Branches from '@/sections/Branches';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Catalog />
          <Branches />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;