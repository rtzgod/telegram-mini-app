// src/components/CourseEditor.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CourseEditor.css';

const CourseEditor = ({ questions, setQuestions }) => {
  const { id } = useParams(); // Получение ID курса
  const navigate = useNavigate();
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState(['', '']); // Два варианта по умолчанию
  const [newCorrectAnswer, setNewCorrectAnswer] = useState(0);
  const [newPoints, setNewPoints] = useState(1);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedQuestions = [...questions];
      [updatedQuestions[index - 1], updatedQuestions[index]] = [updatedQuestions[index], updatedQuestions[index - 1]];
      setQuestions(updatedQuestions);
    }
  };

  const handleMoveDown = (index) => {
    if (index < questions.length - 1) {
      const updatedQuestions = [...questions];
      [updatedQuestions[index + 1], updatedQuestions[index]] = [updatedQuestions[index], updatedQuestions[index + 1]];
      setQuestions(updatedQuestions);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: newQuestionText,
      options: newQuestionOptions,
      correctAnswer: newCorrectAnswer,
      points: newPoints,
    };
    setQuestions([...questions, newQuestion]);
    setNewQuestionText('');
    setNewQuestionOptions(['', '']);
    setNewCorrectAnswer(0);
    setNewPoints(1);
  };

  return (
    <div className="course-editor">
      <h1>Course Editor for Course {id}</h1>

      <div className="questions-list">
        {questions.map((question, index) => (
          <div key={question.id} className="question-item">
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
            <button onClick={() => handleMoveUp(index)}>↑</button>
            <button onClick={() => handleMoveDown(index)}>↓</button>
          </div>
        ))}
      </div>

      <div className="add-question">
        <h2>Add New Question</h2>
        <input
          type="text"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          placeholder="New question text"
        />
        {newQuestionOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            placeholder={`Option ${index + 1}`}
            onChange={(e) => {
              const updatedOptions = [...newQuestionOptions];
              updatedOptions[index] = e.target.value;
              setNewQuestionOptions(updatedOptions);
            }}
          />
        ))}
        <button onClick={() => setNewQuestionOptions([...newQuestionOptions, ''])}>Add Option</button>
        <br />
        <label>
          Correct Answer (Index):
          <input
            type="number"
            value={newCorrectAnswer}
            onChange={(e) => setNewCorrectAnswer(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Points:
          <input
            type="number"
            value={newPoints}
            onChange={(e) => setNewPoints(parseInt(e.target.value))}
          />
        </label>
        <br />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>

      <button onClick={() => navigate(-1)}>Back to Course</button>
    </div>
  );
};

export default CourseEditor;
