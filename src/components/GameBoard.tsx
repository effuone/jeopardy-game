import React from 'react';
import { GameState } from '../types';

interface GameBoardProps {
  gameState: GameState;
  onQuestionSelect: (categoryIndex: number, questionIndex: number) => void;
}

export function GameBoard({ gameState, onQuestionSelect }: GameBoardProps) {
  // Get the number of questions per category (assuming all categories have the same number of questions)
  const numQuestions = gameState.categories[0].questions.length;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            {gameState.categories.map((category, categoryIndex) => (
              <th
                key={categoryIndex}
                className="bg-blue-900 text-white p-4 text-xl font-bold rounded-lg h-24"
              >
                {category.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(numQuestions)].map((_, questionIndex) => (
            <tr key={questionIndex}>
              {gameState.categories.map((category, categoryIndex) => {
                const question = category.questions[questionIndex];
                return (
                  <td key={`${categoryIndex}-${questionIndex}`} className="p-1">
                    <button
                      onClick={() => onQuestionSelect(categoryIndex, questionIndex)}
                      className={`w-full h-24 ${
                        question.revealed
                          ? 'bg-blue-800/50 cursor-not-allowed'
                          : 'bg-blue-800 hover:bg-blue-700 cursor-pointer'
                      } text-white font-bold text-3xl rounded-lg transition-colors`}
                      disabled={question.revealed}
                    >
                      {question.revealed ? '' : `$${question.value}`}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}