let TossBtn = document.getElementById("tossBtn");

let Team1Name = document.querySelector("#name1");
let Team2Name = document.querySelector("#name2");
let TossWinn = document.querySelector("#showTossWin");

function validateName() {
  if (Team1Name.value == "") {
    Team1Name.focus();
    alert("Please Enter the Team 1 Name..!!");
  } else if (Team2Name.value == "") {
    Team2Name.focus();
    alert("Please Enter the Team 2 Name..!!");
  }else if(Team1Name.value==Team2Name.value){
    alert("Team Name can't be Same..!!");
  } else if (!isNaN(Team1Name.value) || !isNaN(Team2Name.value)) {
    alert("Numbers are not allowed");
  } else {
    Toss();
  }
}

function Toss() {
  let random = Math.floor(Math.random() * 2);
  let TossWinningTeam;

  if (random == 0) {
    TossWinn.innerText = `${Team1Name.value} Won The Toss`;
    TossWinningTeam = Team1Name.value;
    localStorage.setItem("Tosswinn", TossWinningTeam);
  } else {
    TossWinn.innerText = `${Team2Name.value} Won The Toss`;
    TossWinningTeam = Team2Name.value;
    localStorage.setItem("Tosswinn", TossWinningTeam);
  }

  setTimeout(() => {
    window.location = "./HTML/TeamSelection2.html";
  }, 2000);
}

TossBtn.addEventListener("click", () => {
  validateName();
  localStorage.setItem("TeamA", Team1Name.value);
  localStorage.setItem("TeamB", Team2Name.value);
});