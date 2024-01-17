let calledNumbers = [];
    let numTickets = 20;

    function callNumber() {
      let nextNumber;
      do {
        nextNumber = Math.floor(Math.random() * 90) + 1;
      } while (calledNumbers.includes(nextNumber));

      calledNumbers.push(nextNumber);
      updateBoard();
    }
    function newGame() {
        calledNumbers = [];
        updateBoard();
      }
  
      function generateTickets() {
        numTickets = document.getElementById("numTickets").value;
        updateBoard();
      }
      function updateBoard() {
        const board = document.getElementById("board");
        board.innerHTML = "";
  
        for (let i = 1; i <= 90; i++) {
          const numberDiv = document.createElement("div");
          numberDiv.classList.add("number");
          numberDiv.textContent = i;
  
          if (calledNumbers.includes(i)) {
            numberDiv.classList.add("called");
          }
          board.appendChild(numberDiv);
        }
  
        generateRandomTickets();
      }
  
      function generateRandomTickets() {
        // Logic to generate and display random tickets (you can customize this based on your requirements)
        // For simplicity, let's just display ticket numbers in the console.
        console.log(`Generating ${numTickets} random tickets...`);
      }
      // Initial update on page load
    updateBoard();    