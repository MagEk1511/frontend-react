import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../store/userSlice';
import styles from './UserProfile.module.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const currentName = useSelector((state) => state.user.name);
    const [inputValue, setInputValue] = useState(currentName);

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(setName(inputValue));
    };

    return (
        <div className={styles.container}>
            <h1>User Profile</h1>
            <p>Welcome! Please enter your name to personalize your experience.</p>

            <form onSubmit={handleSave} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="nameInput">Your Name:</label>
                    <input
                        id="nameInput"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter your name"
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Save Name
                </button>
            </form>

            {currentName && (
                <div className={styles.successMessage}>
                    Name successfully saved as <strong>{currentName}</strong>!
                </div>
            )}
        </div>
    );
};

export default UserProfile;
