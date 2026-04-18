const fs = require('fs');

const products = [
  {
    "name": "Banarsi Zari Silk Saree",
    "businessVertical": "textiles",
    "category": "Saree",
    "isActive": true
  },
  {
    "name": "Bridal Heavily Embroidered Lehenga",
    "businessVertical": "textiles",
    "category": "Lehenga",
    "isActive": true
  },
  {
    "name": "Royal Banarasi Silk Saree",
    "businessVertical": "textiles",
    "category": "Saree",
    "isActive": true
  }
];

const category = {
    "name": "Royal Saree",
    "slug": "saree",
    "status": "Active",
    "parentVertical": "textiles"
  };

const filteredProducts = products.filter((p) => {
    const pCat = String(p.category || "").toLowerCase().trim();
    const cName = String(category.name || "").toLowerCase().trim();
    const cSlug = String(category.slug || "").toLowerCase().trim();
    return pCat === cName || pCat === cSlug;
});

console.log('Matched:', filteredProducts);

