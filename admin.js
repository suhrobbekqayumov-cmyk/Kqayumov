// Admin Panel — Mega Bozor
const ORDERS = [
  {id:"#10245",customer:"Akmal Tursunov",total:15990000,status:"ok",date:"2026-05-02"},
  {id:"#10244",customer:"Dilnoza Karimova",total:2890000,status:"wait",date:"2026-05-02"},
  {id:"#10243",customer:"Bekzod Sobirov",total:17500000,status:"ok",date:"2026-05-01"},
  {id:"#10242",customer:"Madina Yusupova",total:1890000,status:"cancel",date:"2026-05-01"},
  {id:"#10241",customer:"Jasur Rahmatov",total:9800000,status:"ok",date:"2026-04-30"},
  {id:"#10240",customer:"Sevara Aliyeva",total:8400000,status:"wait",date:"2026-04-30"},
];

const USERS = [
  {name:"Akmal Tursunov",email:"akmal@mail.uz",orders:12,spent:48500000,joined:"2024-08-12"},
  {name:"Dilnoza Karimova",email:"dilnoza@mail.uz",orders:7,spent:12300000,joined:"2025-01-04"},
  {name:"Bekzod Sobirov",email:"bekzod@mail.uz",orders:24,spent:92800000,joined:"2024-03-20"},
  {name:"Madina Yusupova",email:"madina@mail.uz",orders:3,spent:5600000,joined:"2025-09-15"},
];

const fmtUZS = n => new Intl.NumberFormat('uz-UZ').format(n) + " so'm";

function checkAdmin(){
  const u = getUser();
  if(u && u.isAdmin){
    document.getElementById('gate').style.display='none';
    document.getElementById('adminShell').style.display='grid';
    document.getElementById('adminName').textContent = u.name;
    document.getElementById('adminAvatar').src = u.picture;
    renderAll();
  } else if (u){
    document.getElementById('gateMsg').textContent = "Sizda admin huquqi yo'q. Boshqa akkaunt bilan kiring.";
  }
}

function renderDashboard(){
  document.getElementById('tab-dashboard').innerHTML = `
    <div class="kpi-grid">
      <div class="kpi"><div class="label">Bugungi savdo</div><div class="value">${fmtUZS(48290000)}</div><div class="delta">▲ +12.4% kechagi</div></div>
      <div class="kpi"><div class="label">Buyurtmalar</div><div class="value">${ORDERS.length}</div><div class="delta">▲ +8 yangi</div></div>
      <div class="kpi"><div class="label">Foydalanuvchilar</div><div class="value">1,284</div><div class="delta">▲ +24 hafta</div></div>
      <div class="kpi"><div class="label">Konversiya</div><div class="value">3.8%</div><div class="delta down">▼ -0.2%</div></div>
    </div>
    <div class="panel">
      <h3>Haftalik savdo</h3>
      <div class="bar-chart" id="weekChart"></div>
    </div>
    <div class="panel">
      <h3>So'nggi buyurtmalar</h3>
      ${ordersTable(ORDERS.slice(0,5))}
    </div>`;
  drawChart();
}

function drawChart(){
  const data = [
    {d:"Du",v:32},{d:"Se",v:48},{d:"Cho",v:38},{d:"Pa",v:62},
    {d:"Ju",v:78},{d:"Sha",v:95},{d:"Yak",v:82}
  ];
  const max = Math.max(...data.map(x=>x.v));
  document.getElementById('weekChart').innerHTML = data.map(x=>`
    <div class="bar" style="height:${x.v/max*100}%">
      <b>${x.v}M</b><span>${x.d}</span>
    </div>`).join('');
}

function ordersTable(list){
  const labels = {ok:"Bajarildi",wait:"Kutilmoqda",cancel:"Bekor qilindi"};
  return `<table><thead><tr><th>ID</th><th>Mijoz</th><th>Summa</th><th>Holat</th><th>Sana</th><th></th></tr></thead><tbody>
    ${list.map(o=>`<tr>
      <td><b>${o.id}</b></td><td>${o.customer}</td><td>${fmtUZS(o.total)}</td>
      <td><span class="pill ${o.status}">${labels[o.status]}</span></td>
      <td>${o.date}</td>
      <td><div class="row-actions"><button>Ko'rish</button><button>Tahrir</button></div></td>
    </tr>`).join('')}
  </tbody></table>`;
}

function renderProducts(){
  document.getElementById('tab-products').innerHTML = `
    <div class="toolbar">
      <input placeholder="Mahsulot qidirish..." />
      <button class="btn btn-primary">+ Yangi mahsulot</button>
    </div>
    <div class="panel">
      <table><thead><tr><th></th><th>Nomi</th><th>Kategoriya</th><th>Narx</th><th>Holat</th><th></th></tr></thead><tbody>
      ${PRODUCTS.map(p=>`<tr>
        <td style="font-size:24px">${p.icon}</td>
        <td><b>${p.name}</b></td>
        <td>${p.cat}</td>
        <td>${fmtUZS(p.price)}</td>
        <td><span class="pill ok">Faol</span></td>
        <td><div class="row-actions"><button>Tahrir</button><button>O'chirish</button></div></td>
      </tr>`).join('')}
      </tbody></table>
    </div>`;
}

function renderOrders(){
  document.getElementById('tab-orders').innerHTML = `
    <div class="toolbar">
      <input placeholder="Buyurtma ID yoki mijoz..." />
      <button class="btn btn-primary">Eksport CSV</button>
    </div>
    <div class="panel">${ordersTable(ORDERS)}</div>`;
}

function renderUsers(){
  document.getElementById('tab-users').innerHTML = `
    <div class="toolbar">
      <input placeholder="Foydalanuvchi qidirish..." />
    </div>
    <div class="panel">
      <table><thead><tr><th>Ism</th><th>Email</th><th>Buyurtmalar</th><th>Sarflagan</th><th>Qo'shilgan</th><th></th></tr></thead><tbody>
      ${USERS.map(u=>`<tr>
        <td><b>${u.name}</b></td><td>${u.email}</td><td>${u.orders}</td>
        <td>${fmtUZS(u.spent)}</td><td>${u.joined}</td>
        <td><div class="row-actions"><button>Profil</button><button>Bloklash</button></div></td>
      </tr>`).join('')}
      </tbody></table>
    </div>`;
}

function renderAnalytics(){
  document.getElementById('tab-analytics').innerHTML = `
    <div class="kpi-grid">
      <div class="kpi"><div class="label">Oylik daromad</div><div class="value">${fmtUZS(842000000)}</div><div class="delta">▲ +18.2%</div></div>
      <div class="kpi"><div class="label">O'rtacha chek</div><div class="value">${fmtUZS(1240000)}</div><div class="delta">▲ +4.1%</div></div>
      <div class="kpi"><div class="label">Qaytuvchi mijozlar</div><div class="value">68%</div><div class="delta">▲ +3%</div></div>
    </div>
    <div class="panel"><h3>Top kategoriyalar</h3>
      ${CATEGORIES.slice(0,5).map(c=>`
        <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--line)">
          <span style="font-size:24px">${c.icon}</span>
          <b style="flex:1">${c.name}</b>
          <span style="color:var(--muted)">${c.count} sotuv</span>
          <div style="width:140px;height:8px;background:var(--surface);border-radius:4px;overflow:hidden">
            <div style="width:${Math.random()*70+30}%;height:100%;background:var(--grad)"></div>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderSettings(){
  document.getElementById('tab-settings').innerHTML = `
    <div class="panel">
      <h3>Sayt sozlamalari</h3>
      <div class="form-grid">
        <input value="Mega Bozor" placeholder="Sayt nomi" />
        <input value="info@megabozor.uz" placeholder="Email" />
        <input value="+998 90 123 45 67" placeholder="Telefon" />
        <input value="Toshkent, O'zbekiston" placeholder="Manzil" />
        <input class="full" value="Suhrobbek Qayumov" placeholder="Egasining ismi" />
        <select><option>So'm (UZS)</option><option>USD</option></select>
        <select><option>O'zbekcha</option><option>Русский</option><option>English</option></select>
      </div>
      <button class="btn btn-primary" style="margin-top:18px">Saqlash</button>
    </div>
    <div class="panel">
      <h3>Xavfsizlik</h3>
      <p style="color:var(--muted);margin-bottom:14px;font-size:14px">Admin emaillarini <code>js/auth.js</code> faylida ADMIN_EMAILS ro'yxatida boshqarishingiz mumkin.</p>
      <button class="btn btn-primary">Auth loglarini ko'rish</button>
    </div>`;
}

function renderAll(){
  renderDashboard(); renderProducts(); renderOrders();
  renderUsers(); renderAnalytics(); renderSettings();
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.side-link').forEach(b=>{
    b.onclick = ()=>{
      document.querySelectorAll('.side-link').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      document.querySelectorAll('.tab').forEach(t=>t.hidden=true);
      const tab = b.dataset.tab;
      document.getElementById('tab-'+tab).hidden=false;
      document.getElementById('tabTitle').textContent = b.textContent.trim().slice(2);
    };
  });
  setTimeout(checkAdmin, 300);
  // Re-check after Google auth callback
  window.addEventListener('storage', checkAdmin);
  const orig = window.handleCredentialResponse;
  window.handleCredentialResponse = function(r){ orig(r); setTimeout(checkAdmin,200); };
});

// showToast for admin
function showToast(msg){
  const t=document.createElement('div');t.className='toast';t.textContent=msg;
  document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>t.remove(),2400);
}
