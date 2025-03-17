import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Grammar = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate(); // useNavigate for React Router v6

  // Array of 10 questions related to tenses
  const questions = [
    {
      question: 'He ___ (eat) breakfast at 8 AM every day.',
      correctAnswer: 'eats',
    },
    {
      question: 'They ___ (go) to the cinema last night.',
      correctAnswer: 'went',
    },
    {
      question: 'By the time you arrive, I ___ (finish) my homework.',
      correctAnswer: 'will have finished',
    },
    {
      question: 'She ___ (study) English for two years when she moved to the US.',
      correctAnswer: 'had been studying',
    },
    {
      question: 'I ___ (play) tennis now.',
      correctAnswer: 'am playing',
    },
    {
      question: 'We ___ (not/go) to the beach next weekend.',
      correctAnswer: 'are not going',
    },
    {
      question: 'They ___ (already/leave) when I arrived.',
      correctAnswer: 'had already left',
    },
    {
      question: 'I ___ (never/see) such a beautiful sunset.',
      correctAnswer: 'have never seen',
    },
    {
      question: 'When I was a child, I ___ (play) outside every day.',
      correctAnswer: 'played',
    },
    {
      question: 'I ___ (work) on this project for three months now.',
      correctAnswer: 'have been working',
    },
  ];

  const handleSubmit = () => {
    const newFeedback = [...feedback];
    newFeedback.push({ text: `You answered: ${userAnswer}`, isUser: true });

    // Check the user's answer
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase()) {
      newFeedback.push({ text: 'Correct! Great job.', isUser: false });
      setScore(score + 1); // Increase score if correct
    } else {
      newFeedback.push({
        text: `Incorrect. The correct answer is "${questions[currentQuestionIndex].correctAnswer}". Try again!`,
        isUser: false,
      });
    }

    setFeedback(newFeedback);
    setUserAnswer(''); // Reset the answer input field

    // Move to the next question or show the result if quiz is finished
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate the percentage score
      const percentage = (score / questions.length) * 100;
      newFeedback.push({
        text: `Your final score is ${score} out of ${questions.length}.`,
        isUser: false,
      });

      // If user passes (80% or more), redirect to signup page
      if (percentage >= 80) {
        newFeedback.push({
          text: 'Congratulations! You passed! Redirecting to the signup page...',
          isUser: false,
        });
        setTimeout(() => {
          navigate('/signup'); // Redirect to signup page after 2 seconds
        }, 2000);
      } else {
        newFeedback.push({
          text: 'You did not pass. You will be redirected to retry.',
          isUser: false,
        });
        setTimeout(() => {
          // Reset the quiz for the user to retry from question 1
          setCurrentQuestionIndex(0);
          setScore(0);
          setFeedback([]); // Clear feedback
          setUserAnswer('');
        }, 2000);
      }

      setFeedback(newFeedback); // Update feedback with final message
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1>AI Learning Platform - Tenses Practice</h1>
      <div style={{ marginBottom: '20px' }}>
        {feedback.map((item, index) => (
          <div
            key={index}
            style={{
              textAlign: item.isUser ? 'right' : 'left',
              padding: '10px',
              margin: '5px',
              borderRadius: '10px',
              backgroundColor: item.isUser ? '#daf1d5' : '#f1f1f1',
              maxWidth: '70%',
              marginLeft: item.isUser ? '30%' : '0',
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      <p>Question {currentQuestionIndex + 1} of {questions.length}</p> {/* Display the current question number */}
      <p>{questions[currentQuestionIndex]?.question}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your answer here"
        style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}
      />
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Grammar;
