import { useState } from 'react';
import Slot from './Slot';
import MessageContainer from './MessageContainer';

const EMOJIS = ['🍒', '🍋', '🍉', '🍇', '⭐', '💎'];

export default function SlotMachine() {
    const [slots, setSlots] = useState(['❓', '❓', '❓']);
    const [isWin, setIsWin] = useState(false);

    const spin = () => {
        const newSlots = Array(3).fill(null).map(() => {
            const randomIndex = Math.floor(Math.random() * EMOJIS.length);
            return EMOJIS[randomIndex];
        });

        setSlots(newSlots);

        const first = newSlots[0];
        const allMatch = newSlots.every(slot => slot === first);
        setIsWin(allMatch);
    };

    return (
        <div className="slot-machine-container">
            <h1>Slot Mania 🎰</h1>

            <div className="slots-display">
                {slots.map((emoji, index) => (
                    <Slot key={index} value={emoji} />
                ))}
            </div>

            <button onClick={spin}>SPIN!</button>

            <MessageContainer>
                {isWin && <span>🎉 Victory! You Won! 🎉</span>}
            </MessageContainer>
        </div>
    );
}
