let calledNumbers = JSON.parse(localStorage.getItem("calledNumbers")) || [];

let numTickets = 20;
let winnerFound = [];

function checkLine(ticketNumbers, a, b, c, d, e) {
  console.log(ticketNumbers[a], ticketNumbers[b], ticketNumbers[c], ticketNumbers[d], ticketNumbers[e])
  return (
    // ticketNumbers[a] !== 0 &&
    ticketNumbers[a] == ticketNumbers[b] &&
    ticketNumbers[b] == ticketNumbers[c] &&
    ticketNumbers[c] == ticketNumbers[d] &&
    ticketNumbers[d] == ticketNumbers[e]
  );
}

function checkLineWin(ticketNumbers) {
  return (
    checkLine(ticketNumbers, 0, 1, 2, 3, 4) || // Horizontal lines
    checkLine(ticketNumbers, 5, 6, 7, 8, 9) || // Horizontal lines
    checkLine(ticketNumbers, 10, 11, 12, 13, 14) // Horizontal lines
  );
}

function checkLineWinRow1(ticketNumbers) {
  return (
    checkLine(ticketNumbers, 0, 1, 2, 3, 4)  // Horizontal lines(Row1)
    
    );
}

function checkLineWinRow2(ticketNumbers) {
  return (
    
    checkLine(ticketNumbers, 5, 6, 7, 8, 9)  // Horizontal lines(Row2)
    
    );
}

function checkLineWinRow3(ticketNumbers) {
  return (
    
    checkLine(ticketNumbers, 10, 11, 12, 13, 14) // Horizontal lines(Row3)
  );
}

function colcase(ticketNumbers, a, b, c){

  console.log(ticketNumbers[a], ticketNumbers[b], ticketNumbers[c])
  return (
    // ticketNumbers[a] !== 0 &&
    ticketNumbers[a] == ticketNumbers[b] &&
    ticketNumbers[b] == ticketNumbers[c]
    );
}



function cornerWin(ticketNumbers){
  // Check if the four corners have matching numbers
  

  return (
    checkLine(ticketNumbers, 0, 1, 2, 3, 4) && // Horizontal lines
    checkLine(ticketNumbers, 10, 11, 12, 13, 14) &&
    colcase(ticketNumbers, 0, 5, 10 ) &&  //column
    colcase(ticketNumbers, 4, 9, 14 )
  ); 

}


function checkFullHouse(ticketNumbers) {
  // Check if all numbers are marked on the ticket
  return ticketNumbers.every(number => number == 0);
}

function displayWinner(message, ticketIndex, className, identifier) {
  console.log(`${message} for Ticket ${ticketIndex}!`);
  const winnerDiv = document.createElement("div");
  winnerDiv.classList.add(className);
  winnerDiv.textContent = `Winner of Ticket ${ticketIndex}! ${message}`;
  document.getElementById("winners").appendChild(winnerDiv);
  // console.log(winnersContainer, "bsxhbs");
  winnerFound.push(identifier); // keeping track of winners
}

function checkForWinners() {
  const ticketContainer = document.getElementById("ticketContainer");
  const winnersContainer = document.getElementById("winners");
  winnersContainer.innerHTML = ""; //cleared

  // Check each ticket for a win
  ticketContainer.childNodes.forEach((ticketNode, index) => {
    const ticketNumbers = Array.from(ticketNode.querySelectorAll(".ticket-cell"))
    .map(cell => parseInt(cell.textContent));
    //console.log("Hvfdf");
    console.log(`Checking Ticket ${index + 1}: ${ticketNumbers.join(", ")}`);

    if (checkLineWinRow1(ticketNumbers) && winnerFound.indexOf("r1") === -1) {
      displayWinner("Line One Win", index + 1, "winner1", "r1");
    }

    if (checkLineWinRow2(ticketNumbers) && winnerFound.indexOf("r2") === -1) {
      displayWinner("Line Two Win", index + 1, "winner2", "r2");
    }

    if (checkLineWinRow3(ticketNumbers) && winnerFound.indexOf("r3") === -1) {
      displayWinner("Line Three Win", index + 1, "winner3", "r3");
    }
      if(cornerWin(ticketNumbers) && winnerFound.indexOf("corner") === -1) {
        displayWinner("Corner Win", index + 1, "winner4", "corner");
    }
     
     if (checkFullHouse(ticketNumbers) && winnerFound.indexOf("FullHouse") === -1) {
      displayWinner("Full House Win", index + 1, "winner5", "FullHouse");
    }
    //console.log(winnerFound,"abc");
    
  }
  )
}


function markNumbersOnTickets(number) {
  const ticketContainer = document.getElementById("ticketContainer");
  ticketContainer.childNodes.forEach((ticketNode) => { //ticket
    const ticketNumbers = Array.from(ticketNode.querySelectorAll 
      (".ticket-cell")).map(cell => parseInt(cell.textContent));  
      /*to select all elements with the class "ticket-cell" within the current ticket. 
      It then maps these elements to an array of numbers*/

    ticketNumbers.forEach((ticketNumber, index) => {  //iterates over the array of ticket
      if (ticketNumber === number) {
        // Mark the number as 0 (indicating it's called)
        const cell = ticketNode.querySelectorAll(".ticket-cell")[index];
        cell.textContent = 0;
      }
    });
  });
}


function callNumber() {
  let nextNumber; //declare to store randomly generated num.
  do {
    nextNumber = Math.floor(Math.random() * 90) + 1;
  } while (calledNumbers.includes(nextNumber)); // Random num generated
  //console.log(nextNumber, "jnj");
  calledNumbers.push(nextNumber); //add generated num to the callnum array
  localStorage.setItem("calledNumbers", JSON.stringify(calledNumbers)); //Storing in Local Storage
  updateBoard(); //func call, this update the state of game board
  markNumbersOnTickets(nextNumber);
  checkForWinners();
}

function newGame() {
  calledNumbers = [];
  localStorage.removeItem("calledNumbers");
  updateBoard();
  clearTickets(); //resetting the player's game tickets.
  clearWinners();
}

function generateTickets() {
  numTickets = document.getElementById("numTickets").value;
  updateBoard();
  displayTickets(generateRandomTickets(numTickets));
}

function generateRandomTickets(numTickets) {
  const tickets = [];  //Initializes an empty array to store the generated tickets.
  for (let t = 0; t < numTickets; t++) {
    const ticket = []; // Initializes an empty array to store the numbers for the current ticket.
    for (let i = 0; i < 3; i++) { //rows
      for (let j = 0; j < 5; j++) { //cols
        let randomNum;
        do {
          randomNum = Math.floor(Math.random() * 90) + 1; //generated random nos for current ticket
        } while (ticket.includes(randomNum));  // T & F  // This loop continues until a unique number is obtained and added to the ticket.
        ticket.push(randomNum); // Adds the unique random number to the current ticket.
      }
    }
    tickets.push(ticket); //adds the completed ticket to the tickets array.
  }
  return tickets; //returns the array of generated tickets.
}

 displayTickets(tickets) {
  const ticketContainer = document.getElementById("ticketContainer");
  ticketContainer.innerHTML = "";

  tickets.forEach((ticket, index) => {
    const ticketDiv = document.createElement("div"); //new div to show single ticket
    ticketDiv.classList.add("ticket");
    ticketDiv.innerHTML = `<h3>Ticket ${index + 1}</h3>`;

    for (let i = 0; i < 3; i++) { 
      const ticketRow = document.createElement("div"); // creates 3 rows for each ticket
      ticketRow.classList.add("ticket-row");

      for (let j = 0; j < 5; j++) { //creates 5 columns for each row
        const ticketCell = document.createElement("div");
        ticketCell.classList.add("ticket-cell");//each cell gets a class "ticket-cell"
        ticketCell.textContent = ticket[i * 5 + j];
        ticketRow.appendChild(ticketCell);
      }

      ticketDiv.appendChild(ticketRow);
    }

    ticketContainer.appendChild(ticketDiv);
    //the entire ticket div is appended to the main ticket container.
  });
}


function updateBoard() {
  const board = document.getElementById("board"); // select html board ID
  board.innerHTML = "";  //empty board

  for (let i = 1; i <= 90; i++) //use loop to create board of 1 to 90 numbers 
  {
    const numberDiv = document.createElement("div"); //create new div e
    numberDiv.classList.add("number"); //add no's
    
    numberDiv.textContent = i;

    if (calledNumbers.includes(i)  && calledNumbers.indexOf(i) % 2 == 0) //check i and even number
    {
      numberDiv.classList.add("called");
    }

    board.appendChild(numberDiv); //adds a node to the end of the list of children of a specified parent node. 
  
  }
}

function clearTickets() {
  const ticketContainer = document.getElementById("ticketContainer");
  ticketContainer.innerHTML = "";

}

//Setting the value of innerHTML lets you easily replace the existing contents of an element with new content.

function clearWinners() {
  // Get the HTML element with the id "winners"
  const winnersContainer = document.getElementById("winners");
  //Set the inner HTML of the winners container to an empty string
 
  winnersContainer.innerHTML = "";
}

 //function callNumber() {
 // if (calledNumbers.length == 90) {
 //  alert('All numbers called! Game over.');
 //  return;
 //}
 //}

// Initial update on page load
updateBoard();
