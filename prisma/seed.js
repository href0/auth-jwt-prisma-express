import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker";
import { hashBcrypt } from "../src/helpers/common.js";
import { permissionSeed } from "../src/seeders/permission.seed.js";
import { roleSeed } from "../src/seeders/role.seed.js";
import { userSeed } from "../src/seeders/user.seed.js";
import { rolePermissionSeed } from "../src/seeders/role-permission.seed.js";
import { menuSeed } from "../src/seeders/menu.seed.js";
import { subMenuSeed } from "../src/seeders/sub-menu.seed.js";

const prisma = new PrismaClient()

async function main() {
  await roleSeed()
  await userSeed()
  await menuSeed()
  await subMenuSeed()
  await permissionSeed()
  await rolePermissionSeed()

  switch (process.env.NODE_ENV) {
    case 'development':
       /** data for your development environment */
      const password = hashBcrypt("href")
      // create 100 user randomly
      for (let x = 1; x <= 100; x++) {
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
            name      : name,
            email     : email,
            password  : password,
            roleId    : 2,
            createdAt : randomDate,
            updatedAt : randomDate
          },
        })
      }
      break
    case 'test':
      /** data for your test environment */
      break
    default:
      break
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