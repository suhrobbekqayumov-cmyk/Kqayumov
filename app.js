// Mega Bozor — Asosiy mantiq
const fmt = n => new Intl.NumberFormat('uz-UZ').format(n) + " so'm";
const $ = s => document.querySelector(s);

let cart = JSON.parse(localStorage.getItem('mb_cart')||'[]');
let activeFilter = 'Hammasi';

function showToast(msg){
  const t = document.createElement('div');
  t.className='toast'; t.textContent=msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{t.classList.remove('show'); setTimeout(()=>t.remove(),300)},2400);
}

function renderCategories(){
  const grid = $('#categoryGrid');
  grid.innerHTML = CATEGORIES.map(c=>`
    <div class="cat-card" onclick="filterByCategory('${c.name}')">
      <div class="cat-icon">${c.icon}</div>
      <h4>${c.name}</h4>
      <span>${c.count.toLocaleString()} mahsulot</span>
    </div>`).join('');
}

function renderFilters(){
  const cats = ['Hammasi', ...new Set(PRODUCTS.map(p=>p.cat))];
  $('#filters').innerHTML = cats.map(c=>`
    <button class="filter-btn ${c===activeFilter?'active':''}" onclick="setFilter('${c}')">${c}</button>
  `).join('');
}

function setFilter(c){activeFilter=c;renderFilters();renderProducts()}
function filterByCategory(c){setFilter(c);document.getElementById('products').scrollIntoView({behavior:'smooth'})}

function renderProducts(){
  const items = activeFilter==='Hammasi' ? PRODUCTS : PRODUCTS.filter(p=>p.cat===activeFilter);
  $('#productGrid').innerHTML = items.map(p=>`
    <div class="product">
      <div class="product-img">
        <span>${p.icon}</span>
        ${p.tag?`<span class="product-tag">${p.tag}</span>`:''}
      </div>
      <div class="product-body">
        <span class="cat">${p.cat}</span>
        <h3>${p.name}</h3>
        <div class="price">${fmt(p.price)} ${p.old?`<span class="old">${fmt(p.old)}</span>`:''}</div>
        <button onclick="addToCart(${p.id})">Savatga qo'shish</button>
      </div>
    </div>`).join('');
}

function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  const ex = cart.find(x=>x.id===id);
  if(ex) ex.qty++; else cart.push({...p,qty:1});
  saveCart(); showToast(`"${p.name}" savatga qo'shildi`);
}

function removeFromCart(id){
  cart = cart.filter(x=>x.id!==id);
  saveCart(); renderCart();
}

function saveCart(){
  localStorage.setItem('mb_cart', JSON.stringify(cart));
  $('#cartCount').textContent = cart.reduce((s,x)=>s+x.qty,0);
}

function renderCart(){
  const box = $('#cartItems');
  if(!cart.length){ box.innerHTML = '<div class="empty">Savat bo\'sh</div>'; $('#cartTotal').textContent=fmt(0); return; }
  box.innerHTML = cart.map(x=>`
    <div class="cart-row">
      <div class="ci">${x.icon}</div>
      <div class="info">
        <h5>${x.name}</h5>
        <p>${x.qty} × ${fmt(x.price)}</p>
      </div>
      <button onclick="removeFromCart(${x.id})">✕</button>
    </div>`).join('');
  $('#cartTotal').textContent = fmt(cart.reduce((s,x)=>s+x.price*x.qty,0));
}

function openCart(){renderCart();$('#cartDrawer').classList.add('open');$('#overlay').classList.add('show')}
function closeCart(){$('#cartDrawer').classList.remove('open');$('#overlay').classList.remove('show')}

document.addEventListener('DOMContentLoaded', ()=>{
  renderCategories(); renderFilters(); renderProducts(); saveCart();
  $('#cartBtn').onclick = openCart;
  $('#closeCart').onclick = closeCart;
  $('#overlay').onclick = closeCart;
  $('#loginBtn').onclick = promptLogin;
  $('#logoutBtn').onclick = logout;
  $('#contactForm').onsubmit = e=>{e.preventDefault();e.target.reset();showToast("Xabar yuborildi! Tez orada bog'lanamiz.")};
  $('#heroSearch').addEventListener('keypress', e=>{
    if(e.key==='Enter'){
      const q = e.target.value.toLowerCase();
      const found = PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q));
      if(found.length){ activeFilter='Hammasi'; $('#productGrid').innerHTML=''; document.getElementById('products').scrollIntoView({behavior:'smooth'}); setTimeout(()=>{$('#productGrid').innerHTML = found.map(p=>document.createElement('div').outerHTML).join(''); renderProducts.call({filter:found});},100); }
      showToast(`Topildi: ${found.length} ta mahsulot`);
    }
  });
});
