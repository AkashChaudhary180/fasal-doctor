import { connectDB } from '../config/db.js';
import { Disease } from '../models/Disease.model.js';
import { AgriStore } from '../models/AgriStore.model.js';
import { SEED_DISEASES, SEED_AGRI_STORES } from './seedData.js';

async function seedDatabase() {
  console.log('🌱 Starting Fasal Doctor database seed...');
  const connected = await connectDB();
  if (!connected) {
    console.log('ℹ️ Running in memory mode. Seed script skipped external database insertion.');
    return;
  }

  try {
    for (const d of SEED_DISEASES) {
      await Disease.findOneAndUpdate({ code: d.code }, d, { upsert: true, new: true });
    }
    console.log(`✅ Seeded ${SEED_DISEASES.length} diseases.`);

    for (const s of SEED_AGRI_STORES) {
      await AgriStore.findOneAndUpdate(
        { name: s.name, phone: s.phone },
        {
          ...s,
          location: {
            type: 'Point',
            coordinates: [s.longitude, s.latitude],
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${SEED_AGRI_STORES.length} agri stores.`);
    console.log('🌾 Database seed completed successfully!');
  } catch (err: any) {
    console.error('❌ Error during seeding:', err.message);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
