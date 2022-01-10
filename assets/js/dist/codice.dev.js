"use strict";

//dichiaro le variabili 
var btn_task = document.getElementById("btn_task");
var elenco_task = document.getElementById("lista_task");
var removeBtn = document.getElementsByClassName("remove-btn");
var campotask = document.getElementById("campotask");
var arrayTask = [];
var task_done = document.getElementById("task_done");
var taskDoneArray = []; //al caricamento della pagina chiamo la funzione init 

window.addEventListener("load", init);

function init() {
  //aggancio alle variabili gli oggetti html 
  btn_task = document.querySelector("#btn_task");
  elenco_task = document.querySelector("#lista_task");
  campotask = document.querySelector("#campotask"); //chiamo le due funzioni 

  checkData();
  eventHandlers();
} //associo tramite addEventListener la funzione al click del bottone


function eventHandlers() {
  btn_task.addEventListener("click", addtask);
} //funzione per aggiungere task


function addtask() {
  if (campotask.value == "") {
    alert("scrivere almeno un task");
  } else {
    arrayTask.push(campotask.value);
    buildList();
    saveData();
    clearForms();
  }
} //funzione per controllare gli item dallo storage locale e splittarli con una virgola


function checkData() {
  if (localStorage.getItem('task')) {
    arrayTask = localStorage.getItem('task').split(",");
  }
} //funzione per costruire la lista tramite array


function buildList() {
  var list = "";

  for (var i = 0; i < arrayTask.length; i++) {
    list += "<li id='item' class='list-group-item d-flex justify-content-between align-items-center'>" + ' - ' + arrayTask[i] + "<div class='btn-group align-self-md-center'>" + '<button onclick="completeTask(' + i + ')" id="btn" class="btn-md success-btn badge rounded-pill bg-success pointer"> &check; </button>' + '<button onclick="removetask(' + i + ')" class="btn-md remove-btn badge rounded-pill bg-danger pointer">X</button></div></li>';
  }

  elenco_task.innerHTML = list;
  taskCount();
} //funzione per settare l'item in locale con localStorage


function saveData() {
  localStorage.setItem('task', arrayTask);
}

function resetList() {
  localStorage.clear('task');
  window.location.href = window.location.href;
} //funzione per pulire il campo input


function clearForms() {
  campotask.value = '';
} //funzione per rimuovere l'elemento selezionato, salva i dati e ricostruisce la lista


function removetask(id) {
  arrayTask.splice(id, 1);
  localStorage.clear('task');
  saveData();
  buildList();
  taskCount();
} //funzione per contare task eliminati 


function taskCount() {
  var parCount = document.getElementById("task_count");
  var task_done = document.getElementById("task_done");

  if (arrayTask.length < 1) {
    parCount.innerHTML = "<span> nessun task in elenco </span>";
    task_done.innerHTML = "<span> nessun task completato in elenco </span>";
  } else {
    parCount.innerHTML = "<span> aggiunti: " + arrayTask.length + "</span>";
  }
} //funzione per contare task completati 


function completeTask() {
  taskDoneArray++;
  var task_done = document.getElementById("task_done");
  task_done.innerHTML = "<span> completati: " + taskDoneArray + "</span>";
  var btn = document.getElementById("btn");
  btn.remove();
} //funzione per salvare in PDF o stampare


function printOrSave() {
  window.print();
}