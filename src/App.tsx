import React, { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { QuestionModal } from './components/QuestionModal';
import { GameState, Team } from './types';
import { Grid } from 'lucide-react';

const initialTeams: Team[] = [
  { name: 'Team 1', score: 0 },
  { name: 'Team 2', score: 0 },
  { name: 'Team 3', score: 0 },
  { name: 'Team 4', score: 0 },
];

const initialGameState: GameState = {
  categories: [
    {
      title: 'История',
      questions: [
        {
          value: 100,
          question: 'Сколько времени длился полёт Юрия Гагарина?',
          answer: '108 минут',
          revealed: false,
        },
        {
          value: 200,
          question:
            'Какая планета в Солнечной системе раньше считалась "близнецом Земли", пока не оказалось, что на ней ад, давление как в глубинах океана и кислотные дожди?',
          answer: 'Венера',
          revealed: false,
        },
        {
          value: 300,
          question:
            'Какая страна стала третьей, самостоятельно отправившей человека в космос?',
          answer: 'Китай (Ян Ливэй, 2003)',
          revealed: false,
        },
        {
          value: 400,
          question:
            'Как назывался человек, который первым в истории придумал идею полета в космос задолго до Гагарина?',
          answer:
            'Константин Циолковский (Он писал о ракетах ещё в XIX веке — когда максимум, что летало, были голуби.)',
          revealed: false,
        },
        {
          value: 500,
          question:
            'Какая космическая миссия НАСА провалилась из-за того, что одни инженеры считали расстояния в километрах, а другие — в милях?',
          answer:
            'Mars Climate Orbiter, 1999 (Да-да, $327 миллионов, и вся ошибка — в переводе единиц измерения.)',
          revealed: false,
        },
      ],
    },
    {
      title: 'Байконур',
      questions: [
        {
          value: 100,
          question: 'Сколько платит Россия за аренду Байконура у Казахстана?',
          answer: 'Около 115 миллионов долларов в год (аренда до 2050 года)',
          revealed: false,
        },
        {
          value: 200,
          question:
            'Сколько квадратных километров занимает космодром Байконур?',
          answer:
            'Около 6717 км² (Больше, чем Люксембург, почти как Делавэр, и даже больше, чем Палестина)',
          revealed: false,
        },
        {
          value: 300,
          question:
            'Почему для строительства Байконура выбрали именно это место, а не, например, Крым или Каспийское побережье?',
          answer:
            'Идеальное сочетание: близость к экватору (45,6° с.ш.), безопасные траектории запуска, ровный ландшафт, более 300 ясных дней в году',
          revealed: false,
        },
        {
          value: 400,
          question:
            'Как СССР пытался скрыть настоящее местоположение Байконура от вражеских разведок?',
          answer:
            'В 300 км от настоящего космодрома был построен ложный "Байконур" — деревянный макет стартовых площадок и техники',
          revealed: false,
        },
        {
          value: 500,
          question: 'Как в советских секретных документах называли Байконур?',
          answer: 'Ташкент-90',
          revealed: false,
        },
      ],
    },
    {
      title: 'Космические Өсеки',
      questions: [
        {
          value: 100,
          question:
            'Правда ли, что космонавты до сих пор перед стартом писают на колесо автобуса?',
          answer:
            'True (Это стало обрядом на удачу. Даже женщины-космонавты участвуют)',
          revealed: false,
        },
        {
          value: 200,
          question:
            'Правда ли, что космонавты на МКС пьют воду, переработанную из мочи и пота?',
          answer:
            'True (Система рециркуляции превращает всё в питьевую воду. Она чище, чем в большинстве городов)',
          revealed: false,
        },
        {
          value: 300,
          question: 'Правда ли, что Pizza Hut доставила пиццу в космос?',
          answer:
            'True (За $1 млн они отправили первую рекламную пиццу космонавту Юрию Усачёву)',
          revealed: false,
        },
        {
          value: 400,
          question:
            'Миф или реальность: NASA потратила миллионы на "космическую ручку"?',
          answer:
            'False (Миф! Ручку разработал Пол Фишер на свои средства. NASA потом просто закупила 400 штук по $2.39)',
          revealed: false,
        },
        {
          value: 500,
          question:
            'Правда ли, что чёрная дыра может растянуть человека в "космическую спагеттину"?',
          answer:
            'True (Это называется спагеттификация. Из-за разницы в гравитации между головой и ногами твоё тело вытянется в тонкую нить)',
          revealed: false,
        },
      ],
    },
    {
      title: 'Рэндом',
      questions: [
        {
          value: 100,
          question:
            'Какой астронавт первым произнёс фразу: "Houston, we have a problem"?',
          answer: 'Джим Ловелл (Apollo 13)',
          revealed: false,
        },
        {
          value: 200,
          question:
            'На какой планете, по расчётам учёных, идут дожди из алмазов?',
          answer: 'Нептун',
          revealed: false,
        },
        {
          value: 300,
          question:
            'Какой зонд до сих пор шлёт сигналы из межзвёздного пространства?',
          answer: 'Voyager-1 (Летит с 1977 года, сигнал идёт 21 час)',
          revealed: false,
        },
        {
          value: 400,
          question:
            'Как назывался загадочный сигнал 1977 года, который могли отправить инопланетяне?',
          answer: 'Wow! Signal (72 секунды. Больше не повторялся)',
          revealed: false,
        },
        {
          value: 500,
          question:
            'Какой неожиданный груз Илон Маск запустил в космос на Falcon Heavy?',
          answer:
            'Свою личную Tesla Roadster (В ней сидел манекен "Starman" в скафандре)',
          revealed: false,
        },
      ],
    },
    {
      title: 'Кино и музыка',
      questions: [
        {
          value: 100,
          question:
            'Какой трек играл в колонках Tesla Roadster, которую Илон Маск запустил в космос?',
          answer: 'Space Oddity — David Bowie',
          revealed: false,
        },
        {
          value: 200,
          question:
            'В каком фильме главный герой выживает, выращивая картошку и используя знания ботаники и химии?',
          answer: 'Марсианин (The Martian)',
          revealed: false,
        },
        {
          value: 300,
          question:
            'Какой культовый фильм показал чёрную дыру так реалистично, что кадр потом попал в научные статьи?',
          answer: 'Интерстеллар',
          revealed: false,
        },
        {
          value: 400,
          question:
            'Какая песня группы Queen была использована в космосе как "будильник" для экипажа NASA?',
          answer: "Don't Stop Me Now",
          revealed: false,
        },
        {
          value: 500,
          question:
            'Какая песня из "Стражей Галактики" звучит, когда Питер Квилл впервые танцует среди развалин?',
          answer: 'Come and Get Your Love — Redbone',
          revealed: false,
        },
      ],
    },
  ],
  currentQuestion: null,
  showAnswer: false,
  teams: initialTeams,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem('jeopardyGameState');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Failed to parse saved game state', e);
        return initialGameState;
      }
    }
    return initialGameState;
  });

  const [editingTeam, setEditingTeam] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('jeopardyGameState', JSON.stringify(gameState));
  }, [gameState]);

  const resetGame = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the game? All progress will be lost.'
      )
    ) {
      setGameState(initialGameState);
      localStorage.removeItem('jeopardyGameState');
    }
  };

  const handleQuestionSelect = (
    categoryIndex: number,
    questionIndex: number
  ) => {
    setGameState((prev) => ({
      ...prev,
      currentQuestion: { categoryIndex, questionIndex },
      showAnswer: false,
    }));
  };

  const handleCloseQuestion = () => {
    if (gameState.currentQuestion) {
      const { categoryIndex, questionIndex } = gameState.currentQuestion;
      setGameState((prev) => ({
        ...prev,
        categories: prev.categories.map((category, cIndex) =>
          cIndex === categoryIndex
            ? {
                ...category,
                questions: category.questions.map((question, qIndex) =>
                  qIndex === questionIndex
                    ? { ...question, revealed: true }
                    : question
                ),
              }
            : category
        ),
        currentQuestion: null,
        showAnswer: false,
      }));
    }
  };

  const handleShowAnswer = () => {
    setGameState((prev) => ({
      ...prev,
      showAnswer: true,
    }));
  };

  const handleUpdateTeamName = (teamIndex: number, newName: string) => {
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((team, index) =>
        index === teamIndex ? { ...team, name: newName } : team
      ),
    }));
    setEditingTeam(null);
  };

  const handleUpdateScore = (teamIndex: number, points: number) => {
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((team, index) =>
        index === teamIndex ? { ...team, score: team.score + points } : team
      ),
    }));
  };

  const currentQuestion = gameState.currentQuestion
    ? gameState.categories[gameState.currentQuestion.categoryIndex].questions[
        gameState.currentQuestion.questionIndex
      ]
    : null;

  return (
    <div className='min-h-screen bg-gray-900 py-8'>
      <div className='container mx-auto px-4'>
        <header className='mb-8'>
          <div className='flex items-center justify-between text-white mb-4'>
            <div className='flex items-center gap-2'>
              <Grid size={32} />
              <h1 className='text-4xl font-bold'>Космическая Викторина</h1>
            </div>
            <button
              onClick={resetGame}
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors'
            >
              Reset Game
            </button>
          </div>

          {/* Teams and Scores */}
          <div className='grid grid-cols-4 gap-4 mb-6'>
            {gameState.teams.map((team, index) => (
              <div
                key={index}
                className='bg-blue-900 p-4 rounded-lg text-white'
              >
                {editingTeam === index ? (
                  <input
                    type='text'
                    value={team.name}
                    onChange={(e) =>
                      handleUpdateTeamName(index, e.target.value)
                    }
                    onBlur={() => setEditingTeam(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingTeam(null)}
                    className='w-full px-2 py-1 text-black rounded mb-2'
                    autoFocus
                  />
                ) : (
                  <h2
                    className='text-xl font-bold mb-2 cursor-pointer hover:text-blue-300'
                    onClick={() => setEditingTeam(index)}
                  >
                    {team.name}
                  </h2>
                )}
                <div className='text-2xl font-bold'>${team.score}</div>
              </div>
            ))}
          </div>
        </header>

        <GameBoard
          gameState={gameState}
          onQuestionSelect={handleQuestionSelect}
        />

        {currentQuestion && (
          <QuestionModal
            question={currentQuestion}
            showAnswer={gameState.showAnswer}
            onClose={handleCloseQuestion}
            onShowAnswer={handleShowAnswer}
            teams={gameState.teams}
            onUpdateScore={handleUpdateScore}
          />
        )}
      </div>
    </div>
  );
}

export default App;
