import { prisma } from "../src/lib/prisma.js";

async function main() {
  const email = "sadaf@iriscommunications.com.pk";
  const password = "SadafJ@123";
  const fullName = "Sadaf";

  console.log(`Seeding user: ${email}...`);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      fullName,
    },
    create: {
      email,
      password,
      fullName,
    },
  });

  console.log("User seeded successfully:", {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  });
}

main()
  .catch((e) => {
    console.error("Error seeding user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
