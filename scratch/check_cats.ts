import mongoose from 'mongoose';
import dbConnect from '../src/lib/db';
import Category from '../src/models/Category';

async function checkCategories() {
  await dbConnect();
  const cats = await Category.find({});
  console.log('--- ALL CATEGORIES ---');
  cats.forEach(c => {
    console.log(`Name: ${c.name}, Vertical: ${c.parentVertical}, Curated: ${c.isCurated}`);
  });
  process.exit(0);
}

checkCategories();
