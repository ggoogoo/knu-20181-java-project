var data = require('./public/toilet.js');
console.log(data.Toilet[0]);
for(let i = 0; i < data.Toilet.length; i++){
  if(data.Toilet[i].Latitude === undefined || data.Toilet[i].Latitude === null || data.Toilet[i].Longitude === null || data.Toilet[i].Latitude === '' || data.Toilet[i].Longitude === undefined || data.Toilet[i].Longitude === ''){
    console.log(i);
  }
}
