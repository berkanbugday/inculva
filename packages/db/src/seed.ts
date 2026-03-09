import { db } from "./client.js";

async function main() {
  console.log("Seeding database...");

  const user = await db.user.upsert({
    where: { email: "demo@inculva.com" },
    update: {},
    create: {
      email: "demo@inculva.com",
      name: "Demo User",
      emailVerified: true,
    },
  });

  const site = await db.site.upsert({
    where: { domain: "demo.example.com" },
    update: {},
    create: {
      name: "Demo Site",
      domain: "demo.example.com",
      ownerId: user.id,
      widgetConfig: {
        create: {
          position: "bottom-right",
          theme: "auto",
          primaryColor: "#0066cc",
          language: "en",
        },
      },
    },
  });

  console.log(`Seeded user: ${user.email}`);
  console.log(`Seeded site: ${site.domain}`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
