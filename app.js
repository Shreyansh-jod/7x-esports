import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};
const app=initializeApp(firebaseConfig), db=getFirestore(app);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const teamsCol=collection(db,"teams"), matchesCol=collection(db,"matches");
function renderTeams(data){
 data.sort((a,b)=>(b.points||0)-(a.points||0));
 document.querySelector("#teamCount").textContent=data.length;
 document.querySelector("#board").innerHTML=data.length?data.map((t,i)=>`<tr><td>${i+1}</td><td><b>${esc(t.name)}</b></td><td>${(t.players||[]).length}</td><td>${t.points||0}</td><td>${t.kills||0}</td><td class="green">${esc(t.status||"Registered")}</td></tr>`).join(""):`<tr><td colspan="6">No teams yet.</td></tr>`;
 document.querySelector("#teamsGrid").innerHTML=data.map(t=>`<article class="team"><b>${esc(t.name)}</b><small>${(t.players||[]).length} Players • ${esc(t.mode||"Tournament")}</small></article>`).join("");
}
function listen(){
 onSnapshot(query(teamsCol,orderBy("points","desc")),(snap)=>renderTeams(snap.docs.map(d=>({id:d.id,...d.data()}))));
 onSnapshot(matchesCol,(snap)=>{let m=snap.docs.map(d=>({id:d.id,...d.data()}));m.sort((a,b)=>(a.order||0)-(b.order||0));document.querySelector("#matchCount").textContent=m.length;document.querySelector("#matchesGrid").innerHTML=m.map(x=>`<div class="match"><b>${esc(x.name)}</b><span>${esc(x.time)} • ${esc(x.map)}</span><em>${esc(x.mode)}</em></div>`).join("");document.querySelector("#nextMatch").textContent=m[0]?`${m[0].name} • ${m[0].time}`:"No match published";});
}
document.querySelector("#regForm").addEventListener("submit",async e=>{
 e.preventDefault(); const {addDoc}=await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
 const players=[p2.value.trim(),p3.value.trim(),p4.value.trim()];
 await addDoc(teamsCol,{name:team.value.trim(),captain:captain.value.trim(),players:[captain.value.trim(),...players],mode:mode.value,points:0,kills:0,status:"Registered",createdAt:Date.now()});
 e.target.reset(); toast("Team registered live!"); 
});
function toast(x){const t=document.querySelector("#toast");t.textContent=x;t.className="show";setTimeout(()=>t.className="",2500)}
listen();
window.addEventListener("error",()=>toast("Firebase config/connection check karo."));
let end=Date.now()+3600000;setInterval(()=>{let d=Math.max(0,end-Date.now()),h=Math.floor(d/3600000),m=Math.floor(d%3600000/60000),s=Math.floor(d%60000/1000);cdh.textContent=String(h).padStart(2,"0");cdm.textContent=String(m).padStart(2,"0");cds.textContent=String(s).padStart(2,"0")},1000);
