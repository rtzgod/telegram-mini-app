// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Course from './components/Course';
import CourseEditor from './components/CourseEditor';
import QuestionEditor from './components/QuestionEditor';
import Progress from './components/Progress';
import './App.css';

function App() {
  const [user, setUser] = useState({ username: 'teacher' });
  const [questions, setQuestions] = useState([
    { id: 1, question: 'What is JavaScript?', options: ['Language', 'Framework'], correctAnswer: 0, points: 5 },
    { id: 2, question: 'What is React?', options: ['Library', 'Language'], correctAnswer: 0, points: 3 },
  ]);

  const [progressData, setProgressData] = useState({});

  // Функция обновления прогресса
  const updateProgress = (points) => {
    const today = new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате ГГГГ-ММ-ДД
    setProgressData(prevData => ({
      ...prevData,
      [today]: (prevData[today] || 0) + points, // Добавляем баллы за текущую дату
    }));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainMenu isTeacher={user.username === 'teacher'} />} />
          <Route 
            path="/course/:id" 
            element={<Course isTeacher={user.username === 'teacher'} questions={questions} updateProgress={updateProgress} />} 
          />
          <Route 
            path="/course/:id/editor" 
            element={<CourseEditor questions={questions} setQuestions={setQuestions} />} 
          />
          <Route 
            path="/question/:questionId" 
            element={<QuestionEditor questions={questions} setQuestions={setQuestions} />} 
          />
          <Route path="/progress" element={<Progress progressData={progressData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
