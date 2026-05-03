// Google Sign-In integratsiyasi (GIS — Google Identity Services)
// MUHIM: O'zingizning Google Client ID'ingizni qo'ying:
// https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

const ADMIN_EMAILS = [
  // Admin huquqi beriladigan emaillar:
  "suhrobbek.qayumov@gmail.com",
];

function decodeJwt(token){
  try{
    const base = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    return JSON.parse(decodeURIComponent(atob(base).split('').map(c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')));
  }catch(e){return null}
}

function handleCredentialResponse(response){
  const user = decodeJwt(response.credential);
  if(!user) return;
  const profile = {
    name: user.name,
    email: user.email,
    picture: user.picture,
    isAdmin: ADMIN_EMAILS.includes(user.email)
  };
  localStorage.setItem('mb_user', JSON.stringify(profile));
  renderUser();
  showToast(`Xush kelibsiz, ${profile.name}!`);
}

function initGoogleAuth(){
  if(!window.google || !google.accounts) return;
  try{
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false
    });
  }catch(e){console.warn(e)}
}

function promptLogin(){
  if(GOOGLE_CLIENT_ID.startsWith("YOUR_")){
    // Demo rejimi — Client ID o'rnatilmagan
    const profile = {
      name:"Demo Foydalanuvchi", email:"demo@megabozor.uz",
      picture:"https://api.dicebear.com/7.x/initials/svg?seed=Demo",
      isAdmin:true
    };
    localStorage.setItem('mb_user', JSON.stringify(profile));
    renderUser();
    showToast("Demo rejim — Google Client ID o'rnating");
    return;
  }
  if(window.google && google.accounts){
    google.accounts.id.prompt();
  }
}

function logout(){
  localStorage.removeItem('mb_user');
  if(window.google && google.accounts) google.accounts.id.disableAutoSelect();
  renderUser();
  showToast("Tizimdan chiqildi");
}

function getUser(){
  try{return JSON.parse(localStorage.getItem('mb_user'))}catch(e){return null}
}

function renderUser(){
  const user = getUser();
  const chip = document.getElementById('userChip');
  const btn = document.getElementById('loginBtn');
  if(user){
    chip.classList.remove('hidden');
    btn.classList.add('hidden');
    document.getElementById('userName').textContent = user.name.split(' ')[0];
    document.getElementById('userAvatar').src = user.picture;
  }else{
    chip.classList.add('hidden');
    btn.classList.remove('hidden');
  }
}

window.addEventListener('load', ()=>{ initGoogleAuth(); renderUser(); });
