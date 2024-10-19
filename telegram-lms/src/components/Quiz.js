// src/components/Quiz.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  const [score, setScore] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь логика обработки ответов и вычисления результата
    setScore(80); // Пример результата
  };

  return (
    <div>
      <h1>Quiz for Course {id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Question 1: What is React?</p>
          <input type="radio" name="q1" value="a" /> A JavaScript library<br />
          <input type="radio" name="q1" value="b" /> A CSS framework<br />
        </div>
        <button type="submit">Submit Quiz</button>
      </form>
      {score !== null && <p>Your score: {score}</p>}
    </div>
  );
};

export default Quiz;
