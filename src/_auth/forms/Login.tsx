import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../lib/appwrite/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/"); // Перенаправляем на главную страницу
    } catch (error) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="sign-main">
      <img src="/assets/logo.svg" alt="logo" />
      {error && <p>{error}</p>}
      для цифр ветра: логин - gggg@gmail.com
      пароль - 34343434
      <form onSubmit={handleSubmit}>
        <div>
          <label>Почта:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        
      </p>
    </div>
  );
};

export default Login;
