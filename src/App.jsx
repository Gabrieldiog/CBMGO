import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageTransition from './components/PageTransition/PageTransition';
import Home from './pages/Home/Home';
import Collections from './pages/Collections/Collections';
import CollectionDetail from './pages/CollectionDetail/CollectionDetail';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import About from './pages/About/About';
import AboutCorp from './pages/AboutCorp/AboutCorp';
import Contact from './pages/Contact/Contact';
import Contribute from './pages/Contribute/Contribute';
import HistoriaCorporacao from './pages/HistoriaCorporacao/HistoriaCorporacao';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <main>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/colecoes" element={<Collections />} />
              <Route path="/colecao/:slug" element={<CollectionDetail />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/corporacao" element={<AboutCorp />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/contribuir" element={<Contribute />} />
              <Route path="/historia" element={<HistoriaCorporacao />} />
            </Routes>
          </main>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}
