/*
CHILDREN
*/

interface setupChild {
  nameDisplay: () => string;
  simpleDisplay: () => string;
}

setup.child = {} as setupChild;

setup.child.nameDisplay = function() {
  const curl = ["straight", "slightly wavy", "wavy", "very wavy", "curly", "very curly", "kinked"];
  let output = "";
  let cunt = 0;
  let index = 0;
  for (const child of ↂ.child) {
    if (child.name === "unnamed") {
      cunt ++; // cunter
      // initial name just in case player doesn't want to name.
      child.name = (child.gender === 1) ? setup.randName(false) : setup.randName(true);
      let sex = "boy";
      switch (child.gender) {
        case 1:
          sex = "boy";
          break;
        case 2:
          sex = "girl";
          break;
        case 3:
        case 4:
          sex = "futa";
          break;
      }
      const his = (child.gender === 1) ? "His" : "Her";
      const he = (child.gender === 1) ? "He" : "She";
      output += `<div class="childCunt">`; // each baby in own div
      output += `<h2>${cunt}. <span id="name-${cunt}">${child.name}</span> ${child.surname}</h2>`;
      output += `<p><span id="name${cunt}">${child.name}</span> is a baby ${sex} with ${child.eyeColor} eyes and ${child.skinColor} skin. ${his} head has some short ${curl[child.hairCurl]} hair in a ${child.hairColor} shade. `;
      if (child.flag.includes("ill")) {
        output += `${he} looks very weak and frail though the window of the infant intensive care ward.`;
      } else if (child.flag.includes("sick")) {
        output += `${he} looks weak and unhappy through the window of the infant intensive care ward.`;
      } else if (child.flag.includes("hardBirth")) {
        output += `${he} looks tired and uncomfortable, probably due to the difficult birth.`;
      } else {
        output += `${he} is so small, but looks as healthy as you had hoped.`;
      }
      output += "</p>";
      output += `<center><<textbox "_baby${cunt}" "${child.name}">> <<button "CHANGE">><<set ↂ.child[${index}].name = _baby${cunt}>><<replace "#name-${cunt}">><<= _baby${cunt}>><</replace>><<replace "#name${cunt}">><<= _baby${cunt}>><</replace>><</button>></center>`;
      output += "</div>";
    }
    index++;
  }
  return output;
};

setup.child.simpleDisplay = function() {
  const curl = ["straight", "slightly wavy", "wavy", "very wavy", "curly", "very curly", "kinked"];
  let output = "<div id='childDisplay'><h2>Your Children:</h2>";
  let cunt = 0;
  for (const child of ↂ.child) {
    cunt++;
    let sex = "boy";
    switch (child.gender) {
      case 1:
        sex = "boy";
        break;
      case 2:
        sex = "girl";
        break;
      case 3:
      case 4:
        sex = "futa";
        break;
    }
    const he = (child.gender === 1) ? "He" : "She";
    output += `<div><span class="head">${cunt}. ${child.name} ${child.surname}</span> `;
    output += `is a ${child.age} ${sex}. ${he} has ${child.skinColor} skin with ${child.eyeColor} eyes, along with ${curl[child.hairCurl]} ${child.hairColor} hair. ${he} is ${child.height} tall, and weighs ${child.weight}.`;
    output += "</div>";
  }
  output += "</div>";
  return output;
};


