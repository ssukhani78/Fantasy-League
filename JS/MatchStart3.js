// Get Name from Local Storage..!!
let teamAName = localStorage.getItem("TeamA");
let teamBName = localStorage.getItem("TeamB");

// Get Both Team Selected Data..!!
let teamAData = JSON.parse(localStorage.getItem("TeamA_data"));
let teamBData = JSON.parse(localStorage.getItem("TeamB_data"));

// Targeting to the Team Head Display...!!
let teamATitle = document.querySelector("#TeamADetail h3");
let teamBTitle = document.querySelector("#TeamBDetail h3");

// Targeting to the UL of Team A and Team B..!!
let teamAList = document.querySelector("#ListA");
let teamBList = document.querySelector("#ListB");

// let teamBAllList = document.querySelector("#ListB li");

//In Match Status Targeting the Bowling and Batting Team Displayer...!!
let BattingTeamHeader = document.querySelector("#battingInfo .header");
let BowlingTeamHeader = document.querySelector("#bowlingInfo .header");

let ScoreBoardTable = document.querySelector("#showInfo");

// Targeting to the Team A and Team B Score Board and Fantasy Point...!!
let TeamAScoreBoard = document.querySelector("#TeamADetail .score b #run");
let TeamAWicketBoard = document.querySelector("#TeamADetail .score b #wicket");
let TeamAFantasyBoard = document.querySelector("#TeamADetail .points b");

let TeamBScoreBoard = document.querySelector("#TeamBDetail .score b #run");
let TeamBWicketBoard = document.querySelector("#TeamBDetail .score b #wicket");
let TeamBFantasyBoard = document.querySelector("#TeamBDetail .points b");

// Targeting the are which shows the OVER completed....!!
let OverShowArea = document.querySelector("#OverShow .show");

// Targeting the Hit Button
let hitBtn = document.querySelector("#hitBtn");

let showBallTime = document.querySelector("#ShowTimer");

// Targeting the current Over Ball Display Area.
let currOversArea = document.querySelector(".currentOver_runs");

// Targeting to the Batsman And Bowler Table Td's
let BattingTable = document.querySelectorAll("#BatsmanTable td");
let BowlingTable = document.querySelectorAll("#BowlerTable td");

// getting the Toss Winner
let tossWinner = localStorage.getItem("Tosswinn");
let bowlingTeam = teamAName; // Assuming

// if Toss Winner is TeamA then Bowling team is TeamB
if (tossWinner == teamAName) {
  bowlingTeam = teamBName;
}

// Setting team Heading
teamATitle.innerText = `${teamAName}`;
teamBTitle.innerText = `${teamBName}`;

// Sort the Team :- Where Sequence is BATTER,WK,BOWLER
function sortPlayerByRole(teamData){  
  let sortingOrder ={Batsman : 1, Wicketkeeper: 2 , Bowler : 3};

  return teamData.sort((player1,player2)=>{
    return sortingOrder[player1.playingRole]-sortingOrder[player2.playingRole];
  })
}

teamAData = sortPlayerByRole(teamAData);
teamBData = sortPlayerByRole(teamBData);

console.log(teamAData);
console.log(teamBData);

// Targeting the Match Status Area
let matchInfo = document.querySelector("header h3");

matchInfo.innerText = `${tossWinner} won the toss and chose to bat first...!!`;

setTimeout(() => {
  BattingTeamHeader.innerHTML = `<b>Batting Team :-</b> ${tossWinner} <hr>`;
  BowlingTeamHeader.innerHTML = `<b>Bowling Team :- </b> ${bowlingTeam} <hr>`;
}, 2000);

setTimeout(() => {
  matchInfo.innerText = "Players on the ground...!!";
}, 4000);

setTimeout(() => {
  matchInfo.innerText = `Match Status :- `;
  matchInfo.style.color = "#1a52e3";
}, 6000);

setTimeout(() => {
  hitBtn.disabled = false;
}, 7000); // 7sec

// Displaying team A and B players
for (const player of teamAData) {
  displayPlayerWithRole(player, teamAList);
}

for (const player of teamBData) {
  displayPlayerWithRole(player, teamBList);
}

function displayPlayerWithRole(player, Team) {
  let listItem = document.createElement("li");
  listItem.innerHTML = `<b>${player.name}</b>`;

  let playingRole = player.playingRole;

  if (playingRole == "Batsman") {
    listItem.innerHTML += " (Batsman)";
  } else if (playingRole == "Bowler") {
    listItem.innerHTML += " (Bowler)";
  } else if (playingRole == "Wicketkeeper") {
    listItem.innerHTML += " (Wk)";
  }

  if (player.Captain) {
    listItem.innerHTML += " (C)";
    listItem.style.background = "green";
    listItem.style.color = "white";
  }
  if (player.viceCaptain) {
    listItem.innerHTML += " (VC)";
    listItem.style.background = "#dbff90";
  }

  Team.append(listItem);
}

// Fantasy Points,Score and Wicket variable for both team
let TeamAFantasyPoint = 0;
let TeamAScore = 0;
let TeamAWk = 0;

let TeamBFantasyPoint = 0;
let TeamBScore = 0;
let TeamBWk = 0;

let BowlCount = 0;
let OverCount = 1;
let sum_Over = 0;
let wicket = 0;

let TeamABatsManPlayData = [];
let TeamABowlerPlayData = [];

let TeamBBatsManPlayData = [];
let TeamBBowlerPlayData = [];

let BattingInning = tossWinner;
let BowlingInning;

let currBatsIndex = 0;
let currBowlsIndex = 6;

// stores individual player run
let playerRun = 0;
let BallsPlayed = 0;
let batsmanFantasyPoint=0;

// WicketCounter for each Over
let wicketCounter = 0;
let bowlerFantasyPoint=0;

// Captain & Vice-captain Point
const CAPTAINPOINT = 2;
const VICECAPTAINPOINT = 1.5;

function setupMatchPlayersAndBoard() {
  if (BattingInning == teamAName) {
    BowlingInning = teamBName;
    setTimeout(() => {
      BattingTable[0].innerText = `${teamAData[0].name}`;
      BowlingTable[0].innerText = `${teamBData[currBowlsIndex].name}`;
    }, 2000); //6.5sec
  } else {
    BowlingInning = teamAName;
    setTimeout(() => {
      BattingTable[0].innerText = `${teamBData[0].name}`;
      BowlingTable[0].innerText = `${teamAData[currBowlsIndex].name}`;
    }, 2000); //6.5sec
  }

  setTimeout(() => {
    BattingTable[1].innerText = `0`;
    BattingTable[2].innerText = `0`;
    BowlingTable[1].innerText = `0`;
    BowlingTable[2].innerText = `0`;
  }, 2000);
}

setupMatchPlayersAndBoard();

let Inning = 1;

hitBtn.addEventListener("click", () => {
  hitBtn.innerText = "Next Shot..!!";
  updateMatchScore();
});

function updateMatchScore() {
  let currRun = getRandomRun();
  BowlCount++;
  BallsPlayed++;

  let NewBall = document.createElement("div");
  NewBall.classList = "ball";
  NewBall.id = `ball${BowlCount}`;

  console.log(NewBall);
  if (Inning <= 2 && OverCount < 6) {
    if (BattingInning == teamAName) {
      let point = calculateFantasyPoints(currRun);

      if (currRun == 0) {
        TeamBFantasyPoint += getPlayerPoints(point,teamBData[currBowlsIndex]);
        bowlerFantasyPoint += getPlayerPoints(point,teamBData[currBowlsIndex]);
      } else if (currRun != "W") {
        TeamAScore += currRun;
        TeamAFantasyPoint += getPlayerPoints(point,teamAData[currBatsIndex]);

        sum_Over += currRun;
        playerRun += currRun;
        batsmanFantasyPoint += getPlayerPoints(point,teamAData[currBatsIndex])

        BowlingTable[1].innerText = sum_Over;
      } else if (currRun == "W") {
        if (playerRun == 0) {
          TeamAFantasyPoint -= getPlayerPoints(2,teamAData[currBatsIndex]);
          batsmanFantasyPoint -= getPlayerPoints(2,teamAData[currBatsIndex])
        }

        TeamABatsManPlayData.push({
          name: teamAData[currBatsIndex].name,
          runs: playerRun,
          ballsPlayed: BallsPlayed,
          playerFantasy : batsmanFantasyPoint,
        });
        TeamBFantasyPoint += getPlayerPoints(point,teamBData[currBowlsIndex]);
        bowlerFantasyPoint += getPlayerPoints(point,teamBData[currBowlsIndex]);

        wicket += 1;
        currBatsIndex++;
        UpdateBatsmanAndResetData(teamAData);

        wicketCounter++; // tracks the wicket for each bowler.
        BowlingTable[2].innerText = wicketCounter; // Update Bowler's Wicket area
      }

      updateBallScoreAndFantasyPoints(NewBall,currRun,"teamA")
      
      if(wicket==10){
        showTimeBall();
        setTimeout(()=>{
          document.querySelector("#ShowTimer ul").innerHTML=""
          },2000)
        AllOut(TeamBBowlerPlayData,teamBData,TeamAScore,TeamBScore,"teamA");
        return;
      }

      // Batsman score Updated
      updateBatsmanStats();

      if(Inning==2 && TeamAScore>TeamBScore){
        alert("Game Ended");
        
        TeamABatsManPlayData.push({
          name: teamAData[currBatsIndex].name,
          runs: playerRun,
          ballsPlayed: BallsPlayed,
          playerFantasy : batsmanFantasyPoint,
        });

        TeamBBowlerPlayData.push({
          name: teamBData[currBowlsIndex].name,
          runsGiven: sum_Over,
          wicketTaken: wicketCounter,
          playerFantasy : bowlerFantasyPoint,
        });

        getSummary()
        Inning++;
        return;
      }

      showTimeBall();

      if (BowlCount == 6) {
        TeamBBowlerPlayData.push({
          name: teamBData[currBowlsIndex].name,
          runsGiven: sum_Over,
          wicketTaken: wicketCounter,
          playerFantasy : bowlerFantasyPoint
        });
        wicketCounter = 0;
        bowlerFantasyPoint=0;

        currBowlsIndex++;
        setTimeout(() => {
          if (currBowlsIndex < teamAData.length) {
            BowlingTable[0].innerText = `${teamBData[currBowlsIndex].name}`;
            BowlingTable[1].innerText = `0`;
            BowlingTable[2].innerText = `0`;
            document.querySelector("#ShowTimer ul").innerHTML=""
          }
        }, 3000);

        BowlCount = 0;
        hitBtn.disabled = true;
        hitBtn.innerText = "Next Over..!!";

        alert(`Total runs in this Over :- ${sum_Over}`);
        sum_Over = 0;
        OverCount++;

        if (OverCount == 6) {

          if (currRun != "W") {
            TeamABatsManPlayData.push({
              name: teamAData[currBatsIndex].name,
              runs: playerRun,
              ballsPlayed: BallsPlayed,
              playerFantasy : batsmanFantasyPoint,
            });
          }

          inningEnd("teamA");

          console.log(TeamABatsManPlayData);
          console.log(TeamBBowlerPlayData);
        }

        if(Inning<=2){
          OverUpdate();
        }
      }
    } else if ((BattingInning == teamBName)) {
      let point = calculateFantasyPoints(currRun);

      if (currRun == 0) {
        TeamAFantasyPoint += getPlayerPoints(point,teamAData[currBowlsIndex]);
        bowlerFantasyPoint += getPlayerPoints(point,teamAData[currBowlsIndex]);
      } else if (currRun != "W") {
        TeamBScore += currRun;
        TeamBFantasyPoint += getPlayerPoints(point,teamBData[currBatsIndex]);

        sum_Over += currRun;
        playerRun += currRun;
        batsmanFantasyPoint += getPlayerPoints(point,teamBData[currBatsIndex])
        console.log(playerRun);

        BowlingTable[1].innerText = sum_Over;
      } else if (currRun == "W") {
        if (playerRun == 0) {
          TeamBFantasyPoint -= getPlayerPoints(2,teamBData[currBatsIndex]);
          batsmanFantasyPoint -= getPlayerPoints(2,teamBData[currBatsIndex]);
        }
        TeamBBatsManPlayData.push({
          name: teamBData[currBatsIndex].name,
          runs: playerRun,
          ballsPlayed: BallsPlayed,
          playerFantasy : batsmanFantasyPoint
        });
        TeamAFantasyPoint += getPlayerPoints(point,teamAData[currBowlsIndex]);
        bowlerFantasyPoint += getPlayerPoints(point,teamAData[currBowlsIndex]);

        wicket += 1;
        currBatsIndex++;
        UpdateBatsmanAndResetData(teamBData)

        wicketCounter++;
        BowlingTable[2].innerText = wicketCounter;
      }

      updateBallScoreAndFantasyPoints(NewBall,currRun,"teamB");

      if(wicket==10){
        showTimeBall();
        setTimeout(()=>{
          document.querySelector("#ShowTimer ul").innerHTML=""
          },2000)
        AllOut(TeamABowlerPlayData,teamAData,TeamBScore,TeamAScore,"teamB");
        return;
      }

      // Batsman data Updated
      updateBatsmanStats();

      if(Inning==2 && TeamBScore>TeamAScore){
        alert("Game Ended");

        TeamBBatsManPlayData.push({
          name: teamBData[currBatsIndex].name,
          runs: playerRun,
          ballsPlayed: BallsPlayed,
          playerFantasy : batsmanFantasyPoint,
        });

        TeamABowlerPlayData.push({
          name: teamAData[currBowlsIndex].name,
          runsGiven: sum_Over,
          wicketTaken: wicketCounter,
          playerFantasy : bowlerFantasyPoint,
        });
        getSummary();
        Inning++;
        return;
      }

      showTimeBall();

      if (BowlCount == 6) {
        TeamABowlerPlayData.push({
          name: teamAData[currBowlsIndex].name,
          runsGiven: sum_Over,
          wicketTaken: wicketCounter,
          playerFantasy : bowlerFantasyPoint
        });
        wicketCounter = 0;
        bowlerFantasyPoint=0;

        currBowlsIndex++;

        setTimeout(() => {
          if (currBowlsIndex < teamAData.length) {
            BowlingTable[0].innerText = `${teamAData[currBowlsIndex].name}`;
            BowlingTable[1].innerText = `0`;
            BowlingTable[2].innerText = `0`;
            document.querySelector("#ShowTimer ul").innerHTML=""
          }
        }, 3000);

        BowlCount = 0;
        hitBtn.disabled = true;
        hitBtn.innerText = "Next Over..!!";

        alert(`Total runs in this Over :- ${sum_Over}`);
        sum_Over = 0;
        OverCount++;

        if (OverCount == 6) {
          if (currRun != "W") {
            TeamBBatsManPlayData.push({
              name: teamBData[currBatsIndex].name,
              runs: playerRun,
              ballsPlayed: BallsPlayed,
              playerFantasy : batsmanFantasyPoint
            });
          }

          inningEnd("teamB");

          console.log(TeamBBatsManPlayData);
          console.log(TeamABowlerPlayData);
        }

        if(Inning<=2){
          OverUpdate();
        }
      }
    }
  }
}

function getRandomRun() {
  let randomRun = Math.floor(Math.random() * 7);

  if (randomRun == 0 || randomRun == 1 || randomRun == 2 || randomRun == 3 || randomRun == 4 || randomRun == 6) {
    return randomRun;
  } else if (randomRun == 5) {
    return "W";
  }
}

function calculateFantasyPoints(run) {
  if (run == 0) {
    return 1;
  } else if (run == 1 || run == 2 || run == 3) {
    return run;
  } else if (run == 4) {
    return 5;
  } else if (run == 6) {
    return 8;
  } else if (run == "W") {
    return 10;
  }
}

function getPlayerPoints(point,player){
  if(player.Captain){
    // alert("captain")
    return point*CAPTAINPOINT;
  }else if(player.viceCaptain){
    // alert("Vice captain")
    return point*VICECAPTAINPOINT;
  }else{
    return point;
  }
}

function UpdateBatsmanAndResetData(teamData) {
  BattingTable[0].innerText = `${teamData[currBatsIndex].name}`;
  BattingTable[1].innerText = `0`;
  BattingTable[2].innerText = `0`;
  BallsPlayed = 0;
  playerRun = 0;
  batsmanFantasyPoint=0;
}

function updateBallScoreAndFantasyPoints(NewBall,currRun,update){
  OverShowArea.innerHTML = `<b>Current Over :- </b>${
    OverCount - 1
  }.${BowlCount}`;

  if(update=="teamA"){
    TeamAScoreBoard.innerText = `${TeamAScore}`;
    TeamAWicketBoard.innerText=`${wicket}`;
  }else if(update=="teamB"){
    TeamBScoreBoard.innerText = `${TeamBScore}`;
    TeamBWicketBoard.innerText=`${wicket}`;
  }
  TeamAFantasyBoard.innerText = `Fantasy Point :- ${TeamAFantasyPoint}`;

  TeamBFantasyBoard.innerText = `Fantasy Point :- ${TeamBFantasyPoint}`;

  NewBall.innerText = currRun;
  currOversArea.append(NewBall);
}

function updateBatsmanStats() {
  BattingTable[1].innerText = playerRun;
  BattingTable[2].innerText = BallsPlayed;
}

function inningUpdateChangeHeading(){
  setTimeout(() => {
    BattingTeamHeader.innerHTML = `<b>Batting Team :-</b> ${BattingInning} <hr>`;
    BowlingTeamHeader.innerHTML = `<b>Bowling Team :- </b> ${BowlingInning} <hr>`;
    alert("Innings Updated");

    setupMatchPlayersAndBoard();
  }, 2000);
}

function inningEnd(currInning){
  OverCount=1;
  wicket=0;
  BowlCount=0;
  sum_Over=0;
  wicketCounter=0;

  if(currInning=="teamA"){
    BattingInning = teamBName;
    BowlingInning = teamAName;
  }else if(currInning=="teamB"){
    BattingInning = teamAName;
    BowlingInning = teamBName;
  }

  Inning++;

  alert(`Inning End ${Inning}`);

  currBatsIndex = 0;
  currBowlsIndex = 6;

  playerRun = 0;
  BallsPlayed = 0;

  batsmanFantasyPoint=0
  bowlerFantasyPoint=0

  if(Inning==2){
    inningUpdateChangeHeading();
  }else if(Inning>2){
      getSummary();
      return;
  }
}

function getSummary(){
  hitBtn.innerText="Game Ended..!!";
  hitBtn.disabled=true;

  let winn = TeamAFantasyPoint>TeamBFantasyPoint?teamAName:teamBName;

  document.querySelector(".HitButtonArea .message").innerText = `${winn} Won the Match..!!`

  setTimeout(()=>{
    hitBtn.innerText = "Get Match Summary..!!";
    hitBtn.disabled=false;
  },3000)

  setTimeout(()=>{
    ScoreBoardTable.style.display = "none";
    hitBtn.addEventListener("click",()=>{
      window.location = "./MatchSummary.html";
      localStorage.setItem("TeamABatsManSummary",JSON.stringify(TeamABatsManPlayData));
      localStorage.setItem("TeamABowlerSummary",JSON.stringify(TeamABowlerPlayData));
      localStorage.setItem("TeamBBatsManSummary",JSON.stringify(TeamBBatsManPlayData));
      localStorage.setItem("TeamBBowlerSummary",JSON.stringify(TeamBBowlerPlayData));
      localStorage.setItem("TeamAScore&Fantasy",JSON.stringify([TeamAScore,TeamAFantasyPoint,TeamAWicketBoard.innerText]));
      localStorage.setItem("TeamBScore&Fantasy",JSON.stringify([TeamBScore,TeamBFantasyPoint,TeamBWicketBoard.innerText]));
    })
  },4000)
}

function AllOut(BowlerData,teamData,myTeamScore,oppTeamScore,teamString){
  BowlerData.push({
    name: teamData[currBowlsIndex].name,
    runsGiven: sum_Over,
    wicketTaken: wicketCounter,
    playerFantasy : bowlerFantasyPoint
  });

  if(Inning==2 && myTeamScore<oppTeamScore){
    getSummary();
  }

  inningEnd(teamString);

  setTimeout(()=>{
    currOversArea.innerHTML="";
    OverShowArea.innerHTML = `<b>Current Over :- </b>${
      OverCount - 1
      }.${BowlCount}`;
  },2000)

  return;
}

function OverUpdate(){
  setTimeout(() => {
    OverShowArea.innerHTML = `<b>Current Over :- </b>${OverCount - 1}.0`;
  }, 2000);
  
  setTimeout(() => {
    currOversArea.innerHTML = "";
    alert("Next Over :- " + OverCount);
    hitBtn.disabled = false;
    hitBtn.innerText = "Next Shot..!!";
  }, 3000);
}

function showTimeBall(){
  let date = new Date();

  date = date.toLocaleString();
  console.log(date);

  let newList = document.createElement("li");
  newList.innerText = `Ball ${BowlCount} @ ${date}`;
  document.querySelector("#ShowTimer ul").append(newList)
}