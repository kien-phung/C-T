import dotenv from 'dotenv';
dotenv.config();

import { connectMongoDB } from "../utils/libs/database.js";
import { Product } from "../models/product.model.js";

/**
 * Simple migration to ensure all products have bilingual feature arrays.
 * - If features_vn is empty and legacy `features` exists, copy legacy -> features_vn
 * - If features_en is empty, copy features_vn -> features_en (placeholder)
 * This preserves existing bilingual data when available.
 */
async function migrate() {
  await connectMongoDB();

  const products = await Product.find({}).lean();
  let updatedCount = 0;

  for (const p of products) {
    const featuresLegacy = Array.isArray(p.features) ? p.features : [];
    const featuresVN = Array.isArray(p.features_vn) ? p.features_vn : [];
    const featuresEN = Array.isArray(p.features_en) ? p.features_en : [];

    const nextVN = featuresVN.length ? featuresVN : featuresLegacy;
    const nextEN = featuresEN.length ? featuresEN : nextVN;

    // Only update when there is a meaningful change
    const needUpdate = (featuresVN.length === 0 && nextVN.length > 0) || (featuresEN.length === 0 && nextEN.length > 0);
    if (!needUpdate) continue;

    await Product.updateOne({ _id: p._id }, {
      $set: {
        features_vn: nextVN,
        features_en: nextEN,
      }
    });
    updatedCount += 1;
  }

  console.log(`✅ Migration completed. Updated products: ${updatedCount}`);
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});