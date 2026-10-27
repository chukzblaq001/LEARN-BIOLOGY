/* BIOLEARN starter app. Lesson content is stored in this file so it can work offline. */
"use strict";

const LEVELS = ["All levels","JSS 1","JSS 2","JSS 3","SS 1","SS 2","SS 3","University 100","University 200","University 300","University 400"];

const LESSONS = [
 {id:"jss1-living",level:"JSS 1",title:"Characteristics of Living Things",category:"Introductory Biology",summary:"Discover the features that distinguish living things from non-living things.",minutes:6,sections:[
  ["Learning objectives",["Define living and non-living things.","List the seven commonly taught life processes."]],
  ["What are living things?",["Living things are organisms that carry out life processes. Examples include humans, goats, maize plants and bacteria. Non-living things such as rocks and chairs do not independently carry out these processes."]],
  ["The life processes",["Movement: a change in position or body part.","Respiration: releasing usable energy from food inside cells.","Sensitivity: detecting and responding to changes.","Growth: a permanent increase in size or dry mass.","Reproduction: producing offspring.","Excretion: removing metabolic waste.","Nutrition: obtaining or making food. These are often remembered as MRS GREN."]],
  ["Why it matters",["A plant may not walk from place to place, but it moves parts toward light, respires, grows, responds to stimuli and reproduces."]]
 ],diagram:"life",quiz:[
  {q:"Which of these is a life process?",options:["Rusting","Respiration","Melting","Breaking"],answer:1,explanation:"Respiration releases usable energy from food in living cells."},
  {q:"What does excretion mean?",options:["Taking in food","Producing offspring","Removing metabolic waste","Increasing in size"],answer:2,explanation:"Excretion removes waste products made by metabolism."},
  {q:"Which is a living organism?",options:["A stone","A plastic bottle","A maize plant","A glass cup"],answer:2,explanation:"A maize plant performs the life processes of living organisms."}
 ]},
 {id:"jss1-cell",level:"JSS 1",title:"Introduction to Cells",category:"Cell Biology",summary:"Learn about cells as the basic units of living organisms.",minutes:7,sections:[
  ["Learning objectives",["Explain what a cell is.","Identify common cell parts."]],
  ["The cell",["A cell is the basic structural and functional unit of life. Some organisms, such as many bacteria, consist of one cell. Humans, animals and plants are multicellular."]],
  ["Parts of a typical cell",["The cell membrane controls movement of substances into and out of the cell.","The cytoplasm is where many chemical reactions take place.","The nucleus contains genetic material and helps control cell activities.","Plant cells also have a cellulose cell wall, chloroplasts in many green cells, and a large permanent vacuole."]],
  ["Plant and animal cells",["Both have a cell membrane, cytoplasm and genetic material. Typical plant cells have a cell wall and large vacuole; animal cells do not have a cellulose cell wall."]]
 ],diagram:"cell",quiz:[
  {q:"What is the basic unit of life?",options:["Organ","Cell","System","Tissue"],answer:1,explanation:"Cells are the basic structural and functional units of living organisms."},
  {q:"Which structure controls many cell activities and contains DNA?",options:["Nucleus","Cell wall","Vacuole","Cell membrane"],answer:0,explanation:"The nucleus contains genetic material and regulates many cell activities."},
  {q:"Which structure is made of cellulose in plant cells?",options:["Cytoplasm","Nucleus","Cell wall","Ribosome"],answer:2,explanation:"The plant cell wall contains cellulose and provides support."}
 ]},
 {id:"jss2-nutrition",level:"JSS 2",title:"Nutrition in Plants",category:"Plant Biology",summary:"Understand how green plants make food by photosynthesis.",minutes:8,sections:[
  ["Learning objectives",["Define photosynthesis.","State the materials and conditions needed."]],
  ["Photosynthesis",["Photosynthesis is the process by which green plants use light energy to make carbohydrates from carbon dioxide and water, releasing oxygen. Chlorophyll absorbs light energy."]],
  ["Word equation",["Carbon dioxide + water — light and chlorophyll → glucose + oxygen."]],
  ["Conditions and importance",["Photosynthesis requires light, chlorophyll, water and carbon dioxide. It provides food for plants and supports food chains while releasing oxygen."]]
 ],diagram:"photo",quiz:[
  {q:"Which pigment absorbs light for photosynthesis?",options:["Haemoglobin","Chlorophyll","Melanin","Keratin"],answer:1,explanation:"Chlorophyll absorbs light energy used in photosynthesis."},
  {q:"Which gas is used during photosynthesis?",options:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],answer:2,explanation:"Plants take in carbon dioxide as a raw material for photosynthesis."},
  {q:"What is a major product of photosynthesis?",options:["Glucose","Urea","Lactic acid","Starch only"],answer:0,explanation:"Photosynthesis produces carbohydrates such as glucose; plants may store it as starch."}
 ]},
 {id:"jss3-ecology",level:"JSS 3",title:"Introduction to Ecology",category:"Ecology",summary:"Explore habitats, populations, communities and ecosystems.",minutes:7,sections:[
  ["Learning objectives",["Define habitat and ecosystem.","Distinguish population from community."]],
  ["Key terms",["A habitat is the place where an organism lives. A population is a group of organisms of the same species living in an area. A community includes populations of different species. An ecosystem includes a community and its non-living environment."]],
  ["Biotic and abiotic factors",["Biotic factors include predators, competitors and food organisms. Abiotic factors include light, temperature, water, soil and pH."]],
  ["Food chains",["A food chain shows one pathway of energy transfer. Green plants are producers; animals that eat plants or other animals are consumers. Decomposers break down dead material."]]
 ],diagram:"food",quiz:[
  {q:"What is the place where an organism lives called?",options:["Niche","Habitat","Community","Biome only"],answer:1,explanation:"A habitat is the natural place where an organism lives."},
  {q:"Which is an abiotic factor?",options:["Predator","Bacteria","Temperature","Grass"],answer:2,explanation:"Temperature is a non-living environmental factor."},
  {q:"Which organisms usually begin a grazing food chain?",options:["Producers","Carnivores","Decomposers","Parasites"],answer:0,explanation:"Green plants capture light energy and act as producers."}
 ]},
 {id:"ss1-classification",level:"SS 1",title:"Classification of Living Things",category:"Diversity of Life",summary:"Learn why organisms are grouped and how classification works.",minutes:8,sections:[
  ["Learning objectives",["Explain the purpose of classification.","Describe the binomial naming system."]],
  ["Why classify organisms?",["Classification organizes biodiversity, makes identification easier and helps scientists communicate consistently about organisms and their relationships."]],
  ["Taxonomic hierarchy",["A common sequence is kingdom, phylum (division in plants), class, order, family, genus and species. Each level groups organisms by shared features."]],
  ["Binomial nomenclature",["Each species has a two-part scientific name: genus followed by specific epithet, for example Homo sapiens. The genus begins with a capital letter; both words are italicized when typed."]]
 ],diagram:"none",quiz:[
  {q:"How many parts are in a binomial scientific name?",options:["One","Two","Three","Four"],answer:1,explanation:"Binomial nomenclature uses two parts: genus and specific epithet."},
  {q:"Which taxonomic rank is usually the most specific in this list?",options:["Kingdom","Class","Family","Species"],answer:3,explanation:"Species is the most specific of these common taxonomic ranks."},
  {q:"Why is classification useful?",options:["It stops evolution","It organizes biodiversity","It makes all organisms identical","It removes variation"],answer:1,explanation:"Classification helps organize and identify the diversity of life."}
 ]},
 {id:"ss2-genetics",level:"SS 2",title:"Introduction to Genetics",category:"Genetics",summary:"Explore genes, chromosomes, inheritance and variation.",minutes:9,sections:[
  ["Learning objectives",["Define gene, allele and chromosome.","Understand basic inheritance vocabulary."]],
  ["Genetic material",["DNA stores hereditary information. A gene is a DNA sequence associated with a functional product or trait. Chromosomes are structures containing DNA and proteins."]],
  ["Alleles and inheritance",["Alleles are alternative forms of a gene. In a simple dominant-recessive model, a dominant allele can determine the phenotype in a heterozygote; real inheritance patterns can be more complex."]],
  ["Variation",["Variation means differences among individuals. Genetic differences, environmental influences and interactions between them can contribute to variation."]]
 ],diagram:"none",quiz:[
  {q:"What molecule stores hereditary information in most organisms?",options:["DNA","Starch","Cellulose","Water"],answer:0,explanation:"DNA carries hereditary information in most living organisms."},
  {q:"Alternative forms of a gene are called…",options:["Organs","Alleles","Tissues","Species"],answer:1,explanation:"Alleles are alternative versions of the same gene."},
  {q:"What is variation?",options:["All individuals being identical","Differences among individuals","Cell division only","A type of habitat"],answer:1,explanation:"Variation describes differences in characteristics among individuals."}
 ]},
 {id:"ss3-human",level:"SS 3",title:"Human Reproduction",category:"Human Biology",summary:"Revise reproductive organs, fertilisation and development.",minutes:9,sections:[
  ["Learning objectives",["Identify major reproductive structures.","Describe fertilisation at a basic level."]],
  ["Reproductive systems",["The male reproductive system produces sperm and delivers them. The female reproductive system produces ova and supports fertilisation and development during pregnancy."]],
  ["Fertilisation",["In humans, fertilisation normally occurs when a sperm cell fuses with an ovum, usually in the oviduct, forming a zygote. The zygote divides and develops as it moves toward the uterus."]],
  ["Health and responsibility",["Reproductive health includes accurate information, consent, hygiene, access to appropriate healthcare and understanding prevention of sexually transmitted infections."]]
 ],diagram:"none",quiz:[
  {q:"What is formed immediately after successful fertilisation?",options:["A zygote","A placenta only","A sperm","An adult"],answer:0,explanation:"Fusion of sperm and ovum forms a zygote."},
  {q:"Where does human fertilisation usually occur?",options:["Stomach","Oviduct (fallopian tube)","Bladder","Lung"],answer:1,explanation:"Fertilisation normally occurs in the oviduct."},
  {q:"Which cell carries male gamete genetic material?",options:["Red blood cell","Sperm cell","Neuron","Platelet"],answer:1,explanation:"A sperm cell is the male gamete."}
 ]},
 {id:"u100-biomolecules",level:"University 100",title:"Biological Molecules",category:"Biochemistry",summary:"Review carbohydrates, lipids, proteins, nucleic acids and water.",minutes:10,sections:[
  ["Learning objectives",["Name major biological molecules.","Relate structure to biological function."]],
  ["Carbohydrates and lipids",["Carbohydrates include sugars and polysaccharides used in energy transfer, storage and structure. Lipids include fats, oils, phospholipids and steroids; they contribute to energy storage and membranes."]],
  ["Proteins",["Proteins are polymers of amino acids linked by peptide bonds. Their functions include catalysis, transport, structure, signalling and defence."]],
  ["Nucleic acids and water",["DNA and RNA are nucleic acids made of nucleotides. Water is a polar solvent, participates in reactions and helps stabilize temperature."]]
 ],diagram:"none",quiz:[
  {q:"What are proteins made from?",options:["Amino acids","Fatty acids only","Glucose units only","Nucleotides only"],answer:0,explanation:"Proteins are polymers of amino acids linked by peptide bonds."},
  {q:"Which molecule stores hereditary information?",options:["DNA","Triglyceride","Cellulose","Glycogen only"],answer:0,explanation:"DNA stores hereditary information in cells."},
  {q:"Phospholipids are important components of…",options:["Cell membranes","Bone minerals only","Starch granules only","Oxygen"],answer:0,explanation:"Phospholipids form the basic bilayer of many biological membranes."}
 ]},
 {id:"u200-membranes",level:"University 200",title:"Cell Membranes and Transport",category:"Cell Biology",summary:"Study membrane structure, diffusion, osmosis and active transport.",minutes:10,sections:[
  ["Learning objectives",["Describe the fluid mosaic model.","Compare passive and active transport."]],
  ["Membrane structure",["The fluid mosaic model describes a phospholipid bilayer with embedded proteins and other molecules. The membrane is selectively permeable."]],
  ["Passive transport",["Diffusion is net movement down a concentration gradient. Osmosis is net movement of water across a selectively permeable membrane down its water potential gradient. Passive transport does not directly require cellular energy."]],
  ["Active transport",["Active transport moves substances using energy, commonly against an electrochemical gradient, through membrane proteins."]]
 ],diagram:"none",quiz:[
  {q:"Which model describes membrane organization?",options:["Fluid mosaic model","Lock-and-key only","Germ theory","Cell theory"],answer:0,explanation:"The fluid mosaic model describes the membrane bilayer and its mobile components."},
  {q:"Which process directly requires energy to move substances against a gradient?",options:["Simple diffusion","Active transport","Osmosis","Filtration only"],answer:1,explanation:"Active transport uses energy to move substances against a gradient."},
  {q:"Osmosis concerns the movement of…",options:["Water","DNA only","Ribosomes","Whole organisms"],answer:0,explanation:"Osmosis is net water movement across a selectively permeable membrane."}
 ]},
 {id:"u300-evolution",level:"University 300",title:"Evolution and Natural Selection",category:"Evolutionary Biology",summary:"Understand variation, selection, adaptation and population change.",minutes:11,sections:[
  ["Learning objectives",["Explain natural selection.","Distinguish individuals from populations in evolution."]],
  ["Variation and inheritance",["Individuals in populations vary. Some variation is heritable, and individuals differ in survival and reproductive success in particular environments."]],
  ["Natural selection",["When heritable traits affect reproductive success, associated alleles can change in frequency over generations. Natural selection acts on individuals, while populations evolve."]],
  ["Evidence and caution",["Evidence for evolution includes fossils, comparative anatomy, biogeography and molecular similarities. Evolution is not the same as an individual changing its genes because it needs to."]]
 ],diagram:"none",quiz:[
  {q:"What changes genetically over generations during evolution?",options:["Populations","One individual's whole genome by choice","Only rocks","The weather"],answer:0,explanation:"Evolution is a change in heritable characteristics or allele frequencies in populations over generations."},
  {q:"Natural selection requires heritable variation and differences in…",options:["Reproductive success","Planet size","Language","Daily temperature alone"],answer:0,explanation:"Selection can change trait frequencies when heritable differences affect reproductive success."},
  {q:"Which is evidence used to study evolution?",options:["Fossils","Horoscopes","Guesswork only","Dreams"],answer:0,explanation:"Fossils provide evidence of organisms and environments from the past."}
 ]},
 {id:"u400-conservation",level:"University 400",title:"Biodiversity Conservation",category:"Conservation Biology",summary:"Examine threats to biodiversity and evidence-based conservation strategies.",minutes:11,sections:[
  ["Learning objectives",["Identify major threats to biodiversity.","Compare in-situ and ex-situ conservation."]],
  ["Threats",["Major threats include habitat loss and fragmentation, overexploitation, invasive species, pollution and climate change. Threats often interact."]],
  ["Conservation methods",["In-situ conservation protects organisms in natural habitats, for example through protected areas. Ex-situ conservation protects organisms outside their natural habitats, such as in seed banks, botanical gardens or captive-breeding programmes."]],
  ["Conservation planning",["Effective conservation uses ecological evidence, community participation, monitoring, suitable funding and attention to local livelihoods. Strategies should be evaluated for measurable outcomes."]]
 ],diagram:"none",quiz:[
  {q:"Which is an example of in-situ conservation?",options:["Protecting a species in its natural habitat","Keeping all individuals in a laboratory","Storing DNA only","Moving every species into a zoo"],answer:0,explanation:"In-situ conservation protects organisms in their natural ecosystems."},
  {q:"Which is a major threat to biodiversity?",options:["Habitat destruction","Scientific naming","Observation","Responsible monitoring"],answer:0,explanation:"Habitat loss and fragmentation are major drivers of biodiversity decline."},
  {q:"A seed bank is generally an example of…",options:["Ex-situ conservation","Natural selection","A food chain","Habitat fragmentation"],answer:0,explanation:"Seed banks conserve plant genetic material outside the plants' natural habitats."}
 ]}
];

const STORAGE_KEY = "biolearn_progress_v1";
const defaultProgress = { completed: [], bookmarks: [], scores: {}, quizAttempts: 0 };
let progress = loadProgress();
let activeLevel = "All levels";
let currentLesson = null;
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let selectedAnswer = null;
let answerLocked = false;
let deferredInstallPrompt = null;

const $ = (selector) => document.querySelector(selector);

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? { ...defaultProgress, ...saved } : { ...defaultProgress };
  } catch (error) {
    console.warn("Could not read saved progress:", error);
    return { ...defaultProgress };
  }
}
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  catch (error) { alert("Your browser could not save progress. Check available device storage."); }
  renderStats();
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function renderFilters() {
  $("#levelFilters").innerHTML = LEVELS.map(level =>
    `<button type="button" class="filter-btn ${level === activeLevel ? "active" : ""}" data-level="${escapeHTML(level)}">${escapeHTML(level)}</button>`
  ).join("");
}
function renderLessons() {
  const search = $("#searchInput").value.trim().toLowerCase();
  const found = LESSONS.filter(lesson =>
    (activeLevel === "All levels" || lesson.level === activeLevel) &&
    `${lesson.title} ${lesson.summary} ${lesson.category} ${lesson.level}`.toLowerCase().includes(search)
  );
  $("#lessonGrid").innerHTML = found.map(lesson => {
    const done = progress.completed.includes(lesson.id);
    const saved = progress.bookmarks.includes(lesson.id);
    return `<article class="lesson-card">
      <div class="card-top"><span class="level-tag">${escapeHTML(lesson.level)}</span><button class="bookmark-small" data-bookmark="${lesson.id}" aria-label="${saved ? "Remove bookmark" : "Bookmark topic"}">${saved ? "★" : "☆"}</button></div>
      <h3>${escapeHTML(lesson.title)} ${done ? "✓" : ""}</h3>
      <p>${escapeHTML(lesson.summary)}</p>
      <div class="card-bottom"><span class="read-time">◷ ${lesson.minutes} min · ${lesson.quiz.length} questions</span><button class="small-button" data-open="${lesson.id}">Study lesson →</button></div>
    </article>`;
  }).join("");
  $("#emptyMessage").classList.toggle("hidden", found.length > 0);
}
function renderStats() {
  $("#lessonsDone").textContent = progress.completed.length;
  $("#savedCount").textContent = progress.bookmarks.length;
  const scores = Object.values(progress.scores);
  $("#bestScore").textContent = scores.length ? `${Math.max(...scores)}%` : "—";
  const percent = Math.round(progress.completed.length / LESSONS.length * 100);
  $("#progressBar").style.width = `${percent}%`;
  $("#progressText").textContent = `${percent}% of sample lessons completed (${progress.completed.length} of ${LESSONS.length})`;
}
function diagramHTML(type) {
  if (type === "cell") return `<div class="diagram"><div class="cell-diagram">CELL</div><small>Illustrative plant-cell-style diagram: membrane, cytoplasm and nucleus are simplified.</small></div>`;
  if (type === "photo") return `<div class="diagram"><svg viewBox="0 0 320 130" width="100%" style="max-width:320px" role="img" aria-label="Sunlight reaches a green plant; roots absorb water and leaves take in carbon dioxide"><circle cx="43" cy="28" r="18" fill="#f4c95d"/><g stroke="#e8ad3e" stroke-width="3"><path d="M43 2v-8 M43 54v8 M17 28H9 M69 28h8 M25 10l-6 -6 M61 46l6 6 M61 10l6 -6 M25 46l-6 6"/></g><path d="M160 110V48" stroke="#28884e" stroke-width="6" stroke-linecap="round"/><ellipse cx="139" cy="61" rx="26" ry="12" transform="rotate(28 139 61)" fill="#51a965"/><ellipse cx="181" cy="45" rx="26" ry="12" transform="rotate(-28 181 45)" fill="#2f8b4d"/><path d="M160 110q-12 8 -18 14m18 -14q12 8 18 14" stroke="#a7784b" stroke-width="3" fill="none"/><path d="M73 28h43" stroke="#d3a538" stroke-width="2" stroke-dasharray="4 4"/><path d="M215 46h48" stroke="#4784bf" stroke-width="2" stroke-dasharray="4 4"/><text x="86" y="18" font-size="10" fill="#6b5a28">Light</text><text x="220" y="36" font-size="10" fill="#35658c">CO₂</text><text x="160" y="128" text-anchor="middle" font-size="10" fill="#53695b">Water absorbed by roots</text></svg><small>Simplified photosynthesis illustration (not to scale).</small></div>`;
  if (type === "food") return `<div class="diagram"><strong>Example food chain</strong><p style="margin:12px 0;font-size:1rem">🌿 Grass <span style="color:#18794e">→</span> 🦗 Grasshopper <span style="color:#18794e">→</span> 🐸 Frog <span style="color:#18794e">→</span> 🐍 Snake</p><small>Arrows show the direction of energy transfer.</small></div>`;
  if (type === "life") return `<div class="diagram"><strong>MRS GREN</strong><p>Movement · Respiration · Sensitivity · Growth · Reproduction · Excretion · Nutrition</p><small>A common memory aid for seven life processes.</small></div>`;
  return "";
}
function openLesson(id) {
  currentLesson = LESSONS.find(item => item.id === id);
  if (!currentLesson) return;
  $("#modalLevel").textContent = `${currentLesson.level} · ${currentLesson.category}`;
  $("#modalTitle").textContent = currentLesson.title;
  $("#modalBody").innerHTML = currentLesson.sections.map(([heading, paragraphs]) =>
    `<h3>${escapeHTML(heading)}</h3>${paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("")}`
  ).join("") + diagramHTML(currentLesson.diagram) + `<p><strong>Study tip:</strong> Explain this topic in your own words, then take the quiz to check your understanding.</p>`;
  $("#bookmarkBtn").textContent = progress.bookmarks.includes(id) ? "★ Saved topic" : "☆ Save topic";
  $("#markCompleteBtn").textContent = progress.completed.includes(id) ? "✓ Completed" : "Mark complete";
  $("#lessonDialog").showModal();
}
function toggleBookmark(id) {
  progress.bookmarks = progress.bookmarks.includes(id) ? progress.bookmarks.filter(item => item !== id) : [...progress.bookmarks, id];
  saveProgress(); renderLessons();
  if (currentLesson?.id === id) $("#bookmarkBtn").textContent = progress.bookmarks.includes(id) ? "★ Saved topic" : "☆ Save topic";
}
function markComplete() {
  if (!currentLesson) return;
  if (!progress.completed.includes(currentLesson.id)) progress.completed.push(currentLesson.id);
  saveProgress(); renderLessons();
  $("#markCompleteBtn").textContent = "✓ Completed";
}
function startQuiz(lesson = null) {
  quizQuestions = lesson ? [...lesson.quiz] : LESSONS.flatMap(item => item.quiz.map(q => ({...q, source: item.title})));
  quizQuestions = quizQuestions.sort(() => Math.random() - 0.5).slice(0, Math.min(5, quizQuestions.length));
  quizIndex = 0; quizScore = 0; selectedAnswer = null; answerLocked = false;
  $("#quizTitle").textContent = lesson ? `${lesson.title} Quiz` : "Quick Biology Quiz";
  renderQuestion();
  $("#quizDialog").showModal();
}
function renderQuestion() {
  selectedAnswer = null; answerLocked = false;
  const q = quizQuestions[quizIndex];
  $("#quizBody").innerHTML = `<span class="question-count">QUESTION ${quizIndex + 1} OF ${quizQuestions.length}</span>
    <div class="quiz-progress"><div style="width:${(quizIndex / quizQuestions.length) * 100}%"></div></div>
    ${q.source ? `<p class="eyebrow">${escapeHTML(q.source)}</p>` : ""}
    <p class="question-text">${escapeHTML(q.q)}</p>
    <div id="answerOptions">${q.options.map((option, index) => `<label class="answer-option"><input type="radio" name="answer" value="${index}"><span>${escapeHTML(option)}</span></label>`).join("")}</div>
    <div id="answerFeedback"></div>
    <div class="quiz-controls"><span class="read-time">Choose one answer</span><button class="button" id="checkAnswerBtn" type="button">Check answer</button></div>`;
  $("#checkAnswerBtn").addEventListener("click", checkAnswer);
}
function checkAnswer() {
  if (answerLocked) {
    quizIndex++;
    if (quizIndex < quizQuestions.length) renderQuestion(); else showQuizResult();
    return;
  }
  const chosen = document.querySelector('input[name="answer"]:checked');
  if (!chosen) { $("#answerFeedback").innerHTML = `<p class="explanation">Choose an answer first.</p>`; return; }
  selectedAnswer = Number(chosen.value);
  const q = quizQuestions[quizIndex];
  answerLocked = true;
  if (selectedAnswer === q.answer) quizScore++;
  document.querySelectorAll(".answer-option").forEach((label, index) => {
    if (index === q.answer) label.classList.add("correct");
    else if (index === selectedAnswer) label.classList.add("wrong");
    label.querySelector("input").disabled = true;
  });
  $("#answerFeedback").innerHTML = `<div class="explanation"><strong>${selectedAnswer === q.answer ? "Correct!" : "Not quite."}</strong> ${escapeHTML(q.explanation)}</div>`;
  $("#checkAnswerBtn").textContent = quizIndex === quizQuestions.length - 1 ? "See results" : "Next question";
}
function showQuizResult() {
  const percent = Math.round(quizScore / quizQuestions.length * 100);
  progress.quizAttempts++;
  progress.scores.last = percent;
  progress.scores.best = Math.max(Number(progress.scores.best || 0), percent);
  saveProgress();
  $("#quizBody").innerHTML = `<div class="result-box"><p class="eyebrow">QUIZ COMPLETE</p><div class="result-score">${percent}%</div><h3>You scored ${quizScore} out of ${quizQuestions.length}</h3><p>${percent >= 80 ? "Excellent work! Keep learning." : percent >= 50 ? "Good effort. Review the lesson and try again." : "Keep practising. Read the notes and give it another try."}</p><div class="quiz-controls"><button class="button button-outline" id="retryQuizBtn" type="button">Try again</button><button class="button" id="finishQuizBtn" type="button">Finish</button></div></div>`;
  $("#retryQuizBtn").addEventListener("click", () => startQuiz(currentLesson));
  $("#finishQuizBtn").addEventListener("click", () => $("#quizDialog").close());
}

$("#levelFilters").addEventListener("click", event => {
  const button = event.target.closest("[data-level]");
  if (!button) return;
  activeLevel = button.dataset.level; renderFilters(); renderLessons();
});
$("#lessonGrid").addEventListener("click", event => {
  const bookmark = event.target.closest("[data-bookmark]");
  const open = event.target.closest("[data-open]");
  if (bookmark) toggleBookmark(bookmark.dataset.bookmark);
  if (open) openLesson(open.dataset.open);
});
$("#searchInput").addEventListener("input", renderLessons);
$("#startLearningBtn").addEventListener("click", () => $("#learnSection").scrollIntoView({behavior:"smooth"}));
$("#dailyQuizBtn").addEventListener("click", () => { currentLesson = null; startQuiz(); });
$("#closeLessonBtn").addEventListener("click", () => $("#lessonDialog").close());
$("#closeQuizBtn").addEventListener("click", () => $("#quizDialog").close());
$("#bookmarkBtn").addEventListener("click", () => currentLesson && toggleBookmark(currentLesson.id));
$("#markCompleteBtn").addEventListener("click", markComplete);
$("#startTopicQuizBtn").addEventListener("click", () => { const lesson = currentLesson; $("#lessonDialog").close(); startQuiz(lesson); });
$("#resetProgressBtn").addEventListener("click", () => {
  if (confirm("Reset all completed lessons, bookmarks and saved quiz scores on this device?")) {
    progress = {...defaultProgress, completed:[], bookmarks:[], scores:{}};
    saveProgress(); renderLessons();
  }
});
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault(); deferredInstallPrompt = event; $("#installBtn").classList.remove("hidden");
});
$("#installBtn").addEventListener("click", async () => {
  if (!deferredInstallPrompt) { alert("If install is unavailable, use your browser menu and choose Install app or Add to Home screen after opening the hosted app."); return; }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null; $("#installBtn").classList.add("hidden");
});
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(err => console.warn("Offline worker registration failed:", err)));
}

/* OFFLINE TUTOR
   This tutor searches the lesson material bundled in this app. It does not call an online AI API.
   Never put a private AI API key in app.js; a real online AI integration needs a secure backend. */
function addTutorMessage(text, sender = "tutor") {
  const message = document.createElement("div");
  message.className = `chat-message ${sender === "user" ? "user-message" : "tutor-message"}`;
  const label = document.createElement("strong");
  label.textContent = sender === "user" ? "You" : "BIOLEARN Tutor";
  const body = document.createElement("p");
  body.textContent = text;
  message.append(label, body);
  $("#tutorMessages").appendChild(message);
  $("#tutorMessages").scrollTop = $("#tutorMessages").scrollHeight;
}
function normalizeTutorText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}
function tutorAnswer(rawQuestion) {
  const question = normalizeTutorText(rawQuestion);
  if (!question) return "Type a Biology question and I'll try to help.";
  if (/\b(hello|hi|hey|good morning|good afternoon)\b/.test(question)) {
    return "Hello! 👋 I'm your BIOLEARN offline tutor. Ask me to explain a Biology topic, define a term, or find a lesson. Try: “Explain photosynthesis in simple words.”";
  }
  if (/\b(quiz|test|practice|practise|questions)\b/.test(question)) {
    const matched = findTutorLesson(question);
    if (matched) return `Let's practise ${matched.title}. Open that lesson and choose “Take topic quiz” for multiple-choice questions with answers and explanations.`;
    return "You can practise using the quizzes attached to each lesson. Choose a topic card below in the Learning Library, open it, then select “Take topic quiz”.";
  }
  if (/\b(waec|neco|jamb|exam|examination)\b/.test(question)) {
    return "For exam preparation, study one topic at a time, practise questions, and review why each answer is correct. This starter contains sample questions only; it is not a complete WAEC, NECO or JAMB question bank. Check the current official syllabus and your teacher's notes.";
  }
  if (/\b(help|what can you do|how do i use)\b/.test(question)) {
    return "I can explain topics covered by the lessons bundled in this app, suggest a lesson, and guide you to its quiz. Try asking about cells, photosynthesis, ecology, genetics, human reproduction, biological molecules, membranes, natural selection or conservation.";
  }
  const matched = findTutorLesson(question);
  if (matched) {
    const text = matched.sections.map(([heading, paragraphs]) => `${heading}: ${paragraphs.join(" ")}`).join("\n\n");
    const clipped = text.length > 1500 ? `${text.slice(0, 1500)}…` : text;
    return `Let's look at ${matched.title} (${matched.level}).\n\n${clipped}\n\nStudy tip: open “${matched.title}” in the Learning Library and take its quiz to check your understanding.`;
  }
  const keywordHints = [
    ["photosynthesis", "Nutrition in Plants"],
    ["cell", "Introduction to Cells"],
    ["genetic", "Introduction to Genetics"],
    ["inheritance", "Introduction to Genetics"],
    ["evolution", "Evolution and Natural Selection"],
    ["selection", "Evolution and Natural Selection"],
    ["ecosystem", "Introduction to Ecology"],
    ["habitat", "Introduction to Ecology"],
    ["reproduction", "Human Reproduction"],
    ["conservation", "Biodiversity Conservation"],
    ["membrane", "Cell Membranes and Transport"],
    ["protein", "Biological Molecules"]
  ];
  const hint = keywordHints.find(([key]) => question.includes(key));
  if (hint) {
    const lesson = LESSONS.find(item => item.title === hint[1]);
    return lesson ? `You may find this in “${lesson.title}” (${lesson.level}). ${lesson.summary} Open that lesson in the Learning Library for the notes and quiz.` : "Try searching for that topic in the Learning Library.";
  }
  return "I couldn't find a reliable answer to that question in the offline lesson pack yet. Try using a topic name such as cells, photosynthesis, genetics, ecology, evolution, reproduction or conservation. More offline explanations can be added as the BIOLEARN content library grows.";
}
function findTutorLesson(question) {
  const terms = normalizeTutorText(question).split(" ").filter(word => word.length > 2);
  let best = null;
  let bestScore = 0;
  for (const lesson of LESSONS) {
    const searchable = normalizeTutorText(`${lesson.title} ${lesson.category} ${lesson.summary} ${lesson.sections.map(section => section.join(" ")).join(" ")}`);
    let score = 0;
    for (const term of terms) {
      if (searchable.includes(term)) score += term.length > 5 ? 2 : 1;
    }
    if (score > bestScore) { best = lesson; bestScore = score; }
  }
  return bestScore >= 2 ? best : null;
}
function askTutor(prompt) {
  const cleanPrompt = String(prompt || "").trim();
  if (!cleanPrompt) return;
  addTutorMessage(cleanPrompt, "user");
  $("#tutorInput").value = "";
  $("#tutorSendBtn").disabled = true;
  $("#tutorSendBtn").textContent = "Thinking…";
  // A local response is produced immediately; no network request is made.
  const response = tutorAnswer(cleanPrompt);
  window.setTimeout(() => {
    addTutorMessage(response, "tutor");
    $("#tutorSendBtn").disabled = false;
    $("#tutorSendBtn").textContent = "Ask tutor ↑";
    $("#tutorInput").focus();
  }, 120);
}
$("#tutorForm").addEventListener("submit", event => {
  event.preventDefault();
  askTutor($("#tutorInput").value);
});
document.querySelectorAll("[data-prompt]").forEach(button => {
  button.addEventListener("click", () => askTutor(button.dataset.prompt));
});

renderFilters(); renderLessons(); renderStats();
