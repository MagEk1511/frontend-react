import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import SlotMachine from './containers/SlotMachine';
import PostsList from './components/PostsList';
import MovieSearch from './components/MovieSearch';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
    return (
        <div className="app">
            <Header />

            <main style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<SlotMachine />} />
                    <Route path="/posts" element={<PostsList />} />
                    <Route path="/movies" element={<MovieSearch />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
