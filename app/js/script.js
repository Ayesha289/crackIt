let questions = [
  {
    numb: 1,
    question: "Currently India is president of which of the following groups?",
    answer: "G20",
    options: ["G20", "G7", "G8", "G5"],
  },
  {
    numb: 2,
    question: "Number of teams in WPL are",
    answer: "5",
    options: ["5", "6", "7", "8"],
  },
  {
    numb: 3,
    question: "Which of the following canals is controlled by Egypt ?",
    answer: "Suez",
    options: ["Panama", "Suez", "Volga Don", "Rhine Main Danube"],
  },
  {
    numb: 4,
    question: "Which of the following is not a permanent member of UNSC",
    answer: "Germany",
    options: ["UK", "France", "China", "Germany"],
  },
  {
    numb: 5,
    question:
      "Which of the following countries follow Presidential system of government ?",
    answer: "USA",
    options: ["India", "USA", "UK", "Japan"],
  },
  {
    numb: 6,
    question: "First Capital of Shivaji Maharaj's Swarajya",
    answer: "Rajgad",
    options: ["Raigad", "Torna", "Purandar", "Rajgad"],
  },
  {
    numb: 7,
    question: "When did Bangladesh gain its Independence",
    answer: "1971",
    options: ["1947", "1962", "1965", "1971"],
  },
  {
    numb: 8,
    question:
      "Which of the following is the fastest cruise missile in the world",
    answer: "Brahmos",
    options: ["Agni", "Brahmos", "Dhanush", "Prahar"],
  },
  {
    numb: 9,
    question: "According to GoI and RBI inflation is tolerable within the of ",
    answer: "4% +/-  2",
    options: ["2% +/- 2", "4% +/-  2", "6% +/- 2", "8% +/- 2"],
  },
  {
    numb: 10,
    question: "State with max Lok Sabha seats in India",
    answer: "UP",
    options: ["Maharashtra", "MP", "UP", "Rajasthan"],
  },
  {
    numb: 11,
    question: "Chabahar port is located in ",
    answer: "Iran",
    options: ["India", "Pakistan", "Iraq", "Iran"],
  },
  {
    numb: 12,
    question: "Current CJI of India",
    answer: "D Y Chandrachud",
    options: ["D Y Chandrachud", "U U Lalit", "Y V Chandrachud", "Dipak Misra"],
  },
  {
    numb: 13,
    question: "Nord Stream is a ",
    answer: "Gas Pipeline from Russia to Germany",
    options: [
      "Oil Pipeline from Russia to Germany",
      "Gas Pipeline from Russia to Germany",
      "Oil pipeline from Germany to Russia",
      "Gas Pipeline from Germany to Russia",
    ],
  },
  {
    numb: 14,
    question:
      "Along with Sardar Patel who is responsible for integrating all the princely states in India",
    answer: "VP Menon",
    options: ["VP Menon", "C Rajgolachari", "S Jaishankar", "VK Menon"],
  },
  {
    numb: 15,
    question: "Statue of liberty was gifted to USA by",
    answer: "France",
    options: ["UK", "USSR", "India", "France"],
  },
  {
    numb: 16,
    question: "Which of the following ISRO's mission has a human crew",
    answer: "Gaganyaan",
    options: [
      "Chandrayaan 1",
      "Chandrayaan 3",
      "Gaganyaan",
      "Mars Orbiter Mission",
    ],
  },
  {
    numb: 17,
    question: "Who was responsible for Bengal Partition of 1905",
    answer: "Lord Curzon",
    options: ["Mahatma Gandhi", "Lord Clive", "Pandit Nehru", "Lord Curzon"],
  },
  {
    numb: 18,
    question: "Financial Capital of India is",
    answer: "Mumbai",
    options: ["Delhi", "New Delhi", "Mumbai", "Banglore"],
  },
  {
    numb: 19,
    question:
      "River Indus passes through which of the following territories of India",
    answer: "J & K",
    options: ["J & K", "Punjab", "Himachal Pradesh", "Uttarakhand"],
  },
  {
    numb: 20,
    question:
      "All the places part of 'Chota Char Dham' are a part of which state",
    answer: "Uttarakhand",
    options: ["J & K", "Punjab", "Himachal Pradesh", "Uttarakhand"],
  },
];
//selecting all required elements

if (typeof document !== "undefined") {
  let start_btn = document.querySelector(".start_btn button");
  console.log(start_btn);
  const info_box = document.querySelector(".info_box");
  const exit_btn = info_box.querySelector(".buttons .quit");
  const continue_btn = info_box.querySelector(".buttons .restart");
  const quiz_box = document.querySelector(".quiz_box");
  const result_box = document.querySelector(".result_box");
  const option_list = document.querySelector(".option_list");
  const time_line = document.querySelector("header .time_line");
  const timeText = document.querySelector(".timer .time_left_txt");
  const timeCount = document.querySelector(".timer .timer_sec");
}
//const start_btn = document.querySelector(".start_btn button");
// const info_box = document.querySelector(".info_box");
// const exit_btn = info_box.querySelector(".buttons .quit");
// const continue_btn = info_box.querySelector(".buttons .restart");
// const quiz_box = document.querySelector(".quiz_box");
// const result_box = document.querySelector(".result_box");
// const option_list = document.querySelector(".option_list");
// const time_line = document.querySelector("header .time_line");
// const timeText = document.querySelector(".timer .time_left_txt");
// const timeCount = document.querySelector(".timer .timer_sec");
let bonus = 0;
// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(20); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
};

let timeValue = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
// restart_quiz.onclick = ()=>{
//     quiz_box.classList.add("activeQuiz"); //show quiz box
//     result_box.classList.remove("activeResult"); //hide result box
//     timeValue = 20;
//     que_count = 0;
//     que_numb = 1;
//     userScore = 0;
//     widthValue = 0;
//     showQuetions(que_count); //calling showQestions function
//     queCounter(que_numb); //passing que_numb value to queCounter
//     clearInterval(counter); //clear counter
//     clearInterval(counterLine); //clear counterLine
//     startTimer(timeValue); //calling startTimer function
//     startTimerLine(widthValue); //calling startTimerLine function
//     timeText.textContent = "Time Left"; //change the text of timeText to Time Left
//     next_btn.classList.remove("show"); //hide the next button
// }

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};

// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let specialQuestions = "10 5 14 7";
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items
  let squestions = specialQuestions.split(" ");

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    //answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    // console.log("Correct Answer");
    // console.log("Your correct answers = " + userScore);
    if (questions == squestions) {
      bonus = bonus + 1;
    }
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    // answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    // console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        // option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        //option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}
function showResult() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>and congrats! 🎉, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>and nice 😎, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>and sorry 😐, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
  console.log(userScore);
  console.log(bonus);
}

module.exports = { userScore };

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      //if timer is less than 0
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          // option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          // option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      if (que_count < questions.length - 1) {
        //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
      } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
      } //show the next button if user selected any option
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 40);
  function timer() {
    time += 1; //upgrading time value with 1
    time_line.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 560) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}

function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag;
}

const saveToDb = async (data) => {
  //Change url when hosted
  await fetch("http://localhost:3000/save", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
