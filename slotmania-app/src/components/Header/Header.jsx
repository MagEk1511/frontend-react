import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

const Header = () => {
    const userName = useSelector((state) => state.user.name);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({ isActive, isPending, isTransitioning }) =>
                        [
                            styles.navLink,
                            isActive ? styles.active : '',
                            isPending ? styles.pending : '',
                            isTransitioning ? styles.transitioning : '',
                        ].join(' ')
                    }
                >
                    Slot Machine
                </NavLink>
                <NavLink
                    to="/posts"
                    className={({ isActive, isPending, isTransitioning }) =>
                        [
                            styles.navLink,
                            isActive ? styles.active : '',
                            isPending ? styles.pending : '',
                            isTransitioning ? styles.transitioning : '',
                        ].join(' ')
                    }
                >
                    JSON Posts
                </NavLink>
                <NavLink
                    to="/movies"
                    className={({ isActive, isPending, isTransitioning }) =>
                        [
                            styles.navLink,
                            isActive ? styles.active : '',
                            isPending ? styles.pending : '',
                            isTransitioning ? styles.transitioning : '',
                        ].join(' ')
                    }
                >
                    Movie Search
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive, isPending, isTransitioning }) =>
                        [
                            styles.navLink,
                            isActive ? styles.active : '',
                            isPending ? styles.pending : '',
                            isTransitioning ? styles.transitioning : '',
                        ].join(' ')
                    }
                >
                    User Profile
                </NavLink>
            </nav>
            <div className={styles.userInfo}>
                {userName ? `Welcome, ${userName}!` : 'Not logged in'}
            </div>
        </header>
    );
};

export default Header;
