const fs = require('fs');
const data = JSON.parse(fs.readFileSync('breeds.json', 'utf8'));

console.log(`\n总计: ${data.length} 个猫咪品种\n`);
console.log('ID'.padEnd(10) + '品种名称'.padEnd(30) + '原产地');
console.log('-'.repeat(70));

data.forEach((breed, idx) => {
  console.log(
    breed.id.padEnd(10) + 
    breed.name.padEnd(30) + 
    (breed.origin || 'Unknown')
  );
});
