(() => {
"use strict";
const KEY = "biolearn-custom-questions-v1";
const $ = s => document.querySelector(s);
const topics = Array.isArray(window.BIO_TOPICS) ? window.BIO_TOPICS : [];
let questions = readQuestions();
let editingId = null;
function readQuestions() {
  try { const v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v : []; }
  catch (_) { return []; }
}
function save() { localStorage.setItem(KEY, JSON.stringify(questions)); render(); }
function esc(v) { return String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function toast(msg) { const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2400); }
function fillTopics() {
  $("#topic").innerHTML = topics.map(t=>`<option value="${esc(t.id)}">${esc(t.level)} — ${esc(t.title)}</option>`).join("");
}
function clearForm() { editingId=null; $("#questionForm").reset(); $("#formHeading").textContent="Add a question"; $("#saveQuestion").textContent="Save question"; }
function render() {
  const term=$("#searchQuestions").value.trim().toLowerCase();
  const visible=questions.filter(q=>`${q.question} ${q.topicTitle} ${q.explanation}`.toLowerCase().includes(term));
  $("#questionCount").textContent=`${questions.length} custom question${questions.length===1?"":"s"} saved on this device`;
  $("#questionList").innerHTML=visible.length ? visible.map(q=>`<article class="admin-question"><div><strong>${esc(q.question)}</strong><p>${esc(q.topicTitle)} · ${esc(q.difficulty)} · Answer: ${esc(q.answer)}</p><p>${esc(q.explanation)}</p></div><div class="admin-question-actions"><button data-edit="${esc(q.id)}" type="button">Edit</button><button data-delete="${esc(q.id)}" type="button">Delete</button></div></article>`).join("") : '<p class="muted">No custom questions yet. Add one above or import a reviewed JSON file.</p>';
}
function collect() {
  const topic=topics.find(t=>t.id===$("#topic").value);
  if (!topic) throw new Error("Choose a valid topic.");
  const options=[$("#optionA").value.trim(),$("#optionB").value.trim(),$("#optionC").value.trim(),$("#optionD").value.trim()];
  if (options.some(v=>!v) || new Set(options.map(v=>v.toLowerCase())).size!==4) throw new Error("Enter four different, non-empty answer options.");
  const answer=options[Number($("#answer").value)];
  return {id:editingId || `custom-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,topicId:topic.id,topicTitle:topic.title,topicLevel:topic.level,question:$("#question").value.trim(),options,answer,explanation:$("#explanation").value.trim(),difficulty:$("#difficulty").value};
}
$("#questionForm").addEventListener("submit",e=>{
  e.preventDefault();
  try {
    const q=collect(); if(!q.question || !q.explanation) throw new Error("Write both a question and an explanation.");
    if(editingId) questions=questions.map(old=>old.id===editingId?q:old); else questions.push(q);
    save(); clearForm(); toast("Question saved. It can now appear in practice quizzes.");
  } catch(err) { toast(err.message); }
});
$("#cancelEdit").addEventListener("click",clearForm);
$("#searchQuestions").addEventListener("input",render);
$("#questionList").addEventListener("click",e=>{
  const edit=e.target.closest("[data-edit]"); const del=e.target.closest("[data-delete]");
  if(edit) {
    const q=questions.find(x=>x.id===edit.dataset.edit); if(!q) return;
    editingId=q.id; $("#topic").value=q.topicId; $("#question").value=q.question;
    ["A","B","C","D"].forEach((letter,i)=>$("#option"+letter).value=q.options[i]);
    $("#answer").value=String(q.options.indexOf(q.answer)); $("#explanation").value=q.explanation;
    $("#difficulty").value=q.difficulty||"Medium"; $("#formHeading").textContent="Edit question"; $("#saveQuestion").textContent="Update question";
    window.scrollTo({top:0,behavior:"smooth"});
  }
  if(del && confirm("Delete this custom question?")) { questions=questions.filter(x=>x.id!==del.dataset.delete); save(); toast("Question deleted."); }
});
$("#exportQuestions").addEventListener("click",()=>{
  const blob=new Blob([JSON.stringify(questions,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="biolearn-custom-questions.json";a.click();URL.revokeObjectURL(url);toast("Question bank exported.");
});
$("#importQuestions").addEventListener("change",async e=>{
  const f=e.target.files&&e.target.files[0];if(!f)return;
  try {
    const data=JSON.parse(await f.text());if(!Array.isArray(data))throw new Error("JSON file must contain an array of questions.");
    const valid=data.filter(q=>q&&typeof q.question==="string"&&Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.answer)&&typeof q.explanation==="string"&&topics.some(t=>t.id===q.topicId));
    if(!valid.length)throw new Error("No valid questions found. Check topicId, options, answer and explanation.");
    const map=new Map(questions.map(q=>[q.id,q]));valid.forEach(q=>map.set(String(q.id||`import-${Date.now()}-${Math.random()}`),{...q,id:String(q.id||`import-${Date.now()}-${Math.random()}`)}));
    questions=[...map.values()];save();toast(`Imported ${valid.length} reviewed questions.`);
  } catch(err) { toast(err.message||"Import failed."); }
  finally { e.target.value=""; }
});
fillTopics();render();
})();