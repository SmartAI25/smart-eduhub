const fs = require("fs");
const pubId = "ca-pub-1891031290159418";

const allQs = [
  {tag:"history",en:{q:"Who presided over 1929 Lahore Session (Purna Swaraj)?",o:["Mahatma Gandhi","Jawaharlal Nehru","Subhash Bose","Sardar Patel"]},hi:{q:"1929 लाहौर अधिवेशन (पूर्ण स्वराज) के अध्यक्ष कौन थे?",o:["महात्मा गांधी","जवाहरलाल नेहरू","सुभाष बोस","सरदार पटेल"]},ans:1},
  {tag:"history",en:{q:"Who introduced 'Doctrine of Lapse' in India?",o:["Lord Dalhousie","Lord Canning","Lord Wellesley","Lord Curzon"]},hi:{q:"भारत में 'व्यपगत का सिद्धांत' (Doctrine of Lapse) किसने लागू किया?",o:["लॉर्ड डलहौजी","लॉर्ड कैनिंग","लॉर्ड वेलेजली","लॉर्ड कर्जन"]},ans:0},
  {tag:"polity",en:{q:"Which Amendment added 'Fundamental Duties' to Constitution?",o:["42nd (1976)","44th (1978)","73rd (1992)","86th (2002)"]},hi:{q:"संविधान में 'मौलिक कर्तव्य' किस संशोधन द्वारा जोड़े गए?",o:["42वां (1976)","44वां (1978)","73वां (1992)","86वां (2002)"]},ans:0},
  {tag:"polity",en:{q:"Under which Article can Supreme Court issue writs for Fundamental Rights?",o:["Article 21","Article 32","Article 226","Article 356"]},hi:{q:"सुप्रीम कोर्ट किस अनुच्छेद के तहत मौलिक अधिकारों की रिट जारी करता है?",o:["अनुच्छेद 21","अनुच्छेद 32","अनुच्छेद 226","अनुच्छेद 356"]},ans:1},
  {tag:"economy",en:{q:"Primary objective of RBI Open Market Operations (OMO)?",o:["Export Control","Banking Liquidity Management","Stock Market","Gold Reserve"]},hi:{q:"RBI के खुला बाजार परिचालन (OMO) का मुख्य उद्देश्य?",o:["निर्यात नियंत्रण","बैंकिंग तरलता संतुलन","शेयर बाजार","स्वर्ण भंडार"]},ans:1},
  {tag:"maths",en:{q:"Item sold at ₹1440 at 10% loss. Selling price for 15% profit?",o:["₹ 1,720","₹ 1,840","₹ 1,680","₹ 1,900"]},hi:{q:"वस्तु ₹1440 में 10% हानि पर बिकी। 15% लाभ हेतु विक्रय मूल्य?",o:["₹ 1,720","₹ 1,840","₹ 1,680","₹ 1,900"]},ans:1},
  {tag:"maths",en:{q:"Sum doubles in 5 yrs at SI. In how many years will it become 4 times?",o:["10 Years","12 Years","15 Years","20 Years"]},hi:{q:"साधारण ब्याज से कोई धन 5 वर्ष में दोगुना। 4 गुना कब होगा?",o:["10 वर्ष","12 वर्ष","15 वर्ष","20 वर्ष"]},ans:2}
];

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CBT Exam Simulator - SmartEduHub</title><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=\${pubId}" crossorigin="anonymous"></script><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans select-none">
<div id="setup" class="min-h-screen flex items-center justify-center p-4"><div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center"><a href="../index.html" class="text-emerald-400 text-xs font-semibold">← Back to Hub</a><h1 class="text-2xl font-black text-white">🏛️ CBT Exam Setup</h1><p class="text-xs text-slate-400">Apna exam aur subject chun kar test shuru karein.</p><div class="space-y-3 text-left"><div><label class="text-[11px] font-bold text-slate-400 uppercase">Target Exam</label><select id="s-exam" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-emerald-400 font-bold"><option value="UPSC">UPSC Civil Services</option><option value="SSC">SSC CGL / CHSL</option><option value="RAILWAY">Railways RRB</option><option value="STATE">State PSC</option></select></div><div><label class="text-[11px] font-bold text-slate-400 uppercase">Subject / Paper</label><select id="s-sub" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-emerald-400 font-bold"><option value="all">Full Syllabus (All Mix)</option><option value="history">History & Culture</option><option value="polity">Polity & Constitution</option><option value="economy">Economy</option><option value="maths">Quantitative Maths</option></select></div><div><label class="text-[11px] font-bold text-slate-400 uppercase">Bhasha (Language)</label><div class="grid grid-cols-2 gap-2 mt-1"><label class="flex items-center space-x-2 bg-slate-950 border border-slate-800 p-2.5 rounded-xl cursor-pointer text-xs"><input type="radio" name="lang" value="en" checked><span class="text-white font-bold">English</span></label><label class="flex items-center space-x-2 bg-slate-950 border border-slate-800 p-2.5 rounded-xl cursor-pointer text-xs"><input type="radio" name="lang" value="hi"><span class="text-white font-bold">हिन्दी</span></label></div></div><button onclick="startExam()" class="w-full py-3.5 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider transition shadow-lg mt-2">Start Exam / परीक्षा शुरू करें →</button></div></div></div>
<div id="hall" class="hidden flex-col min-h-screen"><header class="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-50 flex justify-between items-center"><div class="flex items-center space-x-2"><button onclick="location.reload()" class="text-rose-400 font-bold text-xs">✕ Exit</button><span class="text-slate-600">|</span><span id="h-title" class="text-xs font-bold text-white">Exam</span></div><div class="flex items-center space-x-2"><select id="h-lang" class="bg-slate-950 border border-slate-700 px-2 py-1 rounded text-xs text-emerald-400 font-bold"><option value="en">English</option><option value="hi">हिन्दी</option></select><div class="bg-emerald-950/70 border border-emerald-500/50 px-2.5 py-1 rounded text-emerald-300 font-mono text-xs font-bold">⏱️ <span id="clock">15:00</span></div></div></header><main class="max-w-7xl mx-auto p-4 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-4"><div class="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"><div><div class="flex justify-between items-center pb-2 mb-3 border-b border-slate-800"><span id="q-num" class="text-xs font-bold px-2.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full">Q1</span><span class="text-xs text-emerald-400 font-mono">+2.00 / -0.50</span></div><h2 id="q-txt" class="text-sm sm:text-base font-bold text-white mb-4">...</h2><div id="opts" class="space-y-2.5"></div></div><div class="border-t border-slate-800 pt-4 mt-4 flex justify-between"><button onclick="markReview()" class="px-3 py-1.5 bg-purple-900/40 border border-purple-500/40 text-purple-300 rounded-xl text-xs font-bold">🔖 Review</button><div class="flex space-x-2"><button id="p-btn" onclick="prevQ()" class="px-3 py-1.5 bg-slate-800 rounded-xl text-xs">Prev</button><button onclick="saveNext()" class="px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">Save & Next →</button></div></div></div><div class="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 h-fit"><h3 class="text-xs font-bold uppercase text-slate-400 mb-2">Palette</h3><div id="grid" class="grid grid-cols-5 gap-1.5 mb-4"></div><button onclick="finishPrompt()" class="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase">Submit</button></div></main></div>
<div id="modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4"><div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center space-y-3"><div class="text-4xl">📊</div><h2 class="text-lg font-black text-white">Scorecard</h2><div class="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl text-xs"><div><div class="text-slate-400">Score</div><div id="m-score" class="text-base font-bold text-emerald-400">0</div></div><div><div class="text-slate-400">Accuracy</div><div id="m-acc" class="text-base font-bold text-cyan-400">0%</div></div></div><button onclick="location.reload()" class="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">New Exam</button></div></div>
<script>
const allQ = \${JSON.stringify(allQs)};
let qs = [], cur = 0, lang = "en", time = 900, tInt = null, states = [];
function startExam() {
  const eName = document.getElementById("s-exam").value;
  const sName = document.getElementById("s-sub").value;
  lang = document.querySelector('input[name="lang"]:checked').value;
  document.getElementById("h-lang").value = lang;
  qs = sName === "all" ? [...allQ] : allQ.filter(q => q.tag === sName);
  if (qs.length === 0) qs = [...allQ];
  states = qs.map(() => ({ sel: null, st: 'unvisited' }));
  states[0].st = 'not-answered';
  document.getElementById("h-title").innerText = eName + " • " + sName.toUpperCase();
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("hall").classList.remove("hidden");
  document.getElementById("hall").classList.add("flex");
  clearInterval(tInt);
  tInt = setInterval(() => { if (time > 0) time--; const m = Math.floor(time/60), s = time%60; document.getElementById("clock").innerText = String(m).padStart(2,'0') + ":" + String(s).padStart(2,'0'); if (time === 0) finish(); }, 1000);
  draw();
}
function draw() {
  const q = qs[cur][lang], st = states[cur];
  if (st.st === 'unvisited') st.st = 'not-answered';
  document.getElementById("q-num").innerText = "Q" + (cur+1) + " of " + qs.length;
  document.getElementById("q-txt").innerText = q.q;
  document.getElementById("opts").innerHTML = q.o.map((o, i) => '<div onclick="pick(' + i + ')" class="p-3 rounded-xl border cursor-pointer text-xs sm:text-sm ' + (st.sel === i ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold' : 'border-slate-800 bg-slate-950/60') + '"><span class="font-mono text-slate-500 mr-2">' + String.fromCharCode(65+i) + '.</span> ' + o + '</div>').join("");
  document.getElementById("p-btn").disabled = cur === 0;
  drawGrid();
}
function drawGrid() {
  document.getElementById("grid").innerHTML = states.map((s, i) => {
    let cls = "bg-slate-800 text-slate-400 border border-slate-700";
    if (s.st === 'answered') cls = "bg-emerald-500 text-slate-950 font-bold";
    else if (s.st === 'not-answered') cls = "bg-rose-500 text-white font-bold";
    else if (s.st === 'review') cls = "bg-purple-600 text-white font-bold";
    const ring = cur === i ? "ring-2 ring-cyan-400" : "";
    return '<button onclick="jump(' + i + ')" class="h-7 rounded text-xs font-mono ' + cls + ' ' + ring + '">' + (i+1) + '</button>';
  }).join("");
}
window.pick = (i) => { states[cur].sel = i; draw(); };
window.markReview = () => { states[cur].st = 'review'; if (cur < qs.length - 1) cur++; draw(); };
window.saveNext = () => { states[cur].st = states[cur].sel !== null ? 'answered' : 'not-answered'; if (cur < qs.length - 1) cur++; draw(); };
window.prevQ = () => { if (cur > 0) cur--; draw(); };
window.jump = (i) => { cur = i; draw(); };
window.finishPrompt = () => { if (confirm("Submit Exam?")) finish(); };
function finish() {
  clearInterval(tInt);
  let c = 0, inc = 0;
  qs.forEach((q, i) => { if (states[i].sel === q.ans) c++; else if (states[i].sel !== null) inc++; });
  const score = (c * 2) - (inc * 0.5);
  const acc = (c + inc) > 0 ? Math.round((c / (c + inc)) * 100) : 0;
  document.getElementById("m-score").innerText = score.toFixed(2) + " / " + (qs.length * 2);
  document.getElementById("m-acc").innerText = acc + "%";
  document.getElementById("modal").classList.remove("hidden");
}
document.getElementById("h-lang").addEventListener("change", (e) => { lang = e.target.value; draw(); });
</script></body></html>\`;

fs.writeFileSync("tools/online-exam.html", html, "utf8");
console.log("✅ Step 1: tools/online-exam.html setup screen done!");
fs.unlinkSync("make_exam.js");
