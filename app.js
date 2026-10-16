(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const TOPICS = Array.isArray(window.BIO_TOPICS) ? window.BIO_TOPICS : [];
  const LEVELS = [
    {id:"JSS1",title:"JSS1",sub:"Start with the basics",number:"01"},
    {id:"JSS2",title:"JSS2",sub:"Build your foundation",number:"02"},
    {id:"JSS3",title:"JSS3",sub:"Prepare for senior school",number:"03"},
    {id:"SS1",title:"SS1",sub:"Explore core Biology",number:"04"},
    {id:"SS2",title:"SS2",sub:"Develop deeper skills",number:"05"},
    {id:"SS3",title:"SS3",sub:"Prepare for examinations",number:"06"},
    {id:"University 100 Level",title:"University 100",sub:"First-year concepts",number:"07"},
    {id:"University 200 Level",title:"University 200",sub:"Build degree-level depth",number:"08"},
    {id:"University 300 Level",title:"University 300",sub:"Apply specialist knowledge",number:"09"},
    {id:"University 400 Level",title:"University 400",sub:"Advanced and integrative topics",number:"10"}
  ];
  const STORAGE_KEY = "biolearn-blaq-v1";
  const CUSTOM_QUESTIONS_KEY = "biolearn-custom-questions-v1";
  let state = loadState();
  let selectedLevel = "JSS1";
  let currentTopic = null;
  let quizQuestions = [];
  let quizAnswers = {};
  let quizIndex = 0;
  let quizMode = "practice";
  let quizTrack = "MIXED";
  let quizTimerDuration = 2400;
  let topicPracticeActive = false;
  let quizStart = 0;
  let timerInterval = null;
  let secondsLeft = 2400;
  let toastTimeout = null;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {completed: Array.isArray(saved.completed) ? saved.completed : [], history: Array.isArray(saved.history) ? saved.history : [], studentName: typeof saved.studentName === "string" ? saved.studentName : ""};
    } catch (error) {
      console.warn("Could not read saved progress:", error);
      return {completed: [], history: []};
    }
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
    catch (error) { console.warn("Could not save progress:", error); showToast("Progress could not be saved on this device."); return false; }
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  }
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message; toast.classList.add("show");
    clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
  }
  function levelMatches(topic, level) {
    // A topic can support more than one stage when the same foundation is revisited at greater depth.
    const levelMap = {
      "cell-basics": ["JSS1", "JSS2", "JSS3", "SS1"],
      "classification": ["JSS3", "SS1"],
      "nutrition": ["JSS1", "JSS2", "SS1"],
      "ecology": ["JSS2", "JSS3", "SS1", "SS2"],
      "genetics": ["SS2", "SS3", "University 100 Level"],
      "human-systems": ["SS1", "SS2", "SS3", "University 100 Level"],
      "photosynthesis": ["SS2", "SS3", "University 100 Level"],
      "microbiology": ["SS3", "University 100 Level", "University 200 Level"],
      "evolution": ["University 100 Level", "University 200 Level", "University 300 Level", "University 400 Level"],
      "homeostasis": ["University 200 Level", "University 300 Level", "University 400 Level"],
      "immunology": ["University 300 Level", "University 400 Level"]
    };
    return (levelMap[topic.id] || [topic.level]).includes(level);
  }
  function renderLevels() {
    $("#levelGrid").innerHTML = LEVELS.map(level => `
      <button class="level-card ${selectedLevel === level.id ? "active" : ""}" data-level="${escapeHTML(level.id)}">
        <span class="level-number">${level.number}</span><strong>${escapeHTML(level.title)}</strong><small>${escapeHTML(level.sub)}</small>
      </button>`).join("");
  }
  function visibleTopics() {
    const search = $("#topicSearch").value.trim().toLowerCase();
    return TOPICS.filter(topic => levelMatches(topic, selectedLevel) && `${topic.title} ${topic.summary}`.toLowerCase().includes(search));
  }
  function renderTopics() {
    const topics = visibleTopics();
    $("#topicsHeading").textContent = `${selectedLevel} Biology topics`;
    $("#topicGrid").innerHTML = topics.map(topic => {
      const done = state.completed.includes(topic.id);
      return `<article class="topic-card">
        <div class="topic-top"><span class="topic-icon">${topic.icon}</span><span class="topic-tag">${escapeHTML(topic.level)}</span></div>
        <h3>${escapeHTML(topic.title)}</h3><p>${escapeHTML(topic.summary)}</p>
        <div class="topic-bottom"><span>${topic.questions.length} practice questions ${done ? "• Completed ✓" : ""}</span><button class="small-btn" data-topic="${escapeHTML(topic.id)}">Open topic →</button></div>
      </article>`;
    }).join("");
    $("#emptyTopics").classList.toggle("hidden", topics.length !== 0);
  }
  function renderProgress() {
    $("#completedCount").textContent = state.completed.length;
    if ($("#studentName") && $("#studentName") !== document.activeElement) $("#studentName").value = state.studentName || "";
    $("#quizCount").textContent = state.history.length;
    const best = state.history.reduce((max, attempt) => Math.max(max, Number(attempt.score) || 0), -1);
    $("#bestScore").textContent = best < 0 ? "—" : `${best}%`;
    const recent = state.history.slice(-5).reverse();
    $("#quizHistory").innerHTML = recent.length ? recent.map(attempt => `<div class="history-row"><span>${escapeHTML(attempt.date)} · ${escapeHTML(attempt.track || "Mixed Biology")} · ${escapeHTML(attempt.mode)} mode</span><strong>${attempt.score}% (${attempt.correct}/${attempt.total || 40})</strong></div>`).join("") : '<p class="muted">Your completed quizzes will appear here.</p>';
    const nameLabel = $("#studentWelcome");
    if (nameLabel) nameLabel.textContent = state.studentName ? `Welcome back, ${state.studentName}` : "Welcome to BioLearn";
  }
  function renderAll() { renderLevels(); renderTopics(); renderProgress(); $("#topicCount").textContent = TOPICS.length; }
  function openLesson(topic) {
    currentTopic = topic;
    $("#lessonLevel").textContent = `${topic.level.toUpperCase()} • BIOLOGY`;
    $("#lessonTitle").textContent = topic.title;
    const noteSentences = String(topic.notes || topic.summary || "").split(/(?<=[.!?])\\s+/).filter(Boolean);
    const keyPoints = noteSentences.map(sentence => `<li>${escapeHTML(sentence)}</li>`).join("");
    const topicQuestions = topic.questions.length;
    $("#lessonContent").innerHTML = `<section class="lesson-intro"><p>${escapeHTML(topic.summary)}</p></section><h3>Learning objectives</h3><ul><li>Explain the main idea of ${escapeHTML(topic.title.toLowerCase())} in your own words.</li><li>Identify important terms, structures or processes connected to this topic.</li><li>Apply the idea to a Biology question and explain why the answer is correct.</li></ul><h3>Study notes</h3><ul class="lesson-key-points">${keyPoints || `<li>${escapeHTML(topic.notes || topic.summary)}</li>`}</ul><div class="note-box"><strong>Study method:</strong> Read each point, cover the notes and recall the idea from memory. Then practise the ${topicQuestions} questions and read every explanation.</div><h3>Quick self-check</h3><p>Without looking at the notes, write down three important facts about this topic. Explain one example to a friend or in your own words. Return to the notes for anything you missed.</p><h3>Practice questions</h3><p>This topic currently has ${topicQuestions} core questions. Your result will help you decide what to revise next.</p>`;
    $("#markComplete").textContent = state.completed.includes(topic.id) ? "Topic completed ✓" : "Mark topic complete";
    $("#markComplete").disabled = state.completed.includes(topic.id);
    $("#lessonDialog").showModal();
  }
  function startTopicPractice(topic) {
    currentTopic = topic;
    const custom = getCustomQuestions().filter(q => q.topicId === topic.id || q.topicTitle === topic.title);
    quizQuestions = [...topic.questions.map(q => ({...q, topicTitle: topic.title, topicLevel: topic.level})), ...custom].slice(0, 10);
    // Topic practice contains its 10 attached questions; quiz attempt length is 10 by design for focused practice.
    quizAnswers = {}; quizIndex = 0; quizMode = "practice"; quizStart = Date.now(); topicPracticeActive = true;
    $("#lessonDialog").close();
    $("#quizTitle").textContent = `${topic.title} · 10-question topic practice`;
    $("#quizSetup").classList.add("hidden"); $("#quizResult").classList.add("hidden"); $("#quizPlay").classList.remove("hidden");
    $("#submitQuiz").classList.add("hidden"); $("#nextQuestion").classList.remove("hidden");
    $("#prevQuestion").classList.remove("hidden"); renderQuestion(); $("#quizDialog").showModal();
  }
  function startQuizSetup() {
    if (allQuestions().length < 40) {
      showToast("The question bank needs at least 40 questions.");
      return;
    }
    topicPracticeActive = false;
    updateExamTrackHelp();
    $("#quizTitle").textContent = "Exam practice and CBT";
    $("#quizSetup").classList.remove("hidden"); $("#quizPlay").classList.add("hidden"); $("#quizResult").classList.add("hidden");
    $("#quizDialog").showModal();
  }
  function getCustomQuestions() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CUSTOM_QUESTIONS_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(q => q && q.id && q.question && Array.isArray(q.options) && q.options.length === 4 && q.options.includes(q.answer)) : [];
    } catch (_) { return []; }
  }
  function allQuestions() {
    const core = TOPICS.flatMap(topic => topic.questions.map(q => ({...q, topicId: topic.id, topicTitle: topic.title, topicLevel: topic.level})));
    return [...core, ...getCustomQuestions()];
  }
  // Supplemental original scenario questions, written for practice (not official past questions).
  const EXAM_EXTRAS = {
    JAMB: [
      {id:"extra-jamb-01",question:"A plant is kept in darkness for 24 hours before a leaf is tested with iodine. Why is this done?",options:["To remove stored starch from the leaf","To increase chlorophyll production","To stop water absorption permanently","To increase the leaf's surface area"],answer:"To remove stored starch from the leaf",explanation:"Destarching uses stored starch so that starch detected later can be linked to photosynthesis during the experiment.",topicTitle:"Photosynthesis experiments",topicLevel:"SS2",difficulty:"Medium"},
      {id:"extra-jamb-02",question:"In a monohybrid cross Aa × Aa, what proportion of offspring is expected to be aa?",options:["One quarter","One half","Three quarters","All offspring"],answer:"One quarter",explanation:"The possible genotypes are AA, Aa, Aa and aa, so one of four is expected to be aa.",topicTitle:"Genetics",topicLevel:"SS2",difficulty:"Challenging"},
      {id:"extra-jamb-03",question:"A freshwater amoeba gains water by osmosis. Which structure helps prevent it from bursting?",options:["Contractile vacuole","Ribosome","Nucleolus","Chloroplast"],answer:"Contractile vacuole",explanation:"The contractile vacuole collects and expels excess water that enters the cell by osmosis.",topicTitle:"Osmoregulation",topicLevel:"SS1",difficulty:"Medium"},
      {id:"extra-jamb-04",question:"Which change would most directly reduce the rate of enzyme-controlled digestion?",options:["A temperature far above the enzyme's optimum","A suitable substrate concentration","A temperature near the optimum","A suitable pH"],answer:"A temperature far above the enzyme's optimum",explanation:"Excessive heat can alter an enzyme's shape and active site, reducing activity through denaturation.",topicTitle:"Enzymes",topicLevel:"SS1",difficulty:"Medium"},
      {id:"extra-jamb-05",question:"A person has a low red blood cell count. Which process is most directly affected?",options:["Transport of oxygen","Production of bile","Filtration of urine","Transmission of nerve impulses"],answer:"Transport of oxygen",explanation:"Haemoglobin in red blood cells carries most oxygen from the lungs to body tissues.",topicTitle:"Human circulation",topicLevel:"SS2",difficulty:"Easy"},
      {id:"extra-jamb-06",question:"In a food chain, only a fraction of energy passes to the next trophic level. What happens to much of the remaining energy?",options:["It is released as heat during life processes","It is converted entirely into minerals","It returns unchanged to sunlight","It is stored permanently in predators"],answer:"It is released as heat during life processes",explanation:"Organisms use energy for respiration, movement and other processes; much is dissipated as heat.",topicTitle:"Ecology",topicLevel:"SS1",difficulty:"Medium"},
      {id:"extra-jamb-07",question:"Which event occurs during meiosis but not during ordinary mitosis?",options:["Pairing of homologous chromosomes and crossing over","DNA being made of nucleotides","Chromosomes being moved by spindle fibres","A cell using ATP"],answer:"Pairing of homologous chromosomes and crossing over",explanation:"Homologous chromosomes pair and may exchange segments during prophase I of meiosis.",topicTitle:"Cell division",topicLevel:"SS2",difficulty:"Challenging"},
      {id:"extra-jamb-08",question:"A person sweats more on a hot day. This response mainly helps to",options:["lower body temperature as sweat evaporates","increase blood glucose directly","stop kidney filtration","raise the body's temperature"],answer:"lower body temperature as sweat evaporates",explanation:"Evaporation of sweat removes heat from the skin and supports thermoregulation.",topicTitle:"Homeostasis",topicLevel:"SS2",difficulty:"Easy"},
      {id:"extra-jamb-09",question:"Which molecule carries the coded instructions used to assemble a protein at a ribosome?",options:["Messenger RNA","Cellulose","Glycogen","Cholesterol"],answer:"Messenger RNA",explanation:"Messenger RNA carries a transcribed sequence from DNA to the ribosome, where its codons guide translation.",topicTitle:"Protein synthesis",topicLevel:"SS3",difficulty:"Medium"},
      {id:"extra-jamb-10",question:"A population grows rapidly and then levels off as resources become limited. The level it approaches is called the",options:["carrying capacity","mutation rate","trophic efficiency","ecological succession"],answer:"carrying capacity",explanation:"Carrying capacity is the population size an environment can support over time under prevailing conditions.",topicTitle:"Population ecology",topicLevel:"SS3",difficulty:"Challenging"}
    ],
    WAEC: [
      {id:"extra-waec-01",question:"A student places a leafy shoot in a polythene bag and later observes water droplets inside. The droplets mainly came from",options:["water vapour lost by the leaves","oxygen released by roots","starch leaving the stem","minerals evaporating from the soil"],answer:"water vapour lost by the leaves",explanation:"Water vapour released during transpiration condenses on the inner surface of the bag.",topicTitle:"Transpiration",topicLevel:"SS1",difficulty:"Easy"},
      {id:"extra-waec-02",question:"A red blood cell placed in distilled water swells because water enters it by",options:["osmosis","active transport","translocation","diffusion of haemoglobin"],answer:"osmosis",explanation:"Distilled water has a higher water potential than the cell contents, so water moves into the cell through its membrane.",topicTitle:"Osmosis",topicLevel:"SS1",difficulty:"Medium"},
      {id:"extra-waec-03",question:"Which feature of alveoli makes gas exchange efficient?",options:["Large surface area and thin moist walls","Thick dry walls and a small surface area","A hard outer shell","Absence of blood capillaries"],answer:"Large surface area and thin moist walls",explanation:"Many alveoli provide a large area, while thin moist walls and rich capillary supply shorten diffusion distance.",topicTitle:"Breathing and gas exchange",topicLevel:"SS1",difficulty:"Medium"},
      {id:"extra-waec-04",question:"In an ecological study, why should a quadrat be placed at random?",options:["To reduce selection bias in sampling","To ensure every organism is counted twice","To remove all variation from the habitat","To make the sample area larger each time"],answer:"To reduce selection bias in sampling",explanation:"Random placement reduces the chance that the investigator selects only areas that support an expected result.",topicTitle:"Ecological sampling",topicLevel:"SS1",difficulty:"Challenging"},
      {id:"extra-waec-05",question:"Which blood vessel carries oxygenated blood from the lungs to the heart?",options:["Pulmonary vein","Pulmonary artery","Vena cava","Renal vein"],answer:"Pulmonary vein",explanation:"The pulmonary veins return oxygenated blood from the lungs to the left atrium.",topicTitle:"Circulation",topicLevel:"SS2",difficulty:"Easy"},
      {id:"extra-waec-06",question:"A plant shoot bends towards a window. This response is an example of",options:["positive phototropism","negative geotropism only","hydrotropism","thigmotropism"],answer:"positive phototropism",explanation:"Positive phototropism is growth of a shoot towards a light source.",topicTitle:"Plant hormones and tropisms",topicLevel:"SS3",difficulty:"Easy"},
      {id:"extra-waec-07",question:"Which structure in a flower receives pollen grains during pollination?",options:["Stigma","Anther","Filament","Sepal"],answer:"Stigma",explanation:"The stigma is the receptive surface of the carpel on which pollen grains land.",topicTitle:"Plant reproduction",topicLevel:"SS1",difficulty:"Easy"},
      {id:"extra-waec-08",question:"A person develops antibodies after vaccination. The antibodies are produced by",options:["activated B lymphocytes and their plasma-cell descendants","red blood cells","platelets","neurons"],answer:"activated B lymphocytes and their plasma-cell descendants",explanation:"After recognizing an antigen, B cells can differentiate into plasma cells that secrete specific antibodies.",topicTitle:"Immunity",topicLevel:"SS2",difficulty:"Challenging"},
      {id:"extra-waec-09",question:"Which apparatus is most suitable for estimating the frequency of a small plant species in a grassland?",options:["Quadrat","Thermometer","Dissecting needle","Stopwatch alone"],answer:"Quadrat",explanation:"Quadrats sample a defined area and can be used to estimate frequency, density or percentage cover of plants.",topicTitle:"Ecological sampling",topicLevel:"SS1",difficulty:"Medium"},
      {id:"extra-waec-10",question:"Why does the heart have valves between its chambers and at the exits of major arteries?",options:["To prevent backward flow of blood","To make blood cells","To add oxygen to the blood","To produce digestive enzymes"],answer:"To prevent backward flow of blood",explanation:"Valves ensure one-way movement by closing when pressure would otherwise drive blood backwards.",topicTitle:"Human circulation",topicLevel:"SS2",difficulty:"Medium"}
    ],
    NECO: [
      {id:"extra-neco-01",question:"Which part of a nephron filters water and small dissolved substances from blood?",options:["Glomerulus into Bowman's capsule","Collecting duct into the bladder","Ureter into the kidney","Loop of Henle into the urethra"],answer:"Glomerulus into Bowman's capsule",explanation:"High pressure in the glomerulus drives ultrafiltration into Bowman's capsule; cells and most proteins remain in blood.",topicTitle:"Excretion",topicLevel:"SS2",difficulty:"Challenging"},
      {id:"extra-neco-02",question:"A heterozygous tall pea plant (Tt) is crossed with a short plant (tt). If T is dominant, what fraction of offspring is expected to be short?",options:["One half","One quarter","Three quarters","None"],answer:"One half",explanation:"The cross Tt × tt produces expected genotypes Tt and tt in equal proportions.",topicTitle:"Genetics",topicLevel:"SS2",difficulty:"Challenging"},
      {id:"extra-neco-03",question:"Which organism is a decomposer in most terrestrial ecosystems?",options:["A fungus feeding on dead material","A green plant making glucose","A hawk catching live prey","A grasshopper eating leaves"],answer:"A fungus feeding on dead material",explanation:"Decomposers such as fungi and many bacteria break down dead organic matter and recycle nutrients.",topicTitle:"Ecology",topicLevel:"SS1",difficulty:"Easy"},
      {id:"extra-neco-04",question:"Why does a person breathe faster during vigorous exercise?",options:["To supply more oxygen and remove extra carbon dioxide","To stop cellular respiration","To reduce blood flow to muscles","To prevent all heat production"],answer:"To supply more oxygen and remove extra carbon dioxide",explanation:"Working muscles increase respiration, so ventilation rises to support oxygen delivery and carbon dioxide removal.",topicTitle:"Respiration",topicLevel:"SS1",difficulty:"Medium"},
      {id:"extra-neco-05",question:"Which process copies genetic information from DNA into RNA?",options:["Transcription","Translation","Osmosis","Replication of the cell membrane"],answer:"Transcription",explanation:"During transcription, RNA polymerase uses a DNA template to make an RNA molecule.",topicTitle:"Molecular biology",topicLevel:"SS3",difficulty:"Medium"},
      {id:"extra-neco-06",question:"A bacterium becomes resistant to an antibiotic because a resistance gene spreads through a population. This is an example of",options:["natural selection acting on heritable variation","individual bacteria choosing to adapt","photosynthesis","osmosis producing a new organ"],answer:"natural selection acting on heritable variation",explanation:"When resistance is heritable, antibiotic exposure favours resistant bacteria, which survive and reproduce more successfully.",topicTitle:"Evolution and resistance",topicLevel:"SS3",difficulty:"Challenging"},
      {id:"extra-neco-07",question:"Which instrument is used to measure the rate of oxygen uptake by a respiring organism in a simple experiment?",options:["Respirometer","Colorimeter only","Rain gauge","Barometer only"],answer:"Respirometer",explanation:"A respirometer can estimate respiration rate by measuring gas-volume changes, with suitable controls for temperature and pressure.",topicTitle:"Respiration experiments",topicLevel:"SS2",difficulty:"Challenging"},
      {id:"extra-neco-08",question:"Which plant tissue transports water and mineral salts mainly from roots towards leaves?",options:["Xylem","Phloem","Epidermis","Palisade mesophyll"],answer:"Xylem",explanation:"Xylem vessels and tracheids conduct water and dissolved mineral ions from roots through the plant.",topicTitle:"Plant transport",topicLevel:"SS1",difficulty:"Easy"},
      {id:"extra-neco-09",question:"A sudden decrease in a prey population is most likely to affect a predator population by",options:["reducing its food supply","increasing photosynthesis in the predator","turning the predator into a producer","eliminating competition in every habitat"],answer:"reducing its food supply",explanation:"Predators that depend on the prey may face greater competition, lower survival or reduced reproduction when prey becomes scarce.",topicTitle:"Population ecology",topicLevel:"SS3",difficulty:"Medium"},
      {id:"extra-neco-10",question:"Which statement correctly distinguishes vaccination from treatment with ready-made antibodies?",options:["Vaccination stimulates the person's immune response and memory","Vaccination supplies only ready-made antibodies","Both always give identical long-term memory","Ready-made antibodies permanently alter the person's genes"],answer:"Vaccination stimulates the person's immune response and memory",explanation:"Vaccines expose the immune system to an antigen or its instructions, encouraging an active response and memory; passive antibodies act immediately but usually do not create memory.",topicTitle:"Immunology",topicLevel:"SS2",difficulty:"Challenging"}
    ]
  };

  function examQuestions(track, difficulty) {
    const bank = allQuestions();
    let pool;
    if (track === "MIXED") {
      pool = [...bank, ...EXAM_EXTRAS.JAMB, ...EXAM_EXTRAS.WAEC, ...EXAM_EXTRAS.NECO];
    } else {
      const senior = bank.filter(q => ["SS1", "SS2", "SS3"].includes(q.topicLevel));
      const focus = {
        JAMB: ["cell-division", "inheritance", "genetics", "molecular", "human-systems", "human-reproduction", "enzymes", "biological-molecules", "ecology", "photosynthesis", "evolution", "homeostasis"],
        WAEC: ["ecosystem", "ecological", "plant-transport", "transport-in-flowering", "photosynthesis", "human-systems", "nervous", "endocrine", "circulation", "immune", "homeostasis", "plant-hormones", "reproduction"],
        NECO: ["cell-division", "inheritance", "genetics", "osmosis", "diffusion", "enzymes", "microbiology", "ecology", "circulation", "reproduction", "evolution", "biotechnology", "plant-transport"]
      }[track] || [];
      const preferred = senior.filter(q => focus.some(term => `${q.topicTitle} ${q.id}`.toLowerCase().includes(term))).map(q => ({...q, focusTopic: true}));
      const other = senior.filter(q => !preferred.some(item => item.id === q.id)).map(q => ({...q, focusTopic: false}));
      const trackExtras = EXAM_EXTRAS[track].map(q => ({...q, focusTopic: focus.some(term => `${q.topicTitle} ${q.id}`.toLowerCase().includes(term))}));
      pool = [...shuffle(preferred), ...shuffle(other), ...trackExtras];
    }
    const selectedDifficulty = $("#difficultyFilter")?.value || "ALL";
    if (selectedDifficulty !== "ALL") {
      const filtered = pool.filter(q => (q.difficulty || "Medium") === selectedDifficulty);
      if (filtered.length >= examConfig(track).count) return filtered;
      showToast(`Only ${filtered.length} ${selectedDifficulty.toLowerCase()} questions are available for this track. Using all difficulties to complete the exam.`);
    }
    return pool;
  }
  function examConfig(track) {
    if (track === "WAEC" || track === "NECO") return {count: 50, seconds: 3600, label: `${track} Biology`};
    if (track === "JAMB") return {count: 40, seconds: 2400, label: "JAMB UTME Biology"};
    return {count: 40, seconds: 2400, label: "Mixed Biology"};
  }
  function updateExamTrackHelp() {
    const track = $("#examTrack").value;
    const config = examConfig(track);
    $("#examTrackHelp").textContent = `${config.label}: ${config.count} questions, ${config.seconds / 60} minutes in timed mode. These are practice settings and may not match every official examination format.`;
    const timedHelp = $("#timedModeHelp");
    if (timedHelp) timedHelp.textContent = `${config.label}: ${config.seconds / 60} minutes. Submit when finished or when time runs out.`;
  }
  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
    return result;
  }
  function beginQuiz() {
    quizTrack = $("#examTrack").value;
    const config = examConfig(quizTrack);
    const pool = examQuestions(quizTrack);
    if (pool.length < config.count) { showToast(`This track needs ${config.count} questions, but only ${pool.length} are available.`); return; }
    quizMode = $('input[name="quizMode"]:checked').value;
    if (quizTrack !== "MIXED") {
      const preferred = shuffle(pool.filter(q => q.focusTopic));
      const other = shuffle(pool.filter(q => !q.focusTopic));
      const preferredTarget = Math.min(Math.round(config.count * 0.65), preferred.length);
      const chosen = [...preferred.slice(0, preferredTarget), ...other.slice(0, config.count - preferredTarget)];
      if (chosen.length < config.count) chosen.push(...preferred.slice(preferredTarget, preferredTarget + config.count - chosen.length));
      quizQuestions = shuffle(chosen).slice(0, config.count);
    } else {
      quizQuestions = shuffle(pool).slice(0, config.count);
    }
    quizAnswers = {}; quizIndex = 0; quizStart = Date.now(); secondsLeft = config.seconds; quizTimerDuration = config.seconds; topicPracticeActive = false;
    $("#quizSetup").classList.add("hidden"); $("#quizResult").classList.add("hidden"); $("#quizPlay").classList.remove("hidden");
    $("#quizTitle").textContent = `${config.label} · ${config.count} questions`;
    $("#quizTimer").classList.toggle("hidden", quizMode !== "timed");
    $("#submitQuiz").classList.add("hidden"); $("#nextQuestion").classList.remove("hidden"); $("#prevQuestion").classList.remove("hidden");
    clearInterval(timerInterval);
    if (quizMode === "timed") {
      updateTimer();
      timerInterval = setInterval(() => { secondsLeft--; updateTimer(); if (secondsLeft <= 0) submitQuiz(); }, 1000);
    }
    renderQuestion();
  }
  function updateTimer() {
    const min = Math.floor(Math.max(0, secondsLeft) / 60), sec = Math.max(0, secondsLeft) % 60;
    $("#quizTimer").textContent = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  }
  function renderQuestion() {
    const q = quizQuestions[quizIndex];
    if (!q) return;
    $("#questionProgress").textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
    $("#quizProgressFill").style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
    $("#questionArea").innerHTML = `<div class="question-labels"><span class="difficulty-pill difficulty-${String(q.difficulty || "Medium").toLowerCase()}">${escapeHTML(q.difficulty || "Medium")} level</span><span class="question-topic-label">${escapeHTML(q.topicTitle || "Biology")}</span></div><h3 class="question-text">${escapeHTML(q.question)}</h3><div class="answer-options">${q.options.map((option,i) => `<button class="answer-option ${quizAnswers[q.id] === option ? "selected" : ""}" data-answer="${escapeHTML(option)}"><span class="option-key">${String.fromCharCode(65+i)}</span><span>${escapeHTML(option)}</span></button>`).join("")}</div>`;
    $$("#questionArea [data-answer]").forEach(button => button.addEventListener("click", () => { quizAnswers[q.id] = button.dataset.answer; renderQuestion(); }));
    $("#prevQuestion").disabled = quizIndex === 0;
    $("#nextQuestion").classList.toggle("hidden", quizIndex === quizQuestions.length - 1);
    $("#submitQuiz").classList.toggle("hidden", quizIndex !== quizQuestions.length - 1);
  }
  function submitQuiz() {
    clearInterval(timerInterval);
    const correct = quizQuestions.filter(q => quizAnswers[q.id] === q.answer).length;
    const score = Math.round(correct / quizQuestions.length * 100);
    const attempt = {date: new Date().toLocaleDateString(), mode: quizMode, track: topicPracticeActive ? "Topic practice" : examConfig(quizTrack).label, difficulty: topicPracticeActive ? "Topic practice" : ($("#difficultyFilter")?.value || "ALL"), score, correct, total: quizQuestions.length};
    if (!topicPracticeActive) state.history.push(attempt);
    saveState(); renderProgress();
    $("#quizPlay").classList.add("hidden"); $("#quizSetup").classList.add("hidden"); $("#quizResult").classList.remove("hidden");
    const topicCounts = quizQuestions.reduce((counts, q) => { const topic = q.topicTitle || "Other"; counts[topic] = (counts[topic] || 0) + 1; return counts; }, {});
    const difficultyCounts = quizQuestions.reduce((counts, q) => { const level = q.difficulty || "Medium"; counts[level] = (counts[level] || 0) + 1; return counts; }, {});
    const coverageHTML = `<section class="coverage-panel"><h3>Topic coverage in this attempt</h3><p class="coverage-note">This shows what appeared in your practice set; it is not an official exam weighting.</p><div class="coverage-grid">${Object.entries(topicCounts).sort((a,b)=>b[1]-a[1]).map(([topic,count])=>`<div class="coverage-row"><span>${escapeHTML(topic)}</span><strong>${count}</strong></div>`).join("")}</div><h3>Difficulty mix</h3><div class="difficulty-summary">${["Easy","Medium","Challenging"].map(level=>`<span>${level}: <strong>${difficultyCounts[level] || 0}</strong></span>`).join("")}</div></section>`;
    $("#quizResult").innerHTML = `<div class="result-wrap"><div class="score-ring">${score}%</div><h2>${score >= 80 ? "Great work!" : score >= 50 ? "Good effort — keep practising." : "Keep learning. You can improve."}</h2><p><strong>${escapeHTML(topicPracticeActive ? "Topic practice" : examConfig(quizTrack).label)}</strong>: You answered ${correct} of ${quizQuestions.length} questions correctly. Review the explanations below.</p>${coverageHTML}<div class="review-list">${quizQuestions.map((q,i) => { const right = quizAnswers[q.id] === q.answer; return `<article class="review-item"><h4>${i+1}. ${escapeHTML(q.question)}</h4><p class="${right ? "right" : "wrong"}">Your answer: ${escapeHTML(quizAnswers[q.id] || "Not answered")}</p><p class="right">Correct answer: ${escapeHTML(q.answer)}</p><p>${escapeHTML(q.explanation)}</p><p class="muted">Topic: ${escapeHTML(q.topicTitle)} · Difficulty estimate: ${escapeHTML(q.difficulty || "Medium")}</p></article>`; }).join("")}</div><button id="closeResults" class="btn primary full">Back to learning</button></div>`;
    $("#closeResults").addEventListener("click", () => $("#quizDialog").close());
  }
  function closeDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog && dialog.open) dialog.close();
    if (id === "quizDialog") clearInterval(timerInterval);
  }

  $("#levelGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-level]"); if (!button) return;
    selectedLevel = button.dataset.level; renderLevels(); renderTopics();
  });
  $("#topicGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-topic]"); if (!button) return;
    const topic = TOPICS.find(item => item.id === button.dataset.topic); if (topic) openLesson(topic);
  });
  $("#topicSearch").addEventListener("input", renderTopics);
  $("#markComplete").addEventListener("click", () => {
    if (!currentTopic) return;
    if (!state.completed.includes(currentTopic.id)) state.completed.push(currentTopic.id);
    saveState(); renderProgress(); renderTopics(); $("#markComplete").textContent = "Topic completed ✓"; $("#markComplete").disabled = true; showToast("Topic marked as complete.");
  });
  $("#topicPractice").addEventListener("click", () => { if (currentTopic) startTopicPractice(currentTopic); });
  $("#startQuiz").addEventListener("click", startQuizSetup);
  $("#startQuizHero").addEventListener("click", startQuizSetup);
  $("#beginQuiz").addEventListener("click", beginQuiz);
  $("#examTrack").addEventListener("change", updateExamTrackHelp);
  $("#difficultyFilter").addEventListener("change", () => {
    const level = $("#difficultyFilter").value;
    if (level !== "ALL") showToast(`${level} difficulty selected. If the track has too few questions, all levels will be used to complete it.`);
  });
  $("#prevQuestion").addEventListener("click", () => { if (quizIndex > 0) { quizIndex--; renderQuestion(); } });
  $("#nextQuestion").addEventListener("click", () => { if (quizIndex < quizQuestions.length - 1) { quizIndex++; renderQuestion(); } });
  $("#submitQuiz").addEventListener("click", () => {
    const unanswered = quizQuestions.length - Object.keys(quizAnswers).filter(id => quizQuestions.some(q => q.id === id)).length;
    if (unanswered > 0 && !confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
    submitQuiz();
  });
  $("#saveProfile").addEventListener("click", () => {
    state.studentName = $("#studentName").value.trim().slice(0, 60);
    saveState(); renderProgress();
    showToast(state.studentName ? `Profile saved for ${state.studentName}.` : "Local profile name cleared.");
  });
  $("#exportProgress").addEventListener("click", () => {
    const backup = {app: "BioLearn", version: 1, exportedAt: new Date().toISOString(), progress: state, customQuestions: getCustomQuestions()};
    const blob = new Blob([JSON.stringify(backup, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "biolearn-progress-backup.json"; a.click();
    URL.revokeObjectURL(url); showToast("Progress backup exported.");
  });
  $("#importProgressFile").addEventListener("change", async event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text());
      const progress = backup.progress || backup;
      if (!Array.isArray(progress.completed) || !Array.isArray(progress.history)) throw new Error("This file does not look like a BioLearn progress backup.");
      if (!confirm("Import this backup and replace the progress currently saved in this browser?")) return;
      state = {completed: progress.completed.filter(id => TOPICS.some(topic => topic.id === id)), history: progress.history.slice(-500), studentName: String(progress.studentName || "").slice(0,60)};
      saveState();
      if (Array.isArray(backup.customQuestions)) localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(backup.customQuestions));
      renderAll(); showToast("BioLearn progress backup imported.");
    } catch (error) { showToast(error.message || "Could not import this file."); }
    finally { event.target.value = ""; }
  });
  $("#resetProgress").addEventListener("click", () => {
    if (!confirm("Reset completed topics and quiz history on this device?")) return;
    state = {completed: [], history: [], studentName: state.studentName || ""}; saveState(); renderProgress(); renderTopics(); showToast("Progress reset.");
  });
  $$("[data-close]").forEach(button => button.addEventListener("click", () => closeDialog(button.dataset.close)));
  $("#lessonDialog").addEventListener("click", event => { if (event.target === $("#lessonDialog")) closeDialog("lessonDialog"); });
  $("#quizDialog").addEventListener("close", () => clearInterval(timerInterval));
  $("#menuBtn").addEventListener("click", () => {
    const nav = $("#mainNav"); const open = nav.classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", String(open));
  });
  $("#mainNav").addEventListener("click", event => { if (event.target.closest("a")) $("#mainNav").classList.remove("open"); });
  renderAll();

  // Optional PWA service worker registration; works when hosted on HTTPS or localhost.
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(err => console.info("Offline mode unavailable:", err)));
  }
})();