import { useState, useEffect } from 'react';
import Slot from '../components/Slot';
import MessageContainer from '../components/MessageContainer';
import coinDisplay from '../assets/coin.svg';

const EMOJIS = ['🍒', '🍋', '🍉', '🍇', '⭐', '💎'];

export default function SlotMachine() {
    const [slots, setSlots] = useState(['❓', '❓', '❓']);
    const [isWin, setIsWin] = useState(false);
    const [history, setHistory] = useState([]);
    const [spinsCount, setSpinsCount] = useState(0);

    useEffect(() => {
        console.log('%cSlotMachine Mounted', 'color: green; font-weight: bold;');
        return () => {
            console.log('%cSlotMachine Unmounted', 'color: red; font-weight: bold;');
        };
    }, []);

    useEffect(() => {
        if (spinsCount > 0) {
            console.log('SlotMachine Updated. Total spins:', spinsCount);
        }
    }, [spinsCount]);

    const spin = () => {
        const newSlots = Array(3).fill(null).map(() => {
            const randomIndex = Math.floor(Math.random() * EMOJIS.length);
            return EMOJIS[randomIndex];
        });

        setSpinsCount(prev => prev + 1);
        setSlots(newSlots);

        const first = newSlots[0];
        const allMatch = newSlots.every(slot => slot === first);
        setIsWin(allMatch);

        setHistory(prev => [
            { id: Date.now(), result: newSlots.join(' '), win: allMatch },
            ...prev
        ]);
    };

    return (
        <div className="slot-machine-container" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #2b2b2b 0px, #2b2b2b 10px, #222 10px, #222 20px)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            textAlign: 'center'
        }}>
            <h1>
                Slot Mania
                <img src={coinDisplay} alt="Coin" style={{ width: '40px', verticalAlign: 'middle', marginLeft: '10px' }} />
            </h1>

            <div className="slots-display" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                {slots.map((emoji, index) => (
                    <Slot key={index} value={emoji} />
                ))}
            </div>

            <button
                onClick={spin}
                style={{
                    padding: '12px 24px',
                    fontSize: '1.2rem',
                    backgroundColor: '#e91e63',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                SPIN!
            </button>

            <p>Spins: {spinsCount}</p>

            <MessageContainer>
                {isWin && <span>🎉 Victory! You Won! 🎉</span>}
            </MessageContainer>

            {history.length > 0 && (
                <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px' }}>
                    <h3>Look at this history!</h3>
                    <ul style={{ maxWidth: '300px', margin: '0 auto' }}>
                        {history.slice(0, 5).map(item => (
                            <li key={item.id} style={{ color: item.win ? 'gold' : 'white' }}>
                                {item.result} {item.win && '🏆'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
