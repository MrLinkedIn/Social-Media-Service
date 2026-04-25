import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@localpost.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@localpost.com",
      password: "LocalPost2025!",
    },
  });
  console.log("Seeded admin user:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
