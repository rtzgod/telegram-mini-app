// src/components/Course.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Course.css';

const Course = ({ isTeacher, questions, updateProgress }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(new Set()); // Сохраняем вопросы, за которые уже были начислены баллы

    const currentQuestion = questions[questionNumber];
    const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);

    const handleAnswer = (index) => {
        setSelectedOption(index);
        setAnswered(true);
        // Проверяем правильный ответ и не начислялись ли уже баллы за этот вопрос
        if (index === currentQuestion.correctAnswer && !earnedPoints.has(questionNumber)) {
            setScore(score + currentQuestion.points); // Добавляем баллы
            setEarnedPoints(new Set(earnedPoints.add(questionNumber))); // Отмечаем, что за этот вопрос начислены баллы
            updateProgress(new Date().toISOString().split('T')[0], currentQuestion.points); // Обновляем прогресс
        }
    };

    const nextQuestion = () => {
        if (questionNumber < questions.length - 1) {
            setQuestionNumber(questionNumber + 1);
            setSelectedOption(null);
            setAnswered(false);
        }
    };

    const previousQuestion = () => {
        if (questionNumber > 0) {
            setQuestionNumber(questionNumber - 1);
            setSelectedOption(null);
            setAnswered(false);
        }
    };

    const resetQuestion = () => {
        setSelectedOption(null);
        setAnswered(false);
    };

    const handleProgress = () => {
        const progressPercentage = (earnedPoints.size / questions.length) * 100; // Прогресс заполняется на основе вопросов, за которые уже начислены баллы
        return progressPercentage;
    };

    return (
        <div className="course-container">
            <h1>Course {id}</h1>
            <h2>Question {questionNumber + 1}:</h2>
            <p>{currentQuestion.question}</p>

            <ul className="options-list">
                {currentQuestion.options.map((option, index) => (
                    <li
                        key={index}
                        className={`option ${answered && index === currentQuestion.correctAnswer ? 'correct' : ''} ${answered && index === selectedOption && index !== currentQuestion.correctAnswer ? 'incorrect' : ''}`}
                        onClick={() => handleAnswer(index)}
                    >
                        {option}
                    </li>
                ))}
            </ul>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${handleProgress()}%` }}></div>
            </div>

            {answered && (
                <div className="feedback">
                    {selectedOption === currentQuestion.correctAnswer ? (
                        <p>Correct! You got it right.</p>
                    ) : (
                        <p>Incorrect. The correct answer was "{currentQuestion.options[currentQuestion.correctAnswer]}".</p>
                    )}
                </div>
            )}

            <div className="navigation-buttons">
                <button onClick={previousQuestion} disabled={questionNumber === 0}>Previous Question</button>
                <button onClick={nextQuestion} disabled={questionNumber === questions.length - 1}>Next Question</button>
            </div>

            <button onClick={resetQuestion}>Reset Question</button>

            {questionNumber === questions.length - 1 && (
                <div>
                    <p>Your final score is: {score} out of {totalPoints}</p>
                    <button onClick={() => navigate('/')}>Return to Course List</button>
                </div>
            )}

            {isTeacher && (
                <button onClick={() => navigate(`/course/${id}/editor`)}>Edit Course</button>
            )}
        </div>
    );
};

export default Course;
