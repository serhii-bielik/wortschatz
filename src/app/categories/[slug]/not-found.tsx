import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Категория не найдена</h2>
      <Link href="/" className="text-blue-500 hover:underline">
        Вернуться на главную
      </Link>
    </main>
  )
}