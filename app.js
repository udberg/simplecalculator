const body = document.body;
const displayTop = document.querySelector(".display-operation");
const displayBottom = document.querySelector(".display-numbers");
const btns = Array.from(document.querySelectorAll(".btn"));
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");

function getHistory() {
  return displayTop.textContent;
}

function printHistory(num) {
  return (displayTop.textContent = num);
}

function getCurrent() {
  return displayBottom.textContent;
}

function printCurrent(num) {
  return (displayBottom.textContent = num);
}

function clearAll() {
  printCurrent("");
  printHistory("");
}

function deleteLastNum(num) {
  if (num) {
    num = num.substr(0, num.length - 1);
    printCurrent(num);
  }
  let negativeSign = false;
}

let negativeSign = false;
let done = false;

for (let btn of btns) {
  btn.addEventListener("click", () => {
    let output = getCurrent();
    let history = getHistory();
    output = output.replace(/\,/g, "");
    if (btn.id === "clear") {
      clearAll();
    } else if (isNaN(output)) {
      return;
    } else if (!btn.id) {
      if (output == "0") {
        if (btn.textContent != "0") {
          output = btn.textContent;
          printCurrent(output);
        }
        return;
      }
      if (done) {
        output = "";
        done = false;
      }
      output = output + btn.textContent;
      printCurrent(output);
    } else if (btn.id != "=" && btn.id != "." && btn.id != "+/-") {
      if (output === "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }

      if (output != "" || history != "") {
        history = history + output;
        history = history + btn.id;
        printHistory(history);
        printCurrent("");
      }
    } else if (btn.id === "=") {
      if (isNaN(history[history.length - 1]) && output == "") {
        return;
      }
      if (history != "" || output != "") {
        history = history + output;
        let result = eval(history);
        if (result > Number.MAX_SAFE_INTEGER) {
          result = Infinity;
        }
        result = result.toLocaleString();
        printHistory("");
        printCurrent(result);
        done = true;
      }
    } else if (btn.id == ".") {
      if (output.includes(".")) {
        return;
      } else {
        if (output == "") {
          output = output + "0";
        }
        output = output + btn.id;
        printCurrent(output);
      }
    } else if (btn.id == "+/-") {
      if (output != "") {
        if (negativeSign) {
          output = output.substring(1);
          printCurrent(output);
          negativeSign = false;
        } else {
          output = "-" + output;
          negativeSign = true;
          printCurrent(output);
        }
      }
    }
  });
}

backspace.addEventListener("click", () => {
  const output = getCurrent();
  if (isNaN(output)) {
    return;
  }
  deleteLastNum(output);
});
