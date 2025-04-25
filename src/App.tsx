import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { QuestionModal } from './components/QuestionModal';
import { GameState } from './types';
import { Grid } from 'lucide-react';
import { alimasHappyHour, zarinasHappyHour } from './gameStates';

function App() {
  const [gameState, setGameState] = useState<GameState>(alimasHappyHour);
  const [selectedGame, setSelectedGame] = useState<string>('alima');

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game === 'alima') {
      setGameState(alimasHappyHour);
    } else if (game === 'zarina') {
      setGameState(zarinasHappyHour);
    }
  };

  const handleQuestionSelect = (
    categoryIndex: number,
    questionIndex: number
  ) => {
    setGameState((prevState) => ({
      ...prevState,
      currentQuestion: { categoryIndex, questionIndex },
      showAnswer: false,
    }));
  };

  const handleCloseQuestion = () => {
    if (gameState.currentQuestion) {
      const { categoryIndex, questionIndex } = gameState.currentQuestion;
      setGameState((prevState) => {
        const newState = { ...prevState };
        newState.categories[categoryIndex].questions[questionIndex].revealed =
          true;
        newState.currentQuestion = null;
        newState.showAnswer = false;
        return newState;
      });
    }
  };

  const handleShowAnswer = () => {
    setGameState((prevState) => ({
      ...prevState,
      showAnswer: true,
    }));
  };

  const handleUpdateTeamName = (teamIndex: number, newName: string) => {
    setGameState((prevState) => {
      const newTeams = [...prevState.teams];
      newTeams[teamIndex] = { ...newTeams[teamIndex], name: newName };
      return { ...prevState, teams: newTeams };
    });
  };

  const handleUpdateScore = (teamIndex: number, points: number) => {
    setGameState((prevState) => {
      const newTeams = [...prevState.teams];
      newTeams[teamIndex] = {
        ...newTeams[teamIndex],
        score: newTeams[teamIndex].score + points,
      };
      return { ...prevState, teams: newTeams };
    });
  };

  const resetGame = () => {
    if (selectedGame === 'alima') {
      setGameState(alimasHappyHour);
    } else if (selectedGame === 'zarina') {
      setGameState(zarinasHappyHour);
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white p-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold'>Jeopardy Game</h1>
          <div className='flex gap-4 items-center'>
            <select
              value={selectedGame}
              onChange={handleGameChange}
              className='bg-gray-800 text-white px-4 py-2 rounded-lg'
            >
              <option value='alima'>Alima's Happy Hour</option>
              <option value='zarina'>Zarina's Happy Hour</option>
            </select>
            <button
              onClick={resetGame}
              className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2'
            >
              <Grid size={20} />
              Reset Game
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          {gameState.teams.map((team, index) => (
            <div
              key={index}
              className='bg-gray-800 p-4 rounded-lg flex items-center justify-between'
            >
              <input
                type='text'
                value={team.name}
                onChange={(e) => handleUpdateTeamName(index, e.target.value)}
                className='bg-transparent text-xl font-bold outline-none border-b-2 border-transparent focus:border-blue-500'
              />
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => handleUpdateScore(index, -100)}
                  className='bg-red-600 hover:bg-red-700 w-8 h-8 rounded flex items-center justify-center'
                >
                  -
                </button>
                <span className='text-2xl font-bold min-w-[80px] text-center'>
                  {team.score}
                </span>
                <button
                  onClick={() => handleUpdateScore(index, 100)}
                  className='bg-green-600 hover:bg-green-700 w-8 h-8 rounded flex items-center justify-center'
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <GameBoard
          gameState={gameState}
          onQuestionSelect={handleQuestionSelect}
        />

        {gameState.currentQuestion && (
          <QuestionModal
            question={
              gameState.categories[gameState.currentQuestion.categoryIndex]
                .questions[gameState.currentQuestion.questionIndex]
            }
            showAnswer={gameState.showAnswer}
            onShowAnswer={handleShowAnswer}
            onClose={handleCloseQuestion}
            teams={gameState.teams}
            onUpdateScore={handleUpdateScore}
          />
        )}
      </div>
    </div>
  );
}

export default App;
