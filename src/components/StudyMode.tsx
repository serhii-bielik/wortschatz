'use client'

import { useState } from 'react'
import type { Word } from '@/types'

type Props = {
  words: Word[]
}

type StudyState = 'question' | 'answer'

export default function StudyMode({ words }: Props) {
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<StudyState>('question')
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  const word = words[index]

  function handleAnswer(isCorrect: boolean) {
    if (isCorrect) setCorrect((c) => c + 1)

    if (index + 1 >= words.length) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
      setState('question')
    }
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Готово!</h2>
        <p className="text-gray-500 mb-6">
          Правильно: {correct} из {words.length}
        </p>
        <button
          onClick={() => {
            setIndex(0)
            setState('question')
            setCorrect(0)
            setFinished(false)
          }}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Начать заново
        </button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="text-sm text-gray-400 mb-6 text-center">
        {index + 1} / {words.length}
      </div>

      <div className="border rounded-xl p-8 text-center min-h-48 flex flex-col items-center justify-center gap-4">
        <div className="text-3xl font-bold">{word.german}</div>

        {state === 'answer' && (
          <div className="text-xl text-gray-600">{word.translation}</div>
        )}

        {word.example && state === 'answer' && (
          <div className="text-sm text-gray-400 italic">{word.example}</div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {state === 'question' ? (
          <button
            onClick={() => setState('answer')}
            className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600"
          >
            Показать перевод
          </button>
        ) : (
          <>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-100 text-red-600 px-6 py-2 rounded-lg hover:bg-red-200"
            >
              ✗ Не знал
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-100 text-green-600 px-6 py-2 rounded-lg hover:bg-green-200"
            >
              ✓ Знал
            </button>
          </>
        )}
      </div>
    </div>
  )
}