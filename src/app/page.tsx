import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { words: true },
      },
    },
  })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Wortschatz</h1>
      <p className="text-gray-500 mb-8">Немецкие слова по категориям</p>

      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold">{category.title}</div>
            {category.description && (
              <div className="text-sm text-gray-500 mt-1">
                {category.description}
              </div>
            )}
            <div className="text-sm text-blue-500 mt-2">
              {category._count.words} слов
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}