import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.role.upsert({
    where : { id : 1 },
    update: {},
    create: {
      id: 1,
      name: 'Admin',
    },
  })
  const user = await prisma.role.upsert({
    where : { id : 2 },
    update: {},
    create: {
      id: 2,
      name: 'User',
    },
  })

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync('href', salt)
  for (let x = 1; x <= 1000000; x++) {
    console.log('muda muda muda muda ', x)
    const email = faker.internet.email()
    const name = faker.person.fullName()
    const now = new Date()
    const year = now.getFullYear()
    const date = now.getDate()
    const currMonth = now.getMonth() + 1

    const from = new Date(`${year}-${currMonth}-01`).getTime()/ 1000
    const to = new Date(`${year}-${currMonth}-${date}`) / 1000

    const randomDate = Math.floor(Math.random() * (to - from + 1) ) + from;

    await prisma.user.upsert({
      where : { email : email },
      update: {},
      create: {
          // id: 1,
        name      : name,
        email     : email,
        password  : passwordHash,
        roleId    : 2,
        createdAt : randomDate,
        updatedAt : randomDate
      },
    })
    
  }
}

main()
  .then(async()=>{
    await prisma.$disconnect()
  })
  .catch(async (e) =>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })