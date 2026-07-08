// ===== Squad =====
// Attribute keys used for outfield players
const OUT_ATTRS = ["Str","Sta","Pac","Mar","Tac","Wor","Pos","Pas","Cro","Tec","Hea","Fin","Lon","Set"];
const GK_ATTRS  = ["Str","Sta","Pac","Han","One","Ref","Aer","Jum","Com","Kic","Thr"];

// Helper to build attr object from ordered {key:val, ...}
function A(obj){ return obj; }

const squad = [
  {
    num:17, name:"Irodotos Aggelopoulos", age:32, pos:"Om C, F",
    role:"Attacking Midfielder / Forward", nat:"GRE", rec:15, gk:false,
    attrs:A({ Str:17, Sta:16, Pac:13, Mar:15, Tac:17, Wor:16, Pos:14, Pas:14, Cro:16, Tec:16, Hea:15, Fin:15, Lon:14, Set:15 })
  },
  {
    num:1, name:"Zvonko Todorević", age:26, pos:"Dm L",
    role:"Defensive Midfielder (Left)", nat:"SRB", rec:11, gk:false,
    attrs:A({ Str:17, Sta:17, Pac:18, Mar:17, Tac:17, Wor:15, Pos:16, Pas:14, Cro:12, Tec:13, Hea:11, Fin:8, Lon:10, Set:9 })
  },
  {
    num:2, name:"Jarl Smedt", age:27, pos:"Om L, F",
    role:"Attacking Midfielder / Forward", nat:"NED", rec:16, gk:false,
    attrs:A({ Str:16, Sta:18, Pac:10, Mar:8, Tac:17, Wor:16, Pos:14, Pas:16, Cro:15, Tec:16, Hea:16, Fin:16, Lon:14, Set:13 })
  },
  {
    num:8, name:"Jaquin Williams", age:33, pos:"D C",
    role:"Centre Back", nat:"ENG", rec:18, gk:false,
    attrs:A({ Str:17, Sta:17, Pac:16, Mar:17, Tac:16, Wor:15, Pos:17, Pas:17, Cro:13, Tec:13, Hea:11, Fin:8, Lon:9, Set:10 })
  },
  {
    num:18, name:"Nedo Karleuša", age:26, pos:"Dm R",
    role:"Defensive Midfielder (Right)", nat:"BiH", rec:13, gk:false,
    attrs:A({ Str:17, Sta:18, Pac:18, Mar:12, Tac:17, Wor:17, Pos:14, Pas:16, Cro:12, Tec:14, Hea:12, Fin:10, Lon:14, Set:13 })
  },
  {
    num:19, name:"Nešo Mulamustafić", age:26, pos:"F",
    role:"Striker", nat:"BiH", rec:14, gk:false,
    attrs:A({ Str:16, Sta:16, Pac:16, Mar:11, Tac:11, Wor:12, Pos:14, Pas:16, Cro:10, Tec:15, Hea:18, Fin:14, Lon:17, Set:13 })
  },
  {
    num:22, name:"Vahid Romanić", age:33, pos:"Dm/D R",
    role:"Defensive Midfielder / Right Back · retiring after this season", nat:"BiH", rec:17, gk:false, retiring:true,
    attrs:A({ Str:16, Sta:15, Pac:13, Mar:18, Tac:17, Wor:13, Pos:15, Pas:17, Cro:16, Tec:14, Hea:12, Fin:15, Lon:15, Set:13 })
  },
  {
    num:26, name:"Zhang FuLin", age:26, pos:"D L",
    role:"Left Back", nat:"CHN", rec:11, gk:false,
    attrs:A({ Str:14, Sta:14, Pac:16, Mar:15, Tac:16, Wor:16, Pos:18, Pas:16, Cro:15, Tec:15, Hea:13, Fin:11, Lon:15, Set:12 })
  },
  {
    num:30, name:"Mikica Đurović", age:26, pos:"F",
    role:"Striker", nat:"MNE", rec:11, gk:false,
    attrs:A({ Str:16, Sta:17, Pac:14, Mar:9, Tac:11, Wor:13, Pos:12, Pas:13, Cro:10, Tec:16, Hea:16, Fin:14, Lon:18, Set:12 })
  },
  {
    num:7, name:"Juan Manrique", age:28, pos:"GK",
    role:"Goalkeeper", nat:"COL", rec:17, gk:true,
    attrs:A({ Str:18, Pac:18, Han:16, One:17, Aer:17, Jum:18, Com:18, Kic:17 })
  },
];

// Attribute color coding (FM-style)
function attrColor(v){
  if(v == null) return "muted";
  if(v >= 17) return "vhigh";
  if(v >= 14) return "high";
  if(v >= 10) return "mid";
  return "low";
}
function attrShort(a){
  return { Str:"Strength", Sta:"Stamina", Pac:"Pace", Mar:"Marking", Tac:"Tackling",
    Wor:"Work Rate", Pos:"Positioning", Pas:"Passing", Cro:"Crossing", Tec:"Technique",
    Hea:"Heading", Fin:"Finishing", Lon:"Long Shots", Set:"Set Pieces",
    Han:"Handling", One:"1-on-1s", Ref:"Reflexes", Aer:"Aerial", Jum:"Jumping",
    Com:"Command of Area", Kic:"Kicking", Thr:"Throwing" }[a] || a;
}
function overall(p){
  const vals = Object.values(p.attrs).filter(v => v != null);
  return Math.round(vals.reduce((a,b)=>a+b,0) / vals.length);
}

const grid = document.getElementById("squadGrid");
grid.innerHTML = squad.map(p => `
  <div class="player" data-num="${p.num}" role="button" tabindex="0" data-name="${p.name}">
    <span class="player-pos">${p.pos}</span>
    <div class="player-name">${p.name}${p.retiring?' <span class="retire" title="Retiring after this season">◍</span>':''}</div>
    <div class="player-meta">${p.age} yrs · ${p.nat} · OVR ${overall(p)}</div>
  </div>
`).join("");

// Player modal
grid.querySelectorAll(".player").forEach(el => {
  el.addEventListener("click", () => openPlayer(el.dataset.name));
  el.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();openPlayer(el.dataset.name);}});
});

function openPlayer(name){
  const p = squad.find(x => x.name === name);
  if(!p) return;
  const attrKeys = p.gk ? GK_ATTRS : OUT_ATTRS;
  const ovr = overall(p);
  modalBody.innerHTML = `
    <div class="mm-crumbs">
      <span>⚽ SQUAD</span> <b>›</b>
      <span>ZMFC · #${p.num}</span> <b>›</b>
      <span>${p.pos.toUpperCase()}</span>
    </div>
    <div class="pl-head">
      <div class="pl-num">${p.num}</div>
      <div class="pl-info">
        <h3>${p.name}${p.retiring?' <span class="retire big">◍</span>':''}</h3>
        <div class="pl-role">${p.role}</div>
        <div class="pl-meta">
          <span><em>Age</em>${p.age}</span>
          <span><em>Nationality</em>${p.nat}</span>
          <span><em>Recent form</em>${p.rec ?? "—"}</span>
        </div>
      </div>
      <div class="pl-ovr">
        <div class="pl-ovr-val ${attrColor(ovr)}">${ovr}</div>
        <div class="pl-ovr-lbl">Overall</div>
      </div>
    </div>
    <div class="pl-attrs">
      ${attrKeys.map(k => {
        const v = p.attrs[k];
        const w = v ? Math.round((v/20)*100) : 0;
        return `
          <div class="pl-attr ${attrColor(v)}">
            <div class="pl-attr-key">${attrShort(k)}</div>
            <div class="pl-attr-bar"><i style="width:${w}%"></i></div>
            <div class="pl-attr-val">${v ?? "—"}</div>
          </div>
        `;
      }).join("")}
    </div>
    <div class="pl-legend">
      <span class="lg vhigh">17-20 · Elite</span>
      <span class="lg high">14-16 · Strong</span>
      <span class="lg mid">10-13 · Average</span>
      <span class="lg low">1-9 · Weak</span>
    </div>
  `;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// ===== Team badge helper =====
function shortInit(name){
  return name.replace(/F\.?C\.?/gi,"").replace(/FC/g,"").trim()
    .split(/\s+/).map(s=>s[0]).filter(Boolean).join("").slice(0,3).toUpperCase();
}
function badge(name){
  if(/zalgrilska/i.test(name)) return `<div class="tbadge zmfc"><img src="assets/logo.png" alt="ZMFC"/></div>`;
  return `<div class="tbadge opp">${shortInit(name)||"FC"}</div>`;
}

const ZMFC = "Zalgrilska Milicija FC";

// ===== Fixtures & results =====
const results = [
  {
    id:"r1", d:"05 JUL", day:"SUN", date:"05 Jul 2026",
    comp:"Friendly", compTag:"FL",
    home:"BORO", away:ZMFC, score:"3 – 3", ht:"2 – 1",
    venue:"Stadion BORO", round:"Pre-season", ref:"S. Kovač", att:"1,200",
    events:[
      { min:"11'", side:"home", type:"goal", text:"BORO #9" },
      { min:"23'", side:"away", type:"goal", text:"J. Smedt" },
      { min:"38'", side:"home", type:"goal", text:"BORO #10", sub:"(penalty)" },
      { min:"45+1'", side:"home", type:"info", text:"Half-time", sub:"BORO 2 – 1 ZMFC" },
      { min:"57'", side:"away", type:"goal", text:"N. Mulamustafić" },
      { min:"71'", side:"home", type:"yellow", text:"BORO #6" },
      { min:"79'", side:"home", type:"goal", text:"BORO #11" },
      { min:"88'", side:"away", type:"goal", text:"I. Aggelopoulos", sub:"(late equaliser)" },
      { min:"90+3'", side:"home", type:"info", text:"Full-time", sub:"BORO 3 – 3 ZMFC" },
    ],
    stats:{ poss:[52,48], shots:[13,12], shotsOn:[6,6], corners:[5,6], fouls:[11,10], yellow:[2,1], red:[0,0], offside:[2,3] },
    lineup:{
      home:["BORO GK","BORO 2","BORO 3","BORO 4","BORO 5","BORO 6","BORO 7","BORO 8","BORO 9","BORO 10","BORO 11"],
      away:["Manrique","Williams","Romanić","Zhang","Todorević","Karleuša","Smedt","Aggelopoulos","Mulamustafić","Đurović","Halilović"]
    }
  },
  {
    id:"r2", d:"01 JUL", day:"WED", date:"01 Jul 2026",
    comp:"Friendly", compTag:"FL",
    home:"A.C Porto", away:ZMFC, score:"3 – 2", ht:"1 – 1",
    venue:"Estádio Porto", round:"Pre-season", ref:"J. Silva", att:"3,400",
    events:[
      { min:"18'", side:"home", type:"goal", text:"Porto #9" },
      { min:"29'", side:"away", type:"goal", text:"N. Mulamustafić" },
      { min:"45+2'", side:"home", type:"info", text:"Half-time", sub:"Porto 1 – 1 ZMFC" },
      { min:"55'", side:"home", type:"goal", text:"Porto #10" },
      { min:"66'", side:"away", type:"goal", text:"J. Smedt", sub:"(assist Aggelopoulos)" },
      { min:"74'", side:"away", type:"yellow", text:"N. Karleuša" },
      { min:"83'", side:"home", type:"goal", text:"Porto #7", sub:"(winner)" },
      { min:"90+4'", side:"home", type:"info", text:"Full-time", sub:"Porto 3 – 2 ZMFC" },
    ],
    stats:{ poss:[58,42], shots:[16,10], shotsOn:[8,4], corners:[8,3], fouls:[9,13], yellow:[1,2], red:[0,0], offside:[1,4] },
    lineup:{
      home:["Porto GK","Porto 2","Porto 3","Porto 4","Porto 5","Porto 6","Porto 7","Porto 8","Porto 9","Porto 10","Porto 11"],
      away:["Manrique","Williams","Romanić","Zhang","Todorević","Karleuša","Smedt","Aggelopoulos","Mulamustafić","Đurović","Halilović"]
    }
  },
  {
    id:"r3", d:"03 JUL", day:"FRI", date:"03 Jul 2026",
    comp:"League", compTag:"LG",
    home:"Neki Novi Klinci", away:ZMFC, score:"1 – 2", ht:"0 – 1",
    venue:"Stadion NNK", round:"Round 1", ref:"E. Softić", att:"1,850",
    events:[
      { min:"22'", side:"away", type:"goal", text:"I. Aggelopoulos" },
      { min:"38'", side:"home", type:"yellow", text:"NNK #6" },
      { min:"45+1'", side:"home", type:"info", text:"Half-time", sub:"0 – 1" },
      { min:"61'", side:"away", type:"goal", text:"N. Mulamustafić", sub:"(assist Smedt)" },
      { min:"77'", side:"home", type:"goal", text:"NNK #11" },
      { min:"90+3'", side:"home", type:"info", text:"Full-time", sub:"NNK 1 – 2 ZMFC" },
    ],
    stats:{ poss:[47,53], shots:[9,13], shotsOn:[3,7], corners:[3,6], fouls:[14,10], yellow:[3,1], red:[0,0], offside:[2,1] },
    lineup:{
      home:["NNK GK","NNK 2","NNK 3","NNK 4","NNK 5","NNK 6","NNK 7","NNK 8","NNK 9","NNK 10","NNK 11"],
      away:["Manrique","Williams","Romanić","Zhang","Todorević","Karleuša","Smedt","Aggelopoulos","Mulamustafić","Đurović","Halilović"]
    }
  },
  {
    id:"r4", d:"05 JUL", day:"SUN", date:"05 Jul 2026",
    comp:"League", compTag:"LG",
    home:ZMFC, away:"Lasko", score:"3 – 0", ht:"2 – 0",
    venue:"Maze bank arena", round:"Round 2", ref:"A. Dizdar", att:"4,120",
    events:[
      { min:"14'", side:"home", type:"goal", text:"I. Aggelopoulos" },
      { min:"31'", side:"home", type:"goal", text:"J. Smedt", sub:"(assist Karleuša)" },
      { min:"45+2'", side:"home", type:"info", text:"Half-time", sub:"ZMFC 2 – 0 Lasko" },
      { min:"58'", side:"away", type:"yellow", text:"Lasko #4" },
      { min:"72'", side:"home", type:"goal", text:"M. Đurović", sub:"(sub)" },
      { min:"81'", side:"home", type:"sub", text:"Smedt off", sub:"Mulamustafić on" },
      { min:"90+3'", side:"home", type:"info", text:"Full-time", sub:"Clean sheet · ZMFC" },
    ],
    stats:{ poss:[63,37], shots:[17,5], shotsOn:[9,1], corners:[9,2], fouls:[8,15], yellow:[1,3], red:[0,0], offside:[2,4] },
    lineup:{
      home:["Manrique","Williams","Romanić","Zhang","Todorević","Karleuša","Smedt","Aggelopoulos","Mulamustafić","Đurović","Halilović"],
      away:["Lasko GK","Lasko 2","Lasko 3","Lasko 4","Lasko 5","Lasko 6","Lasko 7","Lasko 8","Lasko 9","Lasko 10","Lasko 11"]
    }
  },
  {
    id:"r5", d:"06 JUL", day:"MON", date:"06 Jul 2026",
    comp:"League", compTag:"LG",
    home:"NK Brzava Janja", away:ZMFC, score:"2 – 1", ht:"1 – 0",
    venue:"Gradski Stadion Janja", round:"Round 3", ref:"H. Kurtović", att:"2,910",
    events:[
      { min:"27'", side:"home", type:"goal", text:"Brzava #9" },
      { min:"45+1'", side:"home", type:"info", text:"Half-time", sub:"1 – 0" },
      { min:"56'", side:"away", type:"goal", text:"J. Smedt", sub:"(equaliser)" },
      { min:"68'", side:"home", type:"goal", text:"Brzava #11", sub:"(winner)" },
      { min:"83'", side:"away", type:"yellow", text:"J. Williams" },
      { min:"90+4'", side:"home", type:"info", text:"Full-time", sub:"Brzava 2 – 1 ZMFC" },
    ],
    stats:{ poss:[45,55], shots:[10,14], shotsOn:[5,6], corners:[4,7], fouls:[12,11], yellow:[2,2], red:[0,0], offside:[1,3] },
    lineup:{
      home:["Brzava GK","Brzava 2","Brzava 3","Brzava 4","Brzava 5","Brzava 6","Brzava 7","Brzava 8","Brzava 9","Brzava 10","Brzava 11"],
      away:["Manrique","Williams","Romanić","Zhang","Todorević","Karleuša","Smedt","Aggelopoulos","Mulamustafić","Đurović","Halilović"]
    }
  },
  {
    id:"r6", d:"08 JUL", day:"TUE", date:"08 Jul 2026",
    comp:"Frendly", compTag:"FL",
    home:ZMFC, away:"Oztar", score:"0 – 0", ht:"0 – 0",
    venue:"Maze bank arena", round:"Round 3", ref:"A. Dizdar", att:"4,120",
    events:[
   
      { min:"3'", side:"home", type:"yellow", text:"Williams" },
      { min:"30'", side:"away", type:"yellow", text:"Garay" },
      { min:"60'", side:"away", type:"yellow", text:"Kahraman" }  ],
    stats:{ poss:[45,55], shots:[10,14], shotsOn:[5,6], corners:[4,7], fouls:[12,11], yellow:[2,2], red:[0,0], offside:[1,3] },
    lineup:{
      home:["Brzava GK","Brzava 2","Brzava 3","Brzava 4","Brzava 5","Brzava 6","Brzava 7","Brzava 8","Brzava 9","Brzava 10","Brzava 11"],
      away:["Manrique","Williams","Romanić","Zhang","Todorević","Karleuša","Smedt","Aggelopoulos","Mulamustafić","Đurović","Halilović"]
    }
      }, ];
    

function up(id, d, day, month, comp, compTag, home, away, time, venue, round){
  return { id, d, day, date:`${d} ${month} 2026`, comp, compTag, home, away, time, venue, round,
    ref:"TBA", tv:"BHT Sport", odds: home===ZMFC ? {h:"1.85",d:"3.30",a:"3.90"} : {h:"3.60",d:"3.20",a:"2.00"} };
}
const upcoming = [
  up("u02","14","TUE","Jul","League","LG",ZMFC,"Sarajevo Atletic","18:30","Maze bank arena","Round 4"),
  up("u03","17","FRI","Jul","League","LG","Gotham Bats",ZMFC,"20:00","Wayne Stadium","Round 5"),
  up("u04","20","MON","Jul","League","LG",ZMFC,"FK Rudar Zenica","18:00","Maze bank arena","Round 6"),
  up("u05","22","WED","Jul","Friendly","FL","Galaticosi",ZMFC,"19:30","Estadio Galactico","Friendly"),
  up("u06","24","FRI","Jul","League","LG",ZMFC,"Southmoke","18:00","Maze bank arena","Round 7"),
  up("u07","26","SUN","Jul","League","LG","F.C Zenica City",ZMFC,"18:30","Bilino Polje","Round 8"),
  up("u08","28","TUE","Jul","League","LG",ZMFC,"B FC Tuzla City","18:00","Maze bank arena","Round 9"),
  up("u09","29","WED","Jul","Friendly","FL","Wesoły Burdel FC",ZMFC,"19:00","Stadion Wesoły","Friendly"),
  up("u10","30","THU","Jul","League","LG","NK Srednja Žalost",ZMFC,"18:30","Stadion Žalost","Round 10"),
  up("u11","31","FRI","Jul","League","LG",ZMFC,"BFK Simm Bau","18:00","Maze bank arena","Round 11"),
  up("u12","01","SAT","Aug","League","LG","FK Brod 94",ZMFC,"19:00","Stadion Brod","Round 12"),
  up("u13","02","SUN","Aug","Friendly","FL",ZMFC,"BOSNA","18:00","Maze bank arena","Friendly"),
  up("u14","03","MON","Aug","League","LG",ZMFC,"FK ŽELJEZNIČAR","19:00","Maze bank arena","Round 13"),
  up("u15","04","TUE","Aug","League","LG","Queen of Mokušnice F.C",ZMFC,"18:30","Stadion Mokušnice","Round 14"),
  up("u16","06","THU","Aug","League","LG",ZMFC,"F.K. Gule","18:00","Maze bank arena","Round 15"),
  up("u17","08","SAT","Aug","League","LG","NK Real Zenica",ZMFC,"19:00","Stadion Real","Round 16"),
  up("u18","10","MON","Aug","League","LG",ZMFC,"FK Zmajevo Gnijezdo","18:00","Maze bank arena","Round 17"),
  up("u19","12","WED","Aug","League","LG",ZMFC,"Neki Novi Klinci","18:00","Maze bank arena","Round 18"),
  up("u20","14","FRI","Aug","Friendly","FL","ÖZTAR",ZMFC,"19:00","Stadion ÖZTAR","Friendly"),
  up("u21","16","SUN","Aug","League","LG","Lasko",ZMFC,"18:30","Stadion Lasko","Round 19"),
  up("u22","18","TUE","Aug","League","LG",ZMFC,"NK Brzava Janja","18:00","Maze bank arena","Round 20"),
  up("u23","20","THU","Aug","League","LG","Sarajevo Atletic",ZMFC,"19:00","Koševo","Round 21"),
  up("u24","21","FRI","Aug","Friendly","FL",ZMFC,"Galaticosi","19:00","Maze bank arena","Friendly"),
  up("u25","23","SUN","Aug","League","LG",ZMFC,"Gotham Bats","18:00","Maze bank arena","Round 22"),
  up("u26","25","TUE","Aug","League","LG","FK Rudar Zenica",ZMFC,"18:30","Kamberovića Polje","Round 23"),
  up("u27","27","THU","Aug","League","LG","Southmoke",ZMFC,"19:00","Stadion Southmoke","Round 24"),
  up("u28","29","SAT","Aug","League","LG",ZMFC,"F.C Zenica City","18:00","Maze bank arena","Round 25"),
  up("u29","30","SUN","Aug","League","LG","B FC Tuzla City",ZMFC,"19:00","Tušanj","Round 26"),
  up("u30","31","MON","Aug","League","LG",ZMFC,"NK Srednja Žalost","18:00","Maze bank arena","Round 27"),
  up("u31","02","WED","Sep","League","LG","BFK Simm Bau",ZMFC,"18:30","Stadion Simm Bau","Round 28"),
  up("u32","04","FRI","Sep","League","LG",ZMFC,"FK Brod 94","18:00","Maze bank arena","Round 29"),
  up("u33","06","SUN","Sep","League","LG","FK ŽELJEZNIČAR",ZMFC,"18:30","Grbavica","Round 30"),
  up("u34","09","WED","Sep","League","LG",ZMFC,"Queen of Mokušnice F.C","18:00","Maze bank arena","Round 31"),
  up("u35","12","SAT","Sep","League","LG","F.K. Gule",ZMFC,"18:30","Stadion Gule","Round 32"),
  up("u36","15","TUE","Sep","League","LG",ZMFC,"NK Real Zenica","18:00","Maze bank arena","Round 33"),
  up("u37","19","SAT","Sep","League","LG","FK Zmajevo Gnijezdo",ZMFC,"18:30","Stadion Gnijezdo","Round 34"),
];

// ===== Fixtures render =====
const fixList = document.getElementById("fixList");
let currentFilter = "all";
let currentTab = "upcoming";

function renderFixtures(){
  const items = currentTab === "upcoming" ? upcoming : results;
  const filtered = currentFilter === "all" ? items : items.filter(f => f.comp.toLowerCase() === currentFilter);
  if(!filtered.length){ fixList.innerHTML = `<div class="fix-empty">No matches to show.</div>`; return; }
  fixList.innerHTML = filtered.map(f => `
    <div class="fix" data-id="${f.id}" data-tab="${currentTab}" role="button" tabindex="0">
      <div class="fix-date">${f.d}<em>${f.day}</em></div>
      <div class="fix-comp ${f.compTag==='FL'?'fl':'lg'}">${f.compTag}</div>
      <div class="fix-home ${f.home===ZMFC?'us':''}">${teamCell(f.home)}</div>
      <div class="fix-score ${currentTab==='upcoming'?'upcoming':''}">${currentTab==='upcoming' ? f.time : f.score}</div>
      <div class="fix-away ${f.away===ZMFC?'us':''}">${teamCell(f.away,true)}</div>
      <div class="fix-venue">${f.venue.replace("Stadion ","")}</div>
    </div>
  `).join("");
  fixList.querySelectorAll(".fix").forEach(row => {
    row.addEventListener("click", () => openMatch(row.dataset.id, row.dataset.tab));
    row.addEventListener("keydown", (e) => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openMatch(row.dataset.id, row.dataset.tab); } });
  });
}
function teamCell(name, right){
  const display = name === ZMFC ? "Žalgrilska Milicija" : name;
  const b = name === ZMFC
    ? `<img class="mini-badge" src="assets/logo.png" alt=""/>`
    : `<span class="mini-badge init">${shortInit(name)||"FC"}</span>`;
  return right ? `<span class="tname">${display}</span>${b}` : `${b}<span class="tname">${display}</span>`;
}
renderFixtures();
document.querySelectorAll(".fix-tab").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".fix-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active"); currentTab = btn.dataset.tab; renderFixtures();
}));
document.querySelectorAll(".fix-filter").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".fix-filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active"); currentFilter = btn.dataset.filter; renderFixtures();
}));

// ===== Match modal =====
const modal = document.getElementById("matchModal");
const modalBody = document.getElementById("modalBody");
function openMatch(id, tab){
  const m = (tab === "upcoming" ? upcoming : results).find(x => x.id === id);
  if(!m) return;
  const finished = tab === "results";
  modalBody.innerHTML = finished ? renderFinishedMatch(m) : renderUpcomingMatch(m);
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  wireModalTabs();
}
function closeModal(){ modal.classList.remove("open"); document.body.style.overflow = ""; }
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });
function wireModalTabs(){
  const tabs = modalBody.querySelectorAll(".mm-tab");
  const panes = modalBody.querySelectorAll(".mm-pane");
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    panes.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    modalBody.querySelector(`.mm-pane[data-pane="${t.dataset.tab}"]`).classList.add("active");
  }));
}

function renderUpcomingMatch(m){
  return `
    <div class="mm-crumbs"><span>⚽ FOOTBALL</span> <b>›</b> <span>🇧🇦 BIH</span> <b>›</b> <span>${m.comp.toUpperCase()} · ${m.round.toUpperCase()}</span></div>
    <div class="mm-head">
      <div class="mm-side">${badge(m.home)}<div class="mm-tname">${m.home}</div></div>
      <div class="mm-center">
        <div class="mm-date">${m.date} · ${m.time}</div>
        <div class="mm-score upcoming">–</div>
        <div class="mm-status pill">Scheduled</div>
      </div>
      <div class="mm-side right">${badge(m.away)}<div class="mm-tname">${m.away}</div></div>
    </div>
    <div class="mm-tabs">
      <button class="mm-tab active" data-tab="summary">Summary</button>
      <button class="mm-tab" data-tab="odds">Odds</button>
      <button class="mm-tab" data-tab="h2h">H2H</button>
      <button class="mm-tab" data-tab="info">Info</button>
    </div>
    <div class="mm-pane active" data-pane="summary">
      <div class="mm-empty"><div class="mm-empty-icon">⏱</div><b>Match not started yet</b>
        <p>Kick-off ${m.date} · ${m.time} at ${m.venue}. Timeline and stats will appear here live.</p></div>
      <div class="mm-info-grid">
        <div><span>Competition</span><b>${m.comp}</b></div>
        <div><span>Round</span><b>${m.round}</b></div>
        <div><span>Venue</span><b>${m.venue}</b></div>
        <div><span>TV</span><b>${m.tv}</b></div>
      </div>
    </div>
    <div class="mm-pane" data-pane="odds">
      <div class="mm-odds">
        <div class="mm-odds-head"><span>1X2</span><em>Match winner</em></div>
        <div class="mm-odds-row">
          <div class="odds-src">TROZART torten</div>
          <div class="odds-cell"><em>1</em><b>↑ ${m.odds.h}</b></div>
          <div class="odds-cell"><em>X</em><b>↑ ${m.odds.d}</b></div>
          <div class="odds-cell"><em>2</em><b>↓ ${m.odds.a}</b></div>
        </div>
        <div class="mm-odds-row">
          <div class="odds-src">SPORTskiKLUB</div>
          <div class="odds-cell"><em>1</em><b>↑ ${(parseFloat(m.odds.h)+0.05).toFixed(2)}</b></div>
          <div class="odds-cell"><em>X</em><b>↑ ${(parseFloat(m.odds.d)-0.05).toFixed(2)}</b></div>
          <div class="odds-cell"><em>2</em><b>↓ ${(parseFloat(m.odds.a)+0.10).toFixed(2)}</b></div>
        </div>
        <div class="mm-note">Odds indicative · Bet responsibly. 18+.</div>
      </div>
    </div>
    <div class="mm-pane" data-pane="h2h">
      <div class="mm-empty" style="padding:22px"><b>No prior head-to-head on record</b>
        <p>This is the first competitive meeting between ${m.home} and ${m.away} in our database.</p></div>
    </div>
    <div class="mm-pane" data-pane="info">
      <div class="mm-info-grid">
        <div><span>Kick-off</span><b>${m.date} · ${m.time}</b></div>
        <div><span>Venue</span><b>${m.venue}</b></div>
        <div><span>Competition</span><b>${m.comp}</b></div>
        <div><span>Round</span><b>${m.round}</b></div>
        <div><span>Referee</span><b>${m.ref}</b></div>
        <div><span>TV broadcast</span><b>${m.tv}</b></div>
      </div>
    </div>
  `;
}
function renderFinishedMatch(m){
  const [hs, as] = m.score.split("–").map(s => s.trim());
  return `
    <div class="mm-crumbs"><span>⚽ FOOTBALL</span> <b>›</b> <span>🇧🇦 BIH</span> <b>›</b> <span>${m.comp.toUpperCase()} · ${m.round.toUpperCase()}</span></div>
    <div class="mm-head">
      <div class="mm-side">${badge(m.home)}<div class="mm-tname">${m.home}</div></div>
      <div class="mm-center">
        <div class="mm-score"><b>${hs}</b><i>–</i><b>${as}</b></div>
        <div class="mm-status pill finished">Finished</div>
        <div class="mm-ht">Half-time ${m.ht}</div>
      </div>
      <div class="mm-side right">${badge(m.away)}<div class="mm-tname">${m.away}</div></div>
    </div>
    <div class="mm-tabs">
      <button class="mm-tab active" data-tab="summary">Summary</button>
      <button class="mm-tab" data-tab="stats">Stats</button>
      <button class="mm-tab" data-tab="lineups">Lineups</button>
      <button class="mm-tab" data-tab="info">Info</button>
    </div>
    <div class="mm-pane active" data-pane="summary">${renderTimeline(m)}</div>
    <div class="mm-pane" data-pane="stats">${renderStats(m)}</div>
    <div class="mm-pane" data-pane="lineups">${renderLineups(m)}</div>
    <div class="mm-pane" data-pane="info">
      <div class="mm-info-grid">
        <div><span>Date</span><b>${m.date}</b></div>
        <div><span>Venue</span><b>${m.venue}</b></div>
        <div><span>Competition</span><b>${m.comp}</b></div>
        <div><span>Round</span><b>${m.round}</b></div>
        <div><span>Referee</span><b>${m.ref}</b></div>
        <div><span>Attendance</span><b>${m.att}</b></div>
      </div>
    </div>
  `;
}
function evIcon(t){
  if(t==="goal") return `<span class="ev-icon goal">⚽</span>`;
  if(t==="yellow") return `<span class="ev-icon yellow"></span>`;
  if(t==="red") return `<span class="ev-icon red"></span>`;
  if(t==="sub") return `<span class="ev-icon sub">⇄</span>`;
  return `<span class="ev-icon info">•</span>`;
}
function renderTimeline(m){
  const first = m.events.filter(e => { const n = parseInt(e.min); return !isNaN(n) && n <= 45 && !/^45\+/.test(e.min); });
  const firstExtra = m.events.filter(e => /^45\+/.test(e.min));
  const second = m.events.filter(e => { const n = parseInt(e.min); return !isNaN(n) && n > 45 && n <= 90 && !/^45\+/.test(e.min); });
  const secondExtra = m.events.filter(e => /^90\+/.test(e.min));
  const [hs, as] = m.score.split("–").map(s => parseInt(s.trim()));
  const htHome = parseInt(m.ht.split("–")[0].trim());
  const htAway = parseInt(m.ht.split("–")[1].trim());
  return `
    <div class="tl-half">
      <div class="tl-half-head"><span>1ST HALF</span><em>${htHome} – ${htAway}</em></div>
      ${[...first,...firstExtra].map(tlRow).join("")}
    </div>
    <div class="tl-half">
      <div class="tl-half-head"><span>2ND HALF</span><em>${hs - htHome} – ${as - htAway}</em></div>
      ${[...second,...secondExtra].map(tlRow).join("")}
    </div>
  `;
}
function tlRow(e){
  const side = e.side || "info";
  return `<div class="tl-row ${side}"><div class="tl-min">${e.min}</div><div class="tl-body">${evIcon(e.type)}<div class="tl-text"><b>${e.text}</b>${e.sub?`<em>${e.sub}</em>`:""}</div></div></div>`;
}
function renderStats(m){
  const rows = [
    ["Possession %", m.stats.poss, true], ["Shots", m.stats.shots], ["Shots on target", m.stats.shotsOn],
    ["Corners", m.stats.corners], ["Fouls", m.stats.fouls], ["Yellow cards", m.stats.yellow],
    ["Red cards", m.stats.red], ["Offsides", m.stats.offside],
  ];
  return `<div class="mm-stats">${rows.map(([label, vals, pct]) => {
    const [h, a] = vals;
    const total = pct ? 100 : (h + a) || 1;
    const hPct = pct ? h : Math.round(h/total*100);
    const aPct = pct ? a : Math.round(a/total*100);
    return `<div class="stat-row"><b class="sv">${h}${pct?'%':''}</b>
      <div class="stat-mid"><div class="stat-label">${label}</div>
        <div class="stat-bars"><div class="sb sb-h"><i style="width:${hPct}%"></i></div>
          <div class="sb sb-a"><i style="width:${aPct}%"></i></div></div></div>
      <b class="sv right">${a}${pct?'%':''}</b></div>`;
  }).join("")}</div>`;
}
function renderLineups(m){
  return `<div class="mm-lineups">
    <div class="lu"><h4>${m.home}</h4><ol>${m.lineup.home.map((n,i)=>`<li><span>${i+1}</span>${n}</li>`).join("")}</ol></div>
    <div class="lu"><h4>${m.away}</h4><ol>${m.lineup.away.map((n,i)=>`<li><span>${i+1}</span>${n}</li>`).join("")}</ol></div>
  </div>`;
}

// ===== Standings (INTERACTIVE) =====
// Approx home/away splits derived from overall record. We simulate deterministic splits.
function splitRecord(s){
  // Split each metric roughly in half
  const hW = Math.ceil(s.w/2), aW = s.w - hW;
  const hD = Math.ceil(s.d/2), aD = s.d - hD;
  const hL = Math.ceil(s.l/2), aL = s.l - hL;
  const hGF = Math.round(s.gf * 0.55), aGF = s.gf - hGF;
  const hGA = Math.round(s.ga * 0.45), aGA = s.ga - hGA;
  const hP = hW+hD+hL, aP = aW+aD+aL;
  return {
    home: { p:hP, w:hW, d:hD, l:hL, gf:hGF, ga:hGA, pts:hW*3+hD },
    away: { p:aP, w:aW, d:aD, l:aL, gf:aGF, ga:aGA, pts:aW*3+aD }
  };
}
const standings = [
  { club:"NK Brzava Janja",        p:3, w:3, d:0, l:0, gf:24, ga:1,  form:["W","W","W"], recent:[
    {opp:"NK Real Zenica", res:"W", score:"8-0", date:"05.07"},
    {opp:"NK Srednja Žalost", res:"W", score:"9-1", date:"04.07"},
    {opp:"BFK Simm Bau", res:"W", score:"7-0", date:"03.07"},
  ]},
  { club:"FK ŽELJEZNIČAR",         p:3, w:3, d:0, l:0, gf:14, ga:0,  form:["W","W","W"], recent:[] },
  { club:"Queen of Mokušnice F.C", p:3, w:3, d:0, l:0, gf:11, ga:2,  form:["W","W","W"], recent:[] },
  { club:"F.C Zenica City",        p:3, w:3, d:0, l:0, gf:5,  ga:2,  form:["W","W","W"], recent:[] },
  { club:"F.K. Gule",              p:3, w:2, d:1, l:0, gf:20, ga:1,  form:["W","W","D"], recent:[] },
  { club:"Southmoke",              p:3, w:2, d:1, l:0, gf:4,  ga:1,  form:["W","D","W"], recent:[] },
  { club:"Gotham Bats",            p:3, w:2, d:0, l:1, gf:11, ga:2,  form:["W","L","W"], recent:[] },
  { club:"Zalgrilska Milicija FC", p:3, w:2, d:0, l:1, gf:6,  ga:3,  form:["W","W","L"], us:true, recent:[
    {opp:"Neki Novi Klinci", res:"W", score:"2-1", date:"03.07"},
    {opp:"Lasko", res:"W", score:"3-0", date:"05.07"},
    {opp:"NK Brzava Janja", res:"L", score:"1-2", date:"06.07"},
  ]},
  { club:"FK Rudar Zenica",        p:3, w:1, d:1, l:1, gf:11, ga:6,  form:["W","D","L"], recent:[] },
  { club:"B FC Tuzla City B",      p:3, w:1, d:1, l:1, gf:3,  ga:3,  form:["W","L","D"], recent:[] },
  { club:"NK Real Zenica",         p:3, w:1, d:0, l:2, gf:8,  ga:4,  form:["W","L","L"], recent:[] },
  { club:"FK Zmajevo Gnijezdo",    p:3, w:1, d:0, l:2, gf:2,  ga:3,  form:["L","W","L"], recent:[] },
  { club:"Lasko",                  p:3, w:0, d:1, l:2, gf:1,  ga:6,  form:["L","D","L"], recent:[] },
  { club:"FK Brod 94",             p:3, w:0, d:1, l:2, gf:0,  ga:9,  form:["L","L","D"], recent:[] },
  { club:"Neki Novi Klinci",       p:3, w:0, d:0, l:3, gf:1,  ga:5,  form:["L","L","L"], recent:[] },
  { club:"BFK Simm Bau",           p:3, w:0, d:0, l:3, gf:2,  ga:14, form:["L","L","L"], recent:[] },
  { club:"NK Srednja Žalost",      p:3, w:0, d:0, l:3, gf:0,  ga:22, form:["L","L","L"], recent:[] },
  { club:"Sarajevo Atletic",       p:3, w:0, d:0, l:3, gf:1,  ga:40, form:["L","L","L"], recent:[] },
];
// Precompute totals & splits
standings.forEach(s => {
  s.pts = s.w*3 + s.d;
  s.gd  = s.gf - s.ga;
  const sp = splitRecord(s);
  s.homeRow = sp.home; s.awayRow = sp.away;
});

let stMode = "overall";     // overall | home | away
let stSort = { key:"pts", dir:"desc" };

function initStandings(){
  document.querySelectorAll(".st-mode").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".st-mode").forEach(b => b.classList.remove("active"));
    btn.classList.add("active"); stMode = btn.dataset.mode; renderStandings();
  }));
  document.querySelectorAll("#standings thead th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if(stSort.key === key) stSort.dir = stSort.dir === "asc" ? "desc" : "asc";
      else { stSort.key = key; stSort.dir = (key === "club") ? "asc" : "desc"; }
      renderStandings();
    });
  });
  renderStandings();
}
function getRow(s){
  if(stMode === "home") return { ...s.homeRow, club:s.club, us:s.us, form:s.form, recent:s.recent };
  if(stMode === "away") return { ...s.awayRow, club:s.club, us:s.us, form:s.form, recent:s.recent };
  return s;
}
function renderStandings(){
  const rows = standings.map(getRow);
  rows.sort((a,b) => {
    const k = stSort.key;
    let va = a[k], vb = b[k];
    if(k === "gd") { va = a.gf - a.ga; vb = b.gf - b.ga; }
    if(typeof va === "string") return stSort.dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    if(k !== "pts" && (a.pts !== b.pts)) return b.pts - a.pts; // stable pts ordering as secondary
    return stSort.dir === "asc" ? va - vb : vb - va;
  });
  // For pts primary sort we also break tie by GD
  if(stSort.key === "pts"){
    rows.sort((a,b) => stSort.dir === "asc"
      ? (a.pts - b.pts) || ((a.gf-a.ga) - (b.gf-b.ga))
      : (b.pts - a.pts) || ((b.gf-b.ga) - (a.gf-a.ga)));
  }

  const tbody = document.querySelector("#standings tbody");
  tbody.innerHTML = rows.map((s,i) => `
    <tr class="${s.us?'us':''}" data-club="${s.club}">
      <td class="rank">
        <span class="rank-num">${i+1}</span>
        ${zoneBadge(i)}
      </td>
      <td class="club-cell">
        <span class="mini-badge ${s.club===ZMFC?'':'init'}">${s.club===ZMFC?'<img src="assets/logo.png" alt=""/>':shortInit(s.club)||'FC'}</span>
        <b>${s.club===ZMFC?'Žalgrilska Milicija FC':s.club}</b>
        ${s.us?' <span class="us-tag">YOU</span>':''}
      </td>
      <td>${s.p}</td><td>${s.w}</td><td>${s.d}</td><td>${s.l}</td>
      <td>${s.gf}:${s.ga}</td>
      <td class="gd-cell">${(s.gf-s.ga>0?'+':'')}${s.gf-s.ga}</td>
      <td class="form-cell">${(s.form||[]).map(r=>`<i class="form ${r.toLowerCase()}" title="${r==='W'?'Win':r==='D'?'Draw':'Loss'}">${r}</i>`).join("")}</td>
      <td class="pts-cell">${s.pts}</td>
    </tr>
  `).join("");

  // Highlight active sort column
  document.querySelectorAll("#standings thead th").forEach(th => {
    th.classList.remove("sort-asc","sort-desc");
    if(th.dataset.sort === stSort.key) th.classList.add(stSort.dir==="asc"?"sort-asc":"sort-desc");
  });

  // Row click = show recent form popover
  tbody.querySelectorAll("tr").forEach(tr => {
    tr.addEventListener("click", () => showRecentForm(tr.dataset.club, tr));
  });
}
function zoneBadge(i){
  if(i === 0) return `<span class="zone champ" title="Promotion / Champion"></span>`;
  if(i <= 2) return `<span class="zone promo" title="Promotion / Play-off"></span>`;
  if(i >= 15) return `<span class="zone releg" title="Relegation"></span>`;
  return "";
}
function showRecentForm(clubName, tr){
  document.querySelectorAll(".pop-recent").forEach(el => el.remove());
  const s = standings.find(x => x.club === clubName);
  if(!s || !s.recent || !s.recent.length) return;
  const pop = document.createElement("div");
  pop.className = "pop-recent";
  pop.innerHTML = `<h5>Recent form · ${s.club===ZMFC?'ZMFC':s.club}</h5>
    ${s.recent.map(r => `
      <div class="rec-row ${r.res.toLowerCase()}">
        <i class="form ${r.res.toLowerCase()}">${r.res}</i>
        <span>${r.score}</span>
        <b>${r.opp}</b>
        <em>${r.date}</em>
      </div>
    `).join("")}
    <button class="pop-close">Close</button>`;
  tr.appendChild(pop);
  pop.querySelector(".pop-close").addEventListener("click", (e) => { e.stopPropagation(); pop.remove(); });
  setTimeout(() => {
    document.addEventListener("click", function once(ev){
      if(!pop.contains(ev.target)){ pop.remove(); document.removeEventListener("click", once); }
    });
  }, 0);
}
initStandings();

// ===== Reveal animation =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.style.opacity = 1;
      e.target.style.transform = "translateY(0)";
      io.unobserve(e.target);
    }
  });
}, { threshold:.1 });
document.querySelectorAll(".section, .nm-wrap, .player").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity .8s ease, transform .8s ease";
  io.observe(el);
});
