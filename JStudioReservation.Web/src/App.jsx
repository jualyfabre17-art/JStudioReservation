import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/Shared/NavBar';
import { Footer } from './components/Shared/Footer';
import { Dashboard } from './pages/Dashboard';
import { ArtistList } from './pages/Artists/ArtistList';
import { ArtistCreate } from './pages/Artists/ArtistCreate';
import { ArtistEdit } from './pages/Artists/ArtistEdit';
import { RoomList } from './pages/Rooms/RoomList';
import { RoomCreate } from './pages/Rooms/RoomCreate';
import { RoomEdit } from './pages/Rooms/RoomEdit';
import { ExtraServiceList } from './pages/ExtraServices/ExtraServiceList';
import { ExtraServiceCreate } from './pages/ExtraServices/ExtraServiceCreate';
import { ExtraServiceEdit } from './pages/ExtraServices/ExtraServiceEdit';
import { BookingList } from './pages/Bookings/BookingList';
import { BookingCreate } from './pages/Bookings/BookingCreate';
import { BookingEdit } from './pages/Bookings/BookingEdit';
import './App.css';

function App() {
    return (
        <Router>
            <div style={styles.app}>
                <NavBar />
                <main style={styles.main}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/artists" element={<ArtistList />} />
                        <Route path="/artists/create" element={<ArtistCreate />} />
                        <Route path="/artists/edit/:id" element={<ArtistEdit />} />
                        <Route path="/rooms" element={<RoomList />} />
                        <Route path="/rooms/create" element={<RoomCreate />} />
                        <Route path="/rooms/edit/:id" element={<RoomEdit />} />
                        <Route path="/extraservices" element={<ExtraServiceList />} />
                        <Route path="/extraservices/create" element={<ExtraServiceCreate />} />
                        <Route path="/extraservices/edit/:id" element={<ExtraServiceEdit />} />
                        <Route path="/bookings" element={<BookingList />} />
                        <Route path="/bookings/create" element={<BookingCreate />} />
                        <Route path="/bookings/edit/:id" element={<BookingEdit />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    main: {
        flex: 1
    }
};

export default App;