import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) =>{
  logger.info('Query: ' + e.query)
  logger.info('Params: ' + e.params)
  logger.info('Duration: ' + e.duration + 'ms')
})
prisma.$on('error', (e) =>{
  logger.error(e)
})
prisma.$on('warn', (e) =>{
  logger.warn(e)
})
prisma.$on('info', (e) =>{
  logger.debug(e)
})

prisma.$use(async (params, next) => {
  const result = await next(params);
  console.log('params ', params)
  console.log('result ', result)
  // Disconnect setelah query selesai
  logger.info('Finish')
  prisma.$disconnect();
  logger.info('Disconnect prisma')
  return result;
});


export {
  prisma
}