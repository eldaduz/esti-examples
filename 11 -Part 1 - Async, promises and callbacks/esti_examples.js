===============

ab => id = setTimeout(()=> console.log("ab"), 3000)
abc => clearTimeout(id); setTimeout(()=> console.log("abc"), 3000);

console.log("Start");
const id = setTimeout(() => console.log("Hello from timouts"), 1000);
// console.log('id', id);

console.log("End");

clearTimeout(id);

let timers = [];

function startCountdown() {
  // TODO: setTimeout for 3, 2, 1, Go!
  // Save each timeout id into the array timers
  const id3 = setTimeout(() => console.log("3"), 0);
  timers.push(id3);

  const id2 = setTimeout(() => console.log("2"), 1000);
  timers.push(id2);

  const id1 = setTimeout(() => console.log("1"), 2000);
  timers.push(id1);

  const idGo = setTimeout(() => console.log("Go"), 3000);
  timers.push(idGo);

  //timers = []; [id2, id1, idGo]
}

function cancelCountdown() {
  // TODO: loop over timers and clearTimeout for each one
  // Then reset timers to an empty array
  for (const id of timers) {
    clearTimeout(id);
  }
  timers = [];
}

// Example usage:
startCountdown();
// Try calling cancelCountdown() quickly to stop it
setTimeout(() => cancelCountdown(), 1000);

console.log('A');
setTimeout(()=> console.log("B"), 0);
console.log('C');

function checkPassword(password) {
  return new Promise((resolve, reject) => {
    if (password == "1234") {
      resolve({ status: "ok", user: "Admin" });
    } else {
      reject("Wrong password");
    }
  });
}

// const promiseObj = checkPassword("1111");
// console.log("promiseObj", promiseObj);

checkPassword("1111")
  .then((msg) => console.log("success: ", msg))
  .catch((msg) => console.log("error:", msg));

function boilPasta(amout) {
  return new Promise((resolve, reject) => {
    if (amout == "high") {
      reject("Ohiii!");
    }
    setTimeout(() => {
      resolve("Pasta ready");
    }, 2000);
  });
}

async function cookMeal() {
  try {
    const pasta = await boilPasta("high");
    console.log(pasta);

    const bla = await mixPasta(pasta);

    const sauce = "Sauce ready";
    console.log(sauce);

    const meal = "Meal ready!";
    console.log(meal);
  } catch (err) {
    console.log("Error:", err);
  }
}

cookMeal();
console.log("a");
console.log("b");
console.log("c");