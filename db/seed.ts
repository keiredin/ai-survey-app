
import { prisma } from "./prisma";
import sampleData from "./sample-data";

async function main() {
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully");
}

main();
