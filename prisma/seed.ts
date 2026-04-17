import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const verben = await prisma.category.upsert({
    where: { slug: 'top-verben' },
    update: {},
    create: {
      slug: 'top-verben',
      title: 'Top 20 Verben',
      description: 'Die wichtigsten deutschen Verben',
      words: {
        create: [
          { german: 'sein', translation: 'быть' },
          { german: 'haben', translation: 'иметь' },
          { german: 'werden', translation: 'становиться' },
          { german: 'können', translation: 'мочь' },
          { german: 'müssen', translation: 'должен' },
          { german: 'sagen', translation: 'говорить' },
          { german: 'machen', translation: 'делать' },
          { german: 'gehen', translation: 'идти' },
          { german: 'wissen', translation: 'знать' },
          { german: 'sehen', translation: 'видеть' },
        ],
      },
    },
  })

  console.log('Seeded:', verben)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())