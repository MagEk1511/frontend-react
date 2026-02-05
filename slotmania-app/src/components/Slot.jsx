import styles from './Slot.module.css';

export default function Slot({ value }) {
    return (
        <div className={styles.slot}>
            {value}
        </div>
    );
}
