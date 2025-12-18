import fs from 'fs';

const data = JSON.parse(fs.readFileSync('breeds.json', 'utf8'));

console.log(`\n总计: ${data.length} 个猫咪品种\n`);
console.log('序号  ID'.padEnd(12) + '品种名称'.padEnd(30) + '原产地');
console.log('-'.repeat(75));

data.forEach((breed, idx) => {
  console.log(
    String(idx + 1).padStart(3) + '   ' +
    breed.id.padEnd(8) + '  ' +
    breed.name.padEnd(28) + 
    (breed.origin || 'Unknown')
  );
});
