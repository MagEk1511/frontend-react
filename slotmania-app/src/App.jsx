import { useState } from 'react';
import SlotMachine from './containers/SlotMachine';
import PostsList from './components/PostsList';
import MovieSearch from './components/MovieSearch';

function App() {
    const [activeTab, setActiveTab] = useState('slots');

    return (
        <div className="app">
            <nav style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(5px)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <button
                    onClick={() => setActiveTab('slots')}
                    style={{
                        padding: '10px 20px',
                        background: activeTab === 'slots' ? '#00ff87' : 'transparent',
                        color: activeTab === 'slots' ? '#000' : '#fff',
                        border: '1px solid #00ff87',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Slot Machine
                </button>
                <button
                    onClick={() => setActiveTab('posts')}
                    style={{
                        padding: '10px 20px',
                        background: activeTab === 'posts' ? '#00ff87' : 'transparent',
                        color: activeTab === 'posts' ? '#000' : '#fff',
                        border: '1px solid #00ff87',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    JSON Posts
                </button>
                <button
                    onClick={() => setActiveTab('movies')}
                    style={{
                        padding: '10px 20px',
                        background: activeTab === 'movies' ? '#00ff87' : 'transparent',
                        color: activeTab === 'movies' ? '#000' : '#fff',
                        border: '1px solid #00ff87',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Movie Search
                </button>
            </nav>

            <main style={{ padding: '20px' }}>
                {activeTab === 'slots' ? (
                    <SlotMachine />
                ) : activeTab === 'posts' ? (
                    <PostsList />
                ) : (
                    <MovieSearch />
                )}
            </main>
        </div>
    );
}

export default App;
