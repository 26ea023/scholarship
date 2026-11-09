const initialDonors = [
 {name:"Arun Kumar",age:24,group:"O+",phone:"Demo contact",location:"Chennai"},
 {name:"Priya S",age:22,group:"A+",phone:"Demo contact",location:"Coimbatore"},
 {name:"Rahul M",age:28,group:"B+",phone:"Demo contact",location:"Chennai"},
 {name:"Nisha R",age:26,group:"AB+",phone:"Demo contact",location:"Madurai"}
];
let donors = JSON.parse(localStorage.getItem("lifelinkDonors") || "null") || initialDonors;
function renderDonors(list=donors){
 const el=document.getElementById("donorList");
 if(!list.length){el.innerHTML='<p>No matching donors in this demo directory.</p>';return;}
 el.innerHTML=list.map(d=>`<article class="donor-card"><span class="blood">${escapeHTML(d.group)}</span><h3>${escapeHTML(d.name)}</h3><p>📍 ${escapeHTML(d.location)} · Age ${escapeHTML(String(d.age))}</p><p>☎ ${escapeHTML(d.phone||"Contact not provided")}</p></article>`).join("");
}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function filterDonors(){
 const g=document.getElementById("filterGroup").value;
 const l=document.getElementById("filterLocation").value.trim().toLowerCase();
 renderDonors(donors.filter(d=>(!g||d.group===g)&&(!l||d.location.toLowerCase().includes(l))));
}
document.getElementById("donorForm").addEventListener("submit",e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
 d.age=Number(d.age);donors.unshift(d);localStorage.setItem("lifelinkDonors",JSON.stringify(donors));
 renderDonors();e.target.reset();document.getElementById("registerMessage").textContent="Donor registration saved in this browser demo.";
});
document.getElementById("requestForm").addEventListener("submit",e=>{
 e.preventDefault();const requests=JSON.parse(localStorage.getItem("lifelinkRequests")||"[]");
 requests.unshift({...Object.fromEntries(new FormData(e.target)),date:new Date().toLocaleString(),status:"Pending"});
 localStorage.setItem("lifelinkRequests",JSON.stringify(requests));e.target.reset();
 document.getElementById("requestMessage").textContent="Blood request saved in this browser demo. Please contact a hospital blood bank for urgent needs.";
});
renderDonors();