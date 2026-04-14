import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { events } from "../src/data/events";

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding events…");
  for (const e of events) {
    await prisma.event.upsert({
      where: { id: e.id },
      update: {
        status:      e.status,
        title:       e.title,
        type:        e.type,
        date:        e.date,
        time:        e.time,
        location:    e.location,
        college:     e.college,
        description: e.description,
        body:        e.body,
        image:       e.image,
        gallery:     e.gallery,
        galleryUrl:  e.galleryUrl,
        link:        e.link,
      },
      create: {
        id:          e.id,
        status:      e.status,
        title:       e.title,
        type:        e.type,
        date:        e.date,
        time:        e.time,
        location:    e.location,
        college:     e.college,
        description: e.description,
        body:        e.body,
        image:       e.image,
        gallery:     e.gallery,
        galleryUrl:  e.galleryUrl,
        link:        e.link,
      },
    });
  }
  console.log(`✓ Seeded ${events.length} events.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
