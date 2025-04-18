import React from 'react';
import { X } from 'lucide-react';
import { Question, Team } from '../types';

interface QuestionModalProps {
  question: Question;
  showAnswer: boolean;
  onClose: () => void;
  onShowAnswer: () => void;
  teams: Team[];
  onUpdateScore: (teamIndex: number, points: number) => void;
}

export function QuestionModal({
  question,
  showAnswer,
  onClose,
  onShowAnswer,
  teams,
  onUpdateScore,
}: QuestionModalProps) {
  return (
    <div className="fixed inset-0 bg-blue-900 flex items-center justify-center z-50">
      <div className="w-full h-full p-8 flex flex-col items-center justify-center relative">
        <button
          onClick={onClose}
          className="absolute right-8 top-8 text-white/80 hover:text-white"
        >
          <X size={48} />
        </button>

        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-8">
          {/* Team scores row - always visible at the top */}
          <div className="w-full grid grid-cols-4 gap-4 mb-4">
            {teams.map((team, index) => (
              <div key={index} className="bg-blue-800 p-3 rounded-lg text-white text-center">
                <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                <div className="text-2xl font-bold text-yellow-400">${team.score}</div>
              </div>
            ))}
          </div>

          {question.media && (
            <div className="w-full flex justify-center mb-6">
              {question.media.type === 'image' && (
                <img
                  src={question.media.url}
                  alt="Question media"
                  className="max-h-[35vh] rounded-lg"
                />
              )}
              {question.media.type === 'video' && (
                <video
                  src={question.media.url}
                  controls
                  className="max-h-[35vh] w-auto rounded-lg"
                />
              )}
              {question.media.type === 'youtube' && (
                <iframe
                  src={question.media.url}
                  className="w-full aspect-video rounded-lg max-h-[35vh]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          )}

          <div className="text-4xl text-center font-bold text-white mb-6">
            {question.question}
          </div>

          {showAnswer ? (
            <>
              <div className="text-3xl text-center text-yellow-400 font-bold animate-fade-in mb-6">
                {question.answer}
              </div>
              
              <div className="w-full bg-blue-800/80 p-6 rounded-xl shadow-lg">
                <h2 className="text-center text-white text-2xl mb-4">Assign Points</h2>
                <div className="grid grid-cols-4 gap-6">
                  {teams.map((team, index) => (
                    <div key={index} className="text-center bg-blue-700/50 p-4 rounded-lg">
                      <h3 className="text-white text-xl font-bold mb-3">{team.name}</h3>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => onUpdateScore(index, question.value)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-bold hover:bg-green-700 transition-colors"
                        >
                          +{question.value}
                        </button>
                        <button
                          onClick={() => onUpdateScore(index, -question.value)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold hover:bg-red-700 transition-colors"
                        >
                          -{question.value}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={onShowAnswer}
              className="bg-yellow-500 text-blue-900 px-12 py-6 rounded-xl text-3xl font-bold hover:bg-yellow-400 transition-colors"
            >
              Show Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}