'use strict';
(() => {
 const links=[...document.querySelectorAll('.phrase-audio')];
 const status=document.querySelector('#phrase-status');
 const stop=document.querySelector('#stop-phrase-audio');
 const synth=window.speechSynthesis;
 let voice=null,failed=false,generation=0;
 function resetLinks(){
  for(const link of links){
   link.textContent=voice?'Listen':'Hear online ↗';
   link.setAttribute('aria-label',`${voice?'Listen to':'Hear'} ${link.dataset.english} in Khmer${voice?'':' online'}`);
   if(voice)link.setAttribute('role','button');else link.removeAttribute('role');
  }
 }
 function updateVoice(){
  if(!synth||failed)return;
  try{
   const voices=synth.getVoices().filter(v=>/^km(?:[-_]|$)/i.test(v.lang));
   voice=voices.find(v=>v.localService)||voices[0]||null;
  }catch{voice=null;}
  resetLinks();
 }
 function stopAudio(message=''){
  generation++;
  if(synth)synth.cancel();
  stop.hidden=true;resetLinks();status.textContent=message;
 }
 for(const link of links){
  link.addEventListener('click',event=>{
   // Preserve the real listening link when no Khmer voice is available.
   if(!voice||!synth||!window.SpeechSynthesisUtterance)return;
   event.preventDefault();
   stopAudio();const token=generation;
   const text=link.closest('.phrase-card').querySelector('.phrase-khmer').textContent;
   const utterance=new SpeechSynthesisUtterance(text);
   utterance.lang=voice.lang;utterance.voice=voice;utterance.rate=.8;
   utterance.onstart=()=>{if(token!==generation)return;link.textContent='Playing…';stop.hidden=false;status.textContent='Playing: '+link.dataset.english;};
   utterance.onend=()=>{if(token===generation){stop.hidden=true;resetLinks();status.textContent='';}};
   utterance.onerror=event=>{
    if(token!==generation||event.error==='canceled'||event.error==='interrupted')return;
    failed=true;voice=null;stop.hidden=true;resetLinks();status.textContent='Audio could not play on this device. Use Hear online to listen in Google Translate.';
   };
   try{synth.speak(utterance);}catch{
    failed=true;voice=null;stop.hidden=true;resetLinks();status.textContent='Use Hear online to listen in Google Translate.';
   }
  });
  link.addEventListener('keydown',event=>{if(voice&&event.key===' '){event.preventDefault();link.click();}});
 }
 stop.addEventListener('click',()=>stopAudio('Audio stopped.'));
 window.addEventListener('pagehide',()=>stopAudio());
 if(synth&&window.SpeechSynthesisUtterance){updateVoice();synth.addEventListener('voiceschanged',updateVoice);}
})();
