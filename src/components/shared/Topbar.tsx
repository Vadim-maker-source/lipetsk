import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { account } from '../../lib/appwrite/config';

interface TopbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Тип для пользователя
interface User {
  $id: string;
  name: string;
  email: string;
}

const Topbar: React.FC<TopbarProps> = ({ searchQuery, setSearchQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Типизация пользователя
  const navigate = useNavigate();

  // Проверка авторизации пользователя
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user as User); // Приводим тип к User
      } catch (error) {
        setUser(null);
        navigate('/sign-in'); // Перенаправляем на страницу входа, если пользователь не авторизован
      }
    };

    fetchUser();
  }, [navigate]);

  // Выход из аккаунта
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      navigate('/sign-in'); // Перенаправляем на страницу входа после выхода
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  // Обработка изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsModalOpen(!!e.target.value);
  };

  return (
    <>
      <div className="topbar">
        <div className="leftpart">
          <Link to="/">
            <button className="l">
              <img src="/assets/logo.svg" alt="logo" className="logo" />
            </button>
          </Link>
          <Link to="/about">
            <button>
              <p className="topbar-button">О нас</p>
            </button>
          </Link>
          <input
            type="text"
            placeholder="Искать..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <img
            src="/assets/search.svg"
            alt="search"
            width={24}
            height={24}
            className="search-img"
          />
          <Link to="/support">
            <button className="sup">
              <p className="topbar-button">Поддержка</p>
            </button>
          </Link>
        </div>
        <div className="rightpart">
          {user ? (
            <>
              <strong style={{ color: '#fff', marginRight: '40px' }}>{user.name}</strong>
              <button onClick={handleLogout}><p className="topbar-button">Выйти</p></button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <button><p className="topbar-button">Войти</p></button>
              </Link>
              <Link to="/sign-up">
                <button><p className="topbar-button">Регистрация</p></button>
              </Link>
            </>
          )}
          <a
            href="https://t.me/TechnicalsupportLipetskART_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/telegram.png"
              alt="telegram"
              className="telegram"
            />
          </a>
        </div>
      </div>

      {/* Модальное окно поиска */}
      {isModalOpen && (
        <div className="search-modal">
          <div className="search-modal-content">
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <SearchResults searchQuery={searchQuery} />
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;