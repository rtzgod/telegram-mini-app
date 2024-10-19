// src/components/QuestionEditor.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './QuestionEditor.css';

const QuestionEditor = ({ questions, setQuestions }) => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const questionIndex = questions.findIndex(q => q.id === parseInt(questionId));

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [points, setPoints] = useState(1);
  const [hasCompleted, setHasCompleted] = useState(false); // Для хранения состояния выполнения вопроса

  useEffect(() => {
    if (questionIndex !== -1) {
      const question = questions[questionIndex];
      setQuestionText(question.question);
      setOptions(question.options);
      setCorrectAnswer(question.correctAnswer);
      setPoints(question.points);
      setHasCompleted(question.hasCompleted || false); // Если вопрос уже выполнен
    }
  }, [questionIndex, questions]);

  const handleSave = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = {
      ...questions[questionIndex],
      question: questionText,
      options,
      correctAnswer,
      points,
      hasCompleted,
    };
    setQuestions(updatedQuestions);
    alert('Question updated!');
    navigate(-1);
  };

  const handleMoveUp = () => {
    if (questionIndex > 0) {
      const updatedQuestions = [...questions];
      const temp = updatedQuestions[questionIndex];
      updatedQuestions[questionIndex] = updatedQuestions[questionIndex - 1];
      updatedQuestions[questionIndex - 1] = temp;
      setQuestions(updatedQuestions);
    }
  };

  const handleMoveDown = () => {
    if (questionIndex < questions.length - 1) {
      const updatedQuestions = [...questions];
      const temp = updatedQuestions[questionIndex];
      updatedQuestions[questionIndex] = updatedQuestions[questionIndex + 1];
      updatedQuestions[questionIndex + 1] = temp;
      setQuestions(updatedQuestions);
    }
  };

  const handleReset = () => {
    setOptions(options.map(option => option)); // Сбрасываем цвета, но сохраняем варианты
    setHasCompleted(false); // Обнуляем статус выполнения
  };

  return (
    <div className="question-editor">
      <h1>Edit Question</h1>
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
          <button onClick={() => {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
          }}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={() => setOptions([...options, ''])}>Add Option</button>
      <div>
        <label>
          Correct Answer (Index):
          <input
            type="number"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
            min="0"
            max={options.length - 1}
          />
        </label>
        <label>
          Points:
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={handleReset}>Reset Question</button>
      <div className="move-buttons">
        <button onClick={handleMoveUp} disabled={questionIndex === 0}>↑ Move Up</button>
        <button onClick={handleMoveDown} disabled={questionIndex === questions.length - 1}>↓ Move Down</button>
      </div>
    </div>
  );
};

export default QuestionEditor;
