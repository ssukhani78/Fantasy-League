import { PlayerInfo as PlayersData } from "./Playerdata.js";
// console.log(PlayersData)

// Toss Win Title area targeted
let tossWinnerTitle = document.querySelector("#TossWinnerInfo");

// Stores the Name of the team
let teamAName = localStorage.getItem("TeamA");
let teamBName = localStorage.getItem("TeamB");

let tossWinner = localStorage.getItem("Tosswinn"); // store

// Name Displayer element inside the Team Box
let teamATitle = document.querySelector("#teamA_selection h4");
let teamBTitle = document.querySelector("#teamB_selection h4");

// Make Team Btns
let makeTeamBtnTeamA = document.querySelector("#TeamAbtn");
let makeTeamBtnTeamB = document.querySelector("#TeamBbtn");

// Start Game Btn
let startGameBtn = document.querySelector("#startMatchBtn");

tossWinnerTitle.innerHTML = `<b>${tossWinner} WON THE TOSS (Toss winner Select's Team First)</b>`;

setTimeout(() => {
  tossWinnerTitle.innerText = "";
}, 3000);

let teamAPlayers = [];
let teamBPlayers = [];

let teamAListElement = document.getElementById("TeamA"); // Selection Box Of team A
let teamBListElement = document.getElementById("TeamB"); // Selection Box of team B

// counter for both the team
let teamACount = 0;
let teamBCount = 0;

// variable for deciding where to add the selected player first
let isTeamAEnabled = false;
let isTeamBEnabled = false;

let PlayStartA = false;
let PlayStartB = false;

let dropdownCaptainTeamA = document.querySelector("#captainA");
let dropdownCaptainTeamB = document.querySelector("#captainB");
let dropdownViceCaptainTeamA = document.querySelector("#Vice-CaptainA");
let dropdownViceCaptainTeamB = document.querySelector("#Vice-CaptainB");

let teamABowlerCount = 0,
  teamABatterCount = 0,
  teamAWicketKeeperCount = 0;
let teamBBowlerCount = 0,
  teamBBatterCount = 0,
  teamBWicketKeeperCount = 0;

let teamACaptain, teamBCaptain;
let teamAViceCaptain, teamBViceCaptain;

let totalCreditMessage = document.querySelector("#totCredit");
let remainingCreditMessage = document.querySelector("#remCredit");
let batterMessage = document.querySelector("#selectedBatter");
let bowlerMessage = document.querySelector("#selectedBowler");
let wicketKeeperMessage = document.querySelector("#selectedWk");
let totalPlayersMessage = document.querySelector("#totPlay");
let turnMessage = document.querySelector("#Note");
let successMessage = document.querySelector("#success");

const totalCredit = 100;
let remainingCredit = 100;

totalCreditMessage.innerText += ` ${totalCredit}`;
remainingCreditMessage.innerText += ` ${remainingCredit}`;
// let teamAName_Final = false;

if (tossWinner == teamAName) {
  isTeamAEnabled = true;
  makeTeamBtnTeamB.disabled = true;
  makeTeamBtnTeamB.style.opacity = 0.6;
} else if (tossWinner == teamBName) {
  isTeamBEnabled = true;
  makeTeamBtnTeamA.disabled = true;
  makeTeamBtnTeamA.style.opacity = 0.6;
}

turnMessage.innerText = `${tossWinner} Status :- `;

teamATitle.innerText = `${teamAName}'s Team`;
teamBTitle.innerText = `${teamBName}'s Team`;

let batterList = document.querySelector("#batterList");
let bowlerList = document.querySelector("#bowlerList");
let wicketKeeperList = document.querySelector("#WKList");

// Show data
for (const player of PlayersData) {
  let li = document.createElement("li");
  li.innerText = `${player.name} - (${player.credit})`;
  li.classList.add(player.playingRole);
  li.setAttribute("data-credit", player.credit);
  li.setAttribute("data-Name", player.name);

  if (player.playingRole == "Batsman") {
    batterList.append(li);
  } else if (player.playingRole == "Bowler") {
    bowlerList.append(li);
  } else if (player.playingRole == "Wicketkeeper") {
    wicketKeeperList.append(li);
  }
}

let lists = document.querySelectorAll("li");

for (const list of lists) {
  list.addEventListener("click", () => {
    handlePlayerSelection(list);
  });
}

function handlePlayerSelection(li) {
  if (isTeamAEnabled) {
    // console.dir(li);
    let playerRole = li.classList[0];

    if (li.parentNode.id == "TeamA") {
      let obj = removePlayerFromTeam(
        li,
        playerRole,
        teamABowlerCount,
        teamABatterCount,
        teamAWicketKeeperCount,
        teamAPlayers
      );
      // Destructuring
      let {
        BatterCount: bats_count,
        BowlerCount: bowl_count,
        WicketKeeperCount: wkCount,
      } = obj;

      teamABatterCount = bats_count;
      teamABowlerCount = bowl_count;
      teamAWicketKeeperCount = wkCount;

      teamACount--;
      alert(`Remaining players in A ${teamACount}`);
    } else {
      let obj = validateAndAddPlayer(
        li,
        playerRole,
        teamABowlerCount,
        teamABatterCount,
        teamAWicketKeeperCount,
        teamAListElement,
        teamAPlayers
      );
      if (obj == undefined) {
        return;
      }
      // Destructuring
      let {
        BatterCount: bats_count,
        BowlerCount: bowl_count,
        WicketkeeperCount: wkCount,
      } = obj;

      teamABatterCount = bats_count;
      teamABowlerCount = bowl_count;
      teamAWicketKeeperCount = wkCount;

      teamACount++;
    }
  } else if (isTeamBEnabled) {
    let playerRole = li.classList[0];
    console.dir(li);
    if (li.parentNode.id == "TeamB") {
      // alert("Inside popper");
      let obj = removePlayerFromTeam(
        li,
        playerRole,
        teamBBowlerCount,
        teamBBatterCount,
        teamBWicketKeeperCount,
        teamBPlayers
      );
      // Destructuring
      let {
        BatterCount: bats_count,
        BowlerCount: bowl_count,
        WicketKeeperCount: wkCount,
      } = obj;

      teamBBatterCount = bats_count;
      teamBBowlerCount = bowl_count;
      teamBWicketKeeperCount = wkCount;

      teamBCount--;
      // alert(`Remaining players in B ${teamBCount}`);
    } else {
      let obj = validateAndAddPlayer(
        li,
        playerRole,
        teamBBowlerCount,
        teamBBatterCount,
        teamBWicketKeeperCount,
        teamBListElement,
        teamBPlayers
      );
      if (obj == undefined) {
        return;
      }
      // Destructuring
      let {
        BatterCount: bats_count,
        BowlerCount: bowl_count,
        WicketkeeperCount: wkCount,
      } = obj;

      teamBBatterCount = bats_count;
      teamBBowlerCount = bowl_count;
      teamBWicketKeeperCount = wkCount;

      teamBCount++;
    }
  }
}

function validateAndAddPlayer(li,playerRole,bowlerCount,batterCount,wicketKeeperCount,teamList,teamPlayersArr) {
  if (playerRole == "Bowler" && bowlerCount == 5) {
    alert("Bowler Cannot be More Than 5");
    return;
  } else if (playerRole == "Batsman" && batterCount == 5) {
    alert("Batsman Cannot be More Than 5");
    return;
  } else if (playerRole == "Wicketkeeper" && wicketKeeperCount == 1) {
    alert("Wicket Keeper cannot be more than 1");
    return;
  }

  return addPlayerToTeam(li,playerRole,bowlerCount,batterCount,wicketKeeperCount,teamList,teamPlayersArr);
}

function addPlayerToTeam(li,playerRole,BowlerCount,BatterCount,WicketkeeperCount,teamList,teamArr) {
  let playerCredit = parseInt(li.getAttribute("data-credit"));

  if (remainingCredit >= playerCredit) {
    remainingCredit -= playerCredit;
    if (playerRole == "Bowler" && BowlerCount < 5) {
      BowlerCount++;
      teamList.append(li);
    } else if (playerRole == "Batsman" && BatterCount < 5) {
      BatterCount++;
      teamList.append(li);
    } else if (playerRole == "Wicketkeeper" && WicketkeeperCount < 1) {
      WicketkeeperCount++;
      teamList.append(li);
    }

    teamArr.push(li.getAttribute("data-Name"));
    updateCaptainAndKeeperDropdowns();

    updateTeamMessage(
      remainingCredit,
      BatterCount,
      BowlerCount,
      WicketkeeperCount
    );

    return { BatterCount, BowlerCount, WicketkeeperCount };
  } else {
    alert(
      `${li.getAttribute(
        "data-Name"
      )} can't be Added !! Insufficient Credit Point..!!`
    );
  }
}

function removePlayerFromTeam(li,playerRole,BowlerCount,BatterCount,WicketKeeperCount,teamArr){
  let playerCredit = parseInt(li.getAttribute("data-credit"));
  remainingCredit += playerCredit;
  let i = teamArr.indexOf(li.getAttribute("data-Name"));

  if (playerRole == "Bowler") {
    teamArr.splice(i, 1);
    BowlerCount--;
    bowlerList.append(li);
  } else if (playerRole == "Batsman") {
    teamArr.splice(i, 1);
    BatterCount--;
    batterList.append(li);
  } else if (playerRole == "Wicketkeeper") {
    teamArr.splice(i, 1);
    WicketKeeperCount--;
    wicketKeeperList.append(li);
  }

  console.log(teamArr);

  updateTeamMessage(remainingCredit,BatterCount,BowlerCount,WicketKeeperCount);

  updateCaptainAndKeeperDropdowns();
  return { BatterCount, BowlerCount, WicketKeeperCount };
}

function updateCaptainAndKeeperDropdowns() {
  if (isTeamAEnabled) {
    dropdownCaptainTeamA.innerHTML = "";
    dropdownViceCaptainTeamA.innerHTML = "";
  } else if (isTeamBEnabled) {
    dropdownCaptainTeamB.innerHTML = "";
    dropdownViceCaptainTeamB.innerHTML = "";
  }

  console.log(teamAPlayers);
  console.log(teamBPlayers);

  for (let player of teamAPlayers) {
    showPlayerInDropDown(player,dropdownCaptainTeamA,dropdownViceCaptainTeamA);
  }

  for (let player of teamBPlayers) {
    showPlayerInDropDown(player,dropdownCaptainTeamB,dropdownViceCaptainTeamB);
  }
}

makeTeamBtnTeamA.addEventListener("click", () => {
  if (tossWinner == teamAName && teamAPlayers.length == 11) {
    teamACaptain = dropdownCaptainTeamA.value;
    teamAViceCaptain = dropdownViceCaptainTeamA.value;

    if (MakeCaptainAndViceCaptain(teamACaptain, teamAViceCaptain)) {
      isTeamAEnabled = false;
      isTeamBEnabled = true;

      turnMessage.innerText = `${teamBName} Status :- `;
      remainingCredit = 100;

      successMessage.innerText = `${teamAName} team Successfully Created..!! Please wait Another Team Status Loading...`;
      setTimeout(() => {
        successMessage.innerText = "";
      }, 3000);

      setTimeout(() => {
        updateTeamMessage(
          remainingCredit,
          teamBBatterCount,
          teamBBowlerCount,
          teamBWicketKeeperCount
        );
      }, 3000);

      teamAListElement.style.pointerEvents = "none";
      document.querySelector("#teamA_selection").style.opacity = 0.5;

      makeTeamBtnTeamA.style.pointerEvents = "none";
      makeTeamBtnTeamA.style.opacity = 0.5;

      dropdownCaptainTeamA.style.pointerEvents = "none";
      dropdownCaptainTeamA.style.opacity = 0.5;

      dropdownViceCaptainTeamA.style.pointerEvents = "none";
      dropdownViceCaptainTeamA.style.opacity = 0.5;

      PlayStartA = true;

      makeTeamBtnTeamB.disabled = false;
      makeTeamBtnTeamB.style.opacity = 1;
    }
  } else if (teamAPlayers.length == 11 && teamBPlayers.length == 11) {
    teamACaptain = dropdownCaptainTeamA.value;
    teamAViceCaptain = dropdownViceCaptainTeamA.value;

    if (MakeCaptainAndViceCaptain(teamACaptain, teamAViceCaptain)) {
      successMessage.innerText = `${teamAName} team Successfully Created..!`;

      setTimeout(() => {
        successMessage.innerText = "";
      }, 3000);

      teamAListElement.style.pointerEvents = "none";
      document.querySelector("#teamA_selection").style.opacity = 0.5;

      makeTeamBtnTeamA.style.pointerEvents = "none";
      makeTeamBtnTeamA.style.opacity = 0.5;

      dropdownCaptainTeamA.style.pointerEvents = "none";
      dropdownCaptainTeamA.style.opacity = 0.5;

      dropdownViceCaptainTeamA.style.pointerEvents = "none";
      dropdownViceCaptainTeamA.style.opacity = 0.5;

      isTeamBEnabled = false;
      isTeamAEnabled = false;

      PlayStartA = true;
    }
  } else if (teamAPlayers.length != 11) {
    alert("Select your Team First...!!");
  } else if (tossWinner != teamAName) {
    alert("Itz Not your turn to choose & make Team..!!");
    return;
  } else if (tossWinner == teamAName && teamAPlayers.length != 11) {
    alert("Select your Team First...!!");
  }
});

makeTeamBtnTeamB.addEventListener("click", () => {

  if (tossWinner == teamBName && teamBPlayers.length == 11) {
    teamBCaptain = dropdownCaptainTeamB.value;
    teamBViceCaptain = dropdownViceCaptainTeamB.value;

    if (MakeCaptainAndViceCaptain(teamBCaptain, teamBViceCaptain)) {
      isTeamBEnabled = false;
      isTeamAEnabled = true;

      turnMessage.innerText = `${teamAName} Status :- `;
      remainingCredit = 100;

      successMessage.innerText = `${teamBName} team Successfully Created..!! Please wait Another Team Status Loading...`;
      setTimeout(() => {
        successMessage.innerText = "";
      }, 3000);

      setTimeout(() => {
        updateTeamMessage(
          remainingCredit,
          teamABatterCount,
          teamABowlerCount,
          teamAWicketKeeperCount
        );
      }, 3000);

      teamBListElement.style.pointerEvents = "none";
      document.querySelector("#teamB_selection").style.opacity = 0.5;

      makeTeamBtnTeamB.style.pointerEvents = "none";
      makeTeamBtnTeamB.style.opacity = 0.5;

      dropdownCaptainTeamB.style.pointerEvents = "none";
      dropdownCaptainTeamB.style.opacity = 0.5;

      dropdownViceCaptainTeamB.style.pointerEvents = "none";
      dropdownViceCaptainTeamB.style.opacity = 0.5;

      PlayStartB = true;

      makeTeamBtnTeamA.disabled = false;
      makeTeamBtnTeamA.style.opacity = 1;
    }
  } else if (teamAPlayers.length == 11 && teamBPlayers.length == 11) {
    teamBCaptain = dropdownCaptainTeamB.value;
    teamBViceCaptain = dropdownViceCaptainTeamB.value;

    if (MakeCaptainAndViceCaptain(teamBCaptain, teamBViceCaptain)) {
      successMessage.innerText = `${teamBName} team Successfully Created..!`;
      setTimeout(() => {
        successMessage.innerText = "";
      }, 3000);

      teamBListElement.style.pointerEvents = "none";
      document.querySelector("#teamB_selection").style.opacity = 0.5;

      makeTeamBtnTeamB.style.pointerEvents = "none";
      makeTeamBtnTeamB.style.opacity = 0.5;

      dropdownCaptainTeamB.style.pointerEvents = "none";
      dropdownCaptainTeamB.style.opacity = 0.5;

      dropdownViceCaptainTeamB.style.pointerEvents = "none";
      dropdownViceCaptainTeamB.style.opacity = 0.5;

      isTeamBEnabled = false;
      isTeamAEnabled = false;

      PlayStartB = true;
    }
  } else if (teamAPlayers.length != 11) {
    alert("Select your Team First...!!");
  } else if (tossWinner != teamBName) {
    alert("Itz Not your turn to choose & make Team..!!");
    return;
  } else if (tossWinner == teamBName && teamBPlayers.length != 11) {
    alert("Select your Team First...!!");
  }
});

function updateTeamMessage(
  remainingCredit,
  BatterCount,
  BowlerCount,
  WicketKeeperCount
) {
  remainingCreditMessage.innerText = `Remaining Credit :- ${remainingCredit}`;
  batterMessage.innerText = `Selected Batters :- ${BatterCount}`;
  bowlerMessage.innerText = `Selected Bowlers :- ${BowlerCount}`;
  wicketKeeperMessage.innerText = `Selected Wicketkeeper :- ${WicketKeeperCount}`;
  totalPlayersMessage.innerText = `Total Players :- ${
    BatterCount + BowlerCount + WicketKeeperCount
  }`;
}

function MakeCaptainAndViceCaptain(captain, viceCaptain) {
  if (captain == viceCaptain) {
    alert("Both Captain and Vice-Captain Can't be Same");
    return false;
  }
  return true;
}

let FinalTeamA = [];
let FinalTeamB = [];

startGameBtn.addEventListener("click", () => {
  if (PlayStartA && PlayStartB) {
    let listsInA = document.querySelectorAll("#TeamA li");

    for (const playerSelected of listsInA) {
      let playerName = playerSelected.getAttribute("data-name");
      for (const play of PlayersData) {
        if (playerName == play.name) {
          if (playerName == teamACaptain) {
            play.Captain = true;
          } else if (playerName == teamAViceCaptain) {
            play.viceCaptain = true;
          }
          FinalTeamA.push(play);
          break;
        }
      }
    }
    let listsInB = document.querySelectorAll("#TeamB li");

    for (const playerSelected of listsInB) {
      let playerName = playerSelected.getAttribute("data-name");
      for (const play of PlayersData) {
        if (playerName == play.name) {
          if (playerName == teamBCaptain) {
            play.Captain = true;
          } else if (playerName == teamBViceCaptain) {
            play.viceCaptain = true;
          }
          FinalTeamB.push(play);
          break;
        }
      }
    }
    localStorage.setItem("TeamA_data", JSON.stringify(FinalTeamA));
    localStorage.setItem("TeamB_data", JSON.stringify(FinalTeamB));

    startGameBtn.style.display = "none";
    document.querySelector("#GameStartMess").innerText =
      "Game is Starting Please Wait......";
    setTimeout(() => {
      window.location = "./MatchStart3.html";
    }, 3000);
  } else {
    alert("First Make Your Teams..!!");
  }
});

function showPlayerInDropDown(player,CaptainDropDown,ViceCaptainDropDown){
  let newOptionCaptain = document.createElement("option");
    let newOptionVc = document.createElement("option");
    newOptionCaptain.value = player;
    newOptionCaptain.textContent = player;

    newOptionVc.value = player;
    newOptionVc.textContent = player;

    CaptainDropDown.append(newOptionCaptain);
    ViceCaptainDropDown.append(newOptionVc);
}