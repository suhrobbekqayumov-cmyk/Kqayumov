// Mega Bozor — Mahsulotlar bazasi
const CATEGORIES = [
  {icon:"📱",name:"Smartfonlar",count:1240},
  {icon:"💻",name:"Noutbuklar",count:680},
  {icon:"🎧",name:"Audio",count:920},
  {icon:"⌚",name:"Soatlar",count:430},
  {icon:"📷",name:"Kameralar",count:210},
  {icon:"🎮",name:"O'yinlar",count:1560},
  {icon:"👕",name:"Kiyim",count:8400},
  {icon:"🏠",name:"Uy uchun",count:5230},
];

const PRODUCTS = [
  {id:1,name:"iPhone 15 Pro Max 256GB",cat:"Smartfonlar",icon:"📱",price:15990000,old:17500000,tag:"-9%"},
  {id:2,name:"MacBook Air M3 13\"",cat:"Noutbuklar",icon:"💻",price:17500000,old:null,tag:"YANGI"},
  {id:3,name:"AirPods Pro 2-avlod",cat:"Audio",icon:"🎧",price:2890000,old:3400000,tag:"-15%"},
  {id:4,name:"Apple Watch Ultra 2",cat:"Soatlar",icon:"⌚",price:11200000,old:null,tag:"HIT"},
  {id:5,name:"Sony A7 IV Kamera",cat:"Kameralar",icon:"📷",price:28500000,old:30000000,tag:"-5%"},
  {id:6,name:"PlayStation 5 Pro",cat:"O'yinlar",icon:"🎮",price:9800000,old:null,tag:"YANGI"},
  {id:7,name:"Samsung S24 Ultra 512GB",cat:"Smartfonlar",icon:"📱",price:13200000,old:14800000,tag:"-10%"},
  {id:8,name:"ASUS ROG Strix G16",cat:"Noutbuklar",icon:"💻",price:19500000,old:null,tag:"GAMER"},
  {id:9,name:"JBL Charge 5 Bluetooth",cat:"Audio",icon:"🎧",price:1890000,old:2200000,tag:"-14%"},
  {id:10,name:"Garmin Fenix 7X",cat:"Soatlar",icon:"⌚",price:8400000,old:null,tag:"HIT"},
  {id:11,name:"DJI Mini 4 Pro Dron",cat:"Kameralar",icon:"📷",price:9200000,old:9900000,tag:"-7%"},
  {id:12,name:"Xbox Series X 1TB",cat:"O'yinlar",icon:"🎮",price:7600000,old:null,tag:"BEST"},
];
