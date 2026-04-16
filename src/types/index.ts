export type Category = {
  id: number
  slug: string
  title: string
  description: string | null
  words?: Word[]
}

export type Word = {
  id: number
  german: string
  translation: string
  example: string | null
  categoryId: number
}