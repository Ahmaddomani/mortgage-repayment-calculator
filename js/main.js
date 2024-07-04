// let top1 = 300000 * 0.004375 * (1 + 0.004375) ** 300;
// let bottom1 = 1 - (1 + 0.004375) ** 300;

// console.log(-(top1 / bottom1));

let input1 = document.getElementById("Amount");

//Select All inputs

let allinputs = document.querySelectorAll("input[type='text']");

allinputs.forEach((input) => {
  input.onclick = function () {
    let AmountInput = input.parentElement;
    AmountInput.style.borderColor = "rgb(219, 218, 42)";
    AmountInput.querySelector("span").style.backgroundColor =
      "rgb(219, 218, 42)";
  };
});
allinputs.forEach((input) => {
  input.onblur = function () {
    let AmountInput = input.parentElement;
    AmountInput.style.borderColor = "#ccc";
    AmountInput.querySelector("span").style.backgroundColor =
      "rgb(230, 242, 254)";
  };
});

// Start with the clear all button

let clearAllbutton = document.getElementById("clearAll");

clearAllbutton.addEventListener("click", () => {
  allinputs.forEach((input) => {
    input.value = "";
  });
});

// Define the button
let calc = document.getElementById("calc");

// define the second class input
let elemnt = document.querySelector(".second");

// define h4

let h4s = document.querySelectorAll(".main-box .input-box .Mortgage-Amount h4");

// dfine main-box result-box

let mainBox = document.querySelector(".main-box .result-box");

// make an array that show if the chack box is checked

let results = [];

// cheak the input values when click on calc button and make a desicion

calc.onclick = function () {
  allinputs.forEach((input) => {
    if (input.value === "") {
      input.parentElement.style.borderColor = "red";
      input.parentElement.querySelector("span").style.backgroundColor = "red";
      var p = document.createElement("p");
      p.style.cssText =
        "display:block; color :red; margin:0; position: absolute; left :0; bottom: -24px ; padding: 3px; border-bottom: 1px solid; font-size :13px; ";
      p.textContent = "filed is required";
      input.parentElement.append(p);
      h4s.forEach((h4) => {
        h4.style.marginTop = "20px";
      });
    }
  });
  if (results.length === 0) {
    elemnt.style.cssText = "position:relative;";
    var s = document.createElement("p");
    s.style.cssText =
      "display:block; color :red; margin:0; position: absolute; left :0; bottom: -24px ; padding: 3px; border-bottom: 1px solid; font-size :13px; ";
    s.textContent = "filed is required";
    elemnt.append(s);
  }
};

// when all things is alright we will do this
calc.addEventListener("click", () => {
  allinputs.forEach((input) => {
    if (input.value !== "" && results.length !== 0) {
      [...mainBox.children].forEach((e) => {
        e.style.display = "none";
      });
      // creat the calculator div
      let calculator = document.createElement("div");
      calculator.className = "calculator";

      // creat the text div

      let textDiv = document.createElement("div");
      textDiv.className = "text";

      //create the h3

      let h3 = document.createElement("h3");
      h3.textContent = "Your Result";

      //create the p

      let p = document.createElement("p");
      p.innerHTML =
        "Your results are shown below based on the information you provided. To adjust the results,edit the form and clikc 'calculte repayment' again";

      // append the h3 and p to the textdiv

      textDiv.append(h3);
      textDiv.append(p);
      textDiv.style.textAlign = "start";

      //append the textdiv to the calculator

      calculator.append(textDiv);

      // creat the mainResultBox

      let mainResultBox = document.createElement("div");

      mainResultBox.style.marginTop = "30px";

      mainResultBox.style.cssText =
        "padding: 29px 30px 30px; background-color: rgb(14,36,49);  border-radius: 10px; border-top: 3px solid rgb(219, 218, 42); width:100%;";

      //creat the container

      let container = document.createElement("div");

      container.className = "container";

      // creat the h4 header

      let h4 = document.createElement("h4");

      h4.textContent = "You monthly repayments";

      // creat the opreation

      let P = document.querySelector(
        ".main-box .input-box .Mortgage-Amount .Amount-input input"
      ).value;
      let r =
        document.querySelector(
          ".options-of-mortgage > div div input#interest-rate"
        ).value / 1200;
      let n =
        document.querySelector(".options-of-mortgage > div div input#years")
          .value * 12;

      // the main opration
      let top1 = P * r * (1 + r) ** n;
      let bottom1 = 1 - (1 + r) ** n;

      let regex = /(\d)(?=(\d{3})+(?!\d))/g;

      let string = -(top1 / bottom1).toFixed(2);

      let finalResult = string.toString().replace(regex, "$1,");
      let totalresulut = (string * 300).toString().replace(regex, "$1,");

      //creat h1 resulet

      let h1 = document.createElement("h1");
      h1.textContent = `£${finalResult}`;
      h1.style.textAlign = "center";
      h1.style.color = "rgb(219, 218, 42)";
      h1.style.borderBottom = "1px solid #ccc";
      h1.style.cssText =
        "color: rgb(219, 218, 42); border-bottom: 1px solid rgb(204, 204, 204); font-size: 50px; padding-bottom: 30px; width: 100%;margin-top:0;";

      //create the total info

      let total = document.createElement("div");

      total.className = "total";

      // creat the header text

      let headtext = document.createElement("p");

      headtext.className = "headtext";

      headtext.textContent = "Total you'll repay iver the term";

      //creat the value elemnt

      let value = document.createElement("span");

      value.className = "value";

      value.textContent = `£${totalresulut}`;

      //appen the value and the headtext to the total

      total.append(headtext);
      total.append(value);

      //apend the elemnts

      container.append(h4);
      container.append(h1);

      //appene the total to the container

      container.append(total);

      //append the container to the resilt

      mainResultBox.append(container);

      //append the claculator to the mainbox

      mainBox.append(calculator);
      mainBox.style.display = "flex";
      mainBox.style.flexDirection = "column";
      mainBox.style.justifyContent = "start";

      //appen the resultdiv to the maindiv
      mainBox.append(mainResultBox);
    }
  });
});

// remove the warnning if the input has value
allinputs.forEach((input) => {
  input.onchange = function () {
    if (input !== "") {
      if (input.parentElement.querySelector("p")) {
        input.parentElement.querySelector("p").style.display = "none";
      }
    }
  };
});

let raidos = document.querySelectorAll("input[type='radio']");

raidos.forEach((ele) => {
  ele.addEventListener("change", function () {
    if (ele.parentElement.querySelector("p")) {
      ele.parentElement.querySelector("p").style.display = "none";
    }
  });
});

raidos.forEach((ele) => {
  ele.addEventListener("change", function () {
    results.push(ele.checked);
  });
});
