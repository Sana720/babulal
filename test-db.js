const mongoose = require('mongoose');

async function test() {
  await mongoose.connect('mongodb+srv://globalwebify27_db_user:I4ZXfTBZ4Fbh1KfE@cluster0.ylwmmjq.mongodb.net/?appName=Cluster0');
  const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({
    name: String, category: String, slug: String, businessVertical: String, isActive: Boolean
  }));
  const products = await Product.find({}).lean();
  console.log('PRODUCTS: ', JSON.stringify(products, null, 2));

  const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({
    name: String, slug: String, status: String, parentVertical: String
  }));
  const categories = await Category.find({}).lean();
  console.log('CATEGORIES: ', JSON.stringify(categories, null, 2));

  process.exit();
}
test();
