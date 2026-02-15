import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageTransition from './components/PageTransition/PageTransition';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import AboutCorp from './pages/AboutCorp/AboutCorp';
import Contact from './pages/Contact/Contact';
import Contribute from './pages/Contribute/Contribute';
import Collections from './pages/Collections/Collections';
import CollectionDetail from './pages/CollectionDetail/CollectionDetail';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import HistoriaCorporacao from './pages/HistoriaCorporacao/HistoriaCorporacao';

import './index.css';

export default function App() {
    const location = useLocation();

    return (
        <>
            <Navbar />
            <main>
                <PageTransition>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre" element={<About />} />
                        <Route path="/corporacao" element={<AboutCorp />} />
                        <Route path="/contato" element={<Contact />} />
                        <Route path="/contribuir" element={<Contribute />} />
                        <Route path="/colecoes" element={<Collections />} />
                        <Route path="/colecao/:slug" element={<CollectionDetail />} />
                        <Route path="/item/:id" element={<ItemDetail />} />
                        <Route path="/historia" element={<HistoriaCorporacao />} />
                    </Routes>
                </PageTransition>
            </main>
            <Footer />
        </>
    );
}
