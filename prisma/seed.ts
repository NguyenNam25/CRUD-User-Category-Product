import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash("t123456", 10);

  const user = await prisma.user.upsert({
    where: {
      email: "nam@gmail.com",
    },
    update: {
      password: hashedPassword,
    },
    create: {
      fullname: "Nguyen Nam",
      email: "nam@gmail.com",
      password: hashedPassword,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
