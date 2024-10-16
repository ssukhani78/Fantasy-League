let TeamABatTable = document.querySelector("#TeamA-Bat");
let TeamABowlTable = document.querySelector("#TeamA-Bowl");

let TeamBBatTable = document.querySelector("#TeamB-Bat");
let TeamBBowlTable = document.querySelector("#TeamB-Bowl");

let teamAName = localStorage.getItem("TeamA");
let teamBName = localStorage.getItem("TeamB");

let teamAScoreAndFantasy = JSON.parse(localStorage.getItem("TeamAScore&Fantasy"));
let teamBScoreAndFantasy = JSON.parse(localStorage.getItem("TeamBScore&Fantasy"));

let teamABowlerData = JSON.parse(localStorage.getItem("TeamABowlerSummary"));
let teamBBowlerData = JSON.parse(localStorage.getItem("TeamBBowlerSummary"));

let teamABatterData = JSON.parse(localStorage.getItem("TeamABatsManSummary"));
let teamBBatterData = JSON.parse(localStorage.getItem("TeamBBatsManSummary"));

let finalWinnerArea = document.querySelector("#final-Winner");

if(teamAScoreAndFantasy[1]>teamBScoreAndFantasy[1]){
    finalWinnerArea.innerText=`${teamAName} WON the MATCH..!!!`
}else if (teamBScoreAndFantasy[1]>teamAScoreAndFantasy[1]){
    finalWinnerArea.innerText=`${teamBName} WON the MATCH..!!!`
}else{
    finalWinnerArea.innerText=`Match DRAW..!!!`
}

console.log(teamABatterData);

TeamABatTable.children[0].innerText += ` ${teamAScoreAndFantasy[1]}`;
TeamBBatTable.children[0].innerText += ` ${teamBScoreAndFantasy[1]}`;

TeamABatTable.children[1].innerText += ` ${teamAScoreAndFantasy[0]}/${teamAScoreAndFantasy[2]}`;
TeamBBatTable.children[1].innerText += ` ${teamBScoreAndFantasy[0]}/${teamBScoreAndFantasy[2]}`;

TeamABatTable.children[2].innerText = `${teamAName} Batters Details`;
TeamBBatTable.children[2].innerText = `${teamBName} Batters Details`;

TeamABowlTable.children[0].innerText = `${teamAName} Bowlers Details`;
TeamBBowlTable.children[0].innerText = `${teamBName} Bowlers Details`;

function printBowlerDetail(teamBowlerArray,Table){
    for(let player of teamBowlerArray){
        let newRow = document.createElement("tr");
    
        let bowlerName = document.createElement("td");
        let wicketTaken = document.createElement("td");
        let RunsGiven = document.createElement("td");
        let Point = document.createElement("td");

    
        bowlerName.innerText = player.name;
        wicketTaken.innerText = player.wicketTaken;
        RunsGiven.innerText = player.runsGiven;
        Point.innerText = player.playerFantasy
    
        newRow.appendChild(bowlerName);
        newRow.appendChild(wicketTaken);
        newRow.appendChild(RunsGiven);
        newRow.appendChild(Point);

        Table.append(newRow);
    }
}

function printBatterDetail(teamBatterArray,Table){
    for(let player of teamBatterArray){
        let newRow = document.createElement("tr");
    
        let batterName = document.createElement("td");
        let runsScored = document.createElement("td");
        let ballsPlayed = document.createElement("td");
        let Point = document.createElement("td");

    
        batterName.innerText = player.name;
        runsScored.innerText = player.runs;        
        ballsPlayed.innerText = player.ballsPlayed;
        Point.innerText = player.playerFantasy
    
        newRow.appendChild(batterName);
        newRow.appendChild(runsScored);
        newRow.appendChild(ballsPlayed);
        newRow.appendChild(Point);

    
        Table.append(newRow);
    }
}

printBowlerDetail(teamABowlerData,TeamABowlTable);
printBowlerDetail(teamBBowlerData,TeamBBowlTable);

printBatterDetail(teamABatterData,TeamABatTable);
printBatterDetail(teamBBatterData,TeamBBatTable);