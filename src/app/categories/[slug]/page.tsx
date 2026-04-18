import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })
  return categories.map((c) => ({ slug: c.slug }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const category = await prisma.category.findUnique({
    where: { slug },
    include: { words: true },
  })

  if (!category) notFound()

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link href="/" className="text-sm text-blue-500 hover:underline">
        ← Назад
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{category.title}</h1>
      {category.description && (
        <p className="text-gray-500 mb-8">{category.description}</p>
      )}

      <div className="flex flex-col gap-3">
        {category.words.map((word) => (
          <div key={word.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <span className="font-semibold text-lg">{word.german}</span>
              <span className="text-gray-600">{word.translation}</span>
            </div>
            {word.example && (
              <p className="text-sm text-gray-400 mt-2 italic">{word.example}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}