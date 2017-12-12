setup.calculateNPCATR = function (main, body) {
  return [2, 1, 1];
};
setup.monthName = function (mon) {
  var names = [
    "Error",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Sol",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return names[mon] || "Error";
};
setup.appendStr = function (target, content) {
  const $target = jQuery(target);
  $target.append(content);
};
setup.numberLetAbrv = function (num) {
  var letters = [
    "th",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th"
  ];
  var res;
  if (num == 11 || num == 12 || num == 13) {
    res = 5;
  } else {
    res = num % 10;
  }
  return letters[res] || "er";
};
setup.pantiesIcon = function (num) {
  var img = [
    "IMG-panties-5",
    "IMG-panties-5",
    "IMG-panties-5",
    "IMG-panties-3",
    "IMG-panties-2",
    "IMG-panties-4",
    "IMG-panties-8",
    "IMG-panties-9",
    "IMG-panties-6",
    "IMG-panties-7",
    "IMG-panties-7",
    "IMG-panties-1",
    "IMG-panties-1",
  ];
  return img[num] || "IMGnotavailable";
};
setup.brasIcon = function (num) {
  var img = [
    "IMG-bra-7",
    "IMG-bra-7",
    "IMG-bra-1",
    "IMG-bra-4",
    "IMG-bra-8",
    "IMG-bra-2",
    "IMG-bra-11",
    "IMG-bra-9",
    "IMG-bra-3",
    "IMG-bra-9",
    "IMG-bra-9",
    "IMG-bra-10",
    "IMGnotavailable",
  ];
  return img[num] || "IMGnotavailable";
};
setup.stockingsIcon = function (num) {
  var img = [
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable",
    "IMGnotavailable"
  ];
  return img[num] || "IMGnotavailable";
};
setup.topsIcon = function (num) {
  var img = "IMGnotavailable";
  return img;
};
setup.bottomsIcon = function (num) {
  var img = "IMGnotavailable";
  return img;
};
setup.dressesIcon = function (num) {
  var img = "IMGnotavailable";
  return img;
};
setup.overwearIcon = function (num) {
  var img = "IMGnotavailable";
  return img;
};
setup.nameRandomizer = function (sex, race) {
  var list = ["error"],
    cock = 0;
  switch (race) {
    case "white":
      cock = 1;
      break;
    case "Gaelic":
      cock = 1;
      break;
    case "Nordic":
      cock = 1;
      break;
    case "black":
      cock = 2;
      break;
    case "native American":
      cock = 1;
      break;
    case "middle eastern":
      cock = 3;
      break;
    case "hispanic":
      cock = 4;
      break;
    case "southern European":
      cock = 4;
      break;
    case "southeast Asian":
      cock = 5;
      break;
    case "Asian":
      cock = 5;
      break;
    case "south Asian":
      cock = 6;
      break;
  }
  var t = random(1, 10);
  if (cock == 5 && t > 8) {
    cock = 1;
  }
  if (cock == 6 && t > 9) {
    cock = 1;
  }
  if (cock == 4 && t > 9) {
    cock = 1;
  }
  if (cock == 2 && t > 9) {
    cock = 1;
  }
  if (sex == 1 || sex == 4) {
    if (State.active.variables.npcSetting.names[0] && State.active.variables.npcSetting.names[1].length > 0) {
      list = State.active.variables.npcSetting.names[1];
    } else {
      switch (cock) {
        case 1:
          list = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Chris", "Daniel", "Paul", "Mark", "Donald", "George", "Ken", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Andrew", "Raymond", "Greg", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas", "Henry", "Carl", "Arthur", "Ryan", "Roger", "Joe", "Jack", "Albert", "Jonathan", "Justin", "Terry", "Gerald", "Keith", "Samuel", "Willie", "Ralph", "Lawrence", "Nick", "Roy", "Bruce", "Brandon", "Adam", "Harry", "Fred", "Billy", "Steve", "Louis", "Jeremy", "Aaron", "Randy", "Howard", "Eugene", "Carlos", "Russell", "Bobby", "Victor", "Martin", "Phillip", "Todd", "Jesse", "Craig", "Alan", "Shawn", "Philip", "Chris", "Dan", "Dale", "Rodney", "Curtis", "Norman", "Allen", "Marvin", "Vincent", "Glenn", "Jeffery", "Travis", "Jeff", "Jacob", "Lee", "Kyle", "Brad", "Joel", "Ray", "Alex", "Jake", "Connor", "Tanner", "Wyatt", "Cody", "Dustin", "Luke", "Jack", "Scott", "Logan", "Cole", "Lucas", "Bradley", "Jacob", "Garret", "Dylan", "Maxwell", "Hunter", "Brett", "Colin"];
          break;
        case 2:
          list = ["DeShawn", "DeAndre", "Marquis", "Darnell", "Terrell", "Malik", "Trevon", "Tyrone", "Willie", "Demetrius", "Reginald", "Jamal", "Maurice", "Darius", "Xavier", "Terrance", "Andre", "Darryl", "LeShawn", "Dion", "Malik", "Deon", "Demond", "Taye", "Demarco", "Jerome", "Rodell", "Romeo", "Keyon", "Keandre", "Benjamin", "Cordell", "Cornell", "D'shaun", "DaJon", "Eddie", "Stevie", "Travon", "Trone", "Traybon", "Lamar", "Lavan", "Lemar", "Jamar", "Jemarcus", "Luther", "Montel", "Odell", "Orlando", "Winton", "Lloyd", "Lincoln", "La-Ron", "Carl", "Carnell", "Emmet", "D'marco", "Raymone", "Latrelle", "Dequinn", "Labron", "Prevan", "trever", "Jontray", "Denton", "Shakur", "Anderius", "Kejuan", "Debony", "Jamichael", "Jazeel", "Desharious", "K'eon", "Ontrel"];
          break;
        case 3:
          list = ["Asad", "Aban", "Abbud", "Adnan", "Afiya", "Ahmad", "Ali", "Ammar", "Anwar", "Arif", "Asim", "Asswad", "Azim", "Bahram", "Basil", "Behzad", "Bishr", "Borak", "Borat", "Cairo", "Chelem", "Dabir", "Dawud", "Durwad", "Emir", "Fadel", "Fadi", "Fakhir", "Fatin", "Feroz", "Ferran", "Ghazi", "Habib", "Hadi", "Hakeem", "Hakim", "Hamal", "Hashim", "Hud", "Imad", "Imam", "Ishaq", "Issam", "Jabbar", "Jabir", "Jafar", "Jalal", "Jamal", "Jameel", "Jarir", "Jawad", "Jisim", "Kadeen", "Kadir", "Kahil", "Kameel", "Karem", "Kateb", "Latif", "Lutfi", "Madani", "Mahir", "Mahomet", "Mahmud", "Malik", "Marid", "Masud", "Muhsin", "Nadim", "Nadir", "Najeeb", "Namir", "Nakid", "Omar", "Qadir", "Raja", "Ramadan", "Rami", "Rani", "Rashad", "Rasin", "Rasul", "Saad", "Sahib", "Sakhr", "Salman", "Sameer", "Saud", "Seif", "Umar", "Talib", "Wad", "Yazeen", "Youssef", "Zafar", "Zaid"];
          break;
        case 4:
          list = ["Jose", "Luis", "Carlos", "Juan", "Jorge", "Pedo", "Jesus", "Manuel", "Santiago", "Matias", "Alejandro", "Mateo", "Diego", "Daniel", "Joaquin", "Tomas", "Gabriel", "Lucas", "Martin", "Emmanuel", "Emiliano", "Juan-Jose", "Adres", "Felipe", "Ignacio", "Leonardo", "Adrian", "Rodrigo", "Angel", "Miguel", "Fernando", "Santino", "Juan", "Vivente", "Thiago", "Maximiliano", "Pablo", "Eduardo", "Juan Diego", "Esteban", "Juan Sebastian", "Franco", "Lautaro", "Miguel", "Juan David", "Ricardo", "Bruno", "Luciano", "Emilio", "Juan Esteban", "Julian", "Valentino", "Javier", "Joshua", "Rafael", "Gael", "Oscar", "Juan Manuel", "Maximo", "Axel", "Facundo", "Ian", "Josue", "Camilo", "Sergio", "Jeronimo", "Mauricio", "Juan Camilo", "Alonso", "Anthony", "Dante", "Patricio", "Hector", "Ivan", "Marcos", "Ramiro", "Alberto", "Matthew", "Mario", "Arturo"];
          break;
        case 5:
          list = ["Hiro", "Hiromi", "Hoc", "Hong", "Hop", "Honghui", "Htoo", "Huan", "Hui", "Hulin", "Hung", "Hyo", "Ichiro", "In-Su", "Isamu", "Isas", "Ja", "Jiro", "Jin", "Joo", "Hun", "Junjie", "Jun'ichi", "Kanaye", "Kang-Dae", "Kasem", "Katsu", "Katsuro", "Kazuki", "Kazuo", "Keiji", "Kenshin", "Keung", "Ki", "Kiet", "Kim", "Kiri", "Kiyoshi", "Koji", "Kuro", "Guro", "Kwan", "Kwang-Sun", "Kyo", "Kyong", "Kong", "Lei", "Lek", "Li", "Liang", "Liu", "Liwei", "Long", "Longwei", "Longwang", "Matalino", "Mee", "Min", "Minh", "Mun-Hee", "Munni", "Myo", "Mayo", "Nam", "Naoki", "Naoko", "Nhan", "Nien", "Nobu", "Nouo", "On", "Park", "Peng", "Ping", "Po", "Po Mahn", "Raiden", "Ringo", "Ronin", "Aki", "Akio", "An", "Aran", "Bae", "Binh", "Bo", "Bojing", "Botan", "Chet", "Chin", "Cho", "Chung", "Chung-Ho", "Dae", "Dai", "Dara", "Dong", "Dongho", "Fa", "Feng", "Gan", "Gen", "Goo", "Gook", "Goro", "Hai", "He", "Hea", "Hee", "Heng", "Hiro", "Hung", "Hong", "Hyo", "Ichiro", "Ru", "Ryota", "Sang", "Saw", "Seiji", "Shan", "Shen", "Shigeo", "Shik", "Shin", "Shinichi", "Shiro", "Shuji", "Son", "Soo", "Sook", "Sum", "Sun", "Tam", "Takahiro", "Takayaki", "Tama", "Thang", "Thong", "Tong", "Tung", "Win", "Wing", "Xianliang", "Xiu", "Yasushi", "Yeo", "Yingpei", "Yo", "Yoichi", "Yuu", "Zhen", "Zongdong"];
          break;
        case 6:
          list = ["Gopal", "Daksha", "Kusika", "Manas", "Dhule", "Aman", "Veer", "Govind", "Pramod", "Chettur", "Peeyush", "Karam", "Rura", "Ishwar", "Ganesh", "Ruldu", "Chandrama", "Mahava", "Vinod", "Vineet", "Krishan", "Amar", "Ranjit", "Roodra", "Pramod", "Ayaan", "Om", "Hira", "Panini", "Jatayu", "Sahadeva"];
          break;
      }
    }
  } else {
    if (State.active.variables.npcSetting.names[0] && State.active.variables.npcSetting.names[2].length > 0) {
      list = State.active.variables.npcSetting.names[2];
    } else {
      switch (cock) {
        case 1:
          list = ["Alice", "Andrea", "Alison", "Amy", "Ashley", "Amanda", "Anna", "Angela", "Amber", "Barbara", "Beth", "Betty", "Brittney", "Brenda", "Carol", "Carla", "Chloe", "Christina", "Diane", "Denise", "Daniella", "Dorothy", "Debra", "Donna", "Elizabeth", "Emily", "Emma", "Evelyn", "Fiona", "Felicity", "Genevieve", "Gloria", "Grace", "Holly", "Hellen", "Heather", "Joan", "Jane", "Janet", "Janice", "Jennifer", "Jessica", "Julia", "Karen", "Kelly", "Kristen", "Kimberly", "Kayla", "Kathleen", "Leah", "Loren", "Lauren", "Linda", "Lisa", "Mary", "Marie", "Melissa", "Michelle", "Natalie", "Naomi", "Nicole", "Nancy", "Ophelia", "Polly", "Pamela", "Rachael", "Rebecca", "Ruth", "Samantha", "Shirley", "Stephanie", "Susan", "Sharon", "Sarah", "Theresa", "Teresa", "Tiffany", "Violet", "Victoria", "Virginia", "Wendy", "Zoe"];
          break;
        case 2:
          list = ["Imani", "Shanice", "Aaliyah", "Precious", "Nia", "Deja", "Diamond", "Asia", "Aliyah", "Jada", "Tierra", "Tiara", "Kiara", "Jazmine", "Jasmin", "Jazmin", "Jasmine", "Alexus", "Shaniqua", "Shabooboo", "Keisha", "Laptoyanqua", "Leshaniqua", "La-Sha", "Sharkiesha", "Kalisha", "Eboleisha", "Latoya", "Rohandra", "Sha'Nay", "Barbeesha", "Latifah", "Sha Nay Nay", "Bon Qui Qui", "Barackeish", "Bon'Quisha", "Brishauwna", "Courtney", "Deoshenique", "Asiah", "Obamaneisha", "Shaniqua", "BeeBee", "Twerkeisha", "LaQuisha", "Moetrisha", "Sharmane", "Livia", "QaQaNero", "Aquafina", "Dasani", "Dreneisha", "Lashay", "Lashaya", "Jametta", "Destini", "Listeriqua", "Kendasha", "Shakenya", "Jarnesha", "Wallica", "Kalona", "Heleena", "Cashea", "Quivia", "Qwanisha", "Kadasha", "Tomesia", "Rashanique", "Queenetta", "Vaniqua", "Yalonda", "Jordina", "Breechelle", "Jabrielle", "Keeshana"];
          break;
        case 3:
          list = ["Myriam", "Nadia", "Faten", "Noura", "Laila", "Habiba", "Ghayda", "reenad", "Bushra", "A", "Maboutou", "Rehab", "Anal", "Amaal", "Ala", "Salsabyl", "Fatima", "Rana", "Nurah", "Norah", "Rehab", "Anal", "Al-anoud", "Nana", "Lulu", "Alsama", "Alia", "Najjat", "sadeen", "Rehab", "Anal", "Sowsan", "Nona", "Lamia", "Lizet", "FoFo", "Doha", "Arwa", "Alaa", "Zain", "Ghada", "Reem", "Raihana", "Ruba", "Mariam", "Ola", "Rehab", "Anal", "Kefaya"];
          break;
        case 4:
          list = ["Sofía", "Isabella", "Valentina", "Emma", "Martina", "Lucifa", "Victoria", "Luciana", "Valeria", "Camila", "Julieta", "Ximena", "Sara", "Daniela", "Emilia", "Renata", "Mía", "Catalina", "Julia", "Elena", "Olivia", "Regina", "Paula", "Natalia", "Mariana", "Samantha", "María", "Antonella", "Gabriela", "Emily", "María-José", "Zoe", "Alma", "Alejandra", "Andrea", "Noa", "Alba", "Aitana", "Amanda", "Abril", "Miranda", "Salomé", "Ana-Sofía", "Carla", "Alexa", "Juana", "Ivanna", "Allison", "Guadalupa", "Antonia"];
          break;
        case 5:
          list = ["Aadarshini", "Ah Lam", "Aika", "Akemi", "Am", "	Arati", "Atsuko", "Ayako", "Azumi", "Bian", "Bindu", "Cai", "Chiharu", "Chun", "Deepti", "Emiyo", "Fang", "Far", "Gembira", "Hae", "Haruko", "Hideko", "Hikari", "Hoa", "Huan", "Hye", "Ja", "Jia", "Jiao", "Jing", "Kalini", "Kameko", "Kana", "Kaoru", "Ki", "Kozue", "Kuniko", "Lan", "Li", "Lin", "Ling", "Machiko", "Mako", "Manjusha", "Masami", "Midori", "Mingxia", "Misumi", "Nadiya", "Nanako", "Niyati", "Nuo", "Padmaja", "Pranali", "Qi", "Qing", "Reena", "Ren", "Riku", "Ruiling", "Sachiko", "Saura", "Sayo", "Setsuko", "Song", "Suzuki", "Tam", "Thao", "Tomoko", "Tu", "Umeko", "Vanida", "Vanna", "Wen", "Xiaoli", "Xiuying", "Yeo", "Yuan", "Yukiko", "Yumiko", "Zhenzhen"];
          break;
        case 6:
          list = ["Sita", "Shalini", "Jayanti", "Manasa", "Nupur", "Sukanya", "Jindan", "Shitala", "Paraminta", "Nupur", "Kunti", "Tivra", "Kavuri", "Indira", "Krishnaa", "Chandi", "Shakti", "Sulini", "Pari", "Indu", "Rani", "Priyanshi", "Minu", "Dakini", "Maya", "Praanvi", "Vajay", "Nupur", "Vayu", "Kareena", "Siddhi", "Durga", "Kunti"];
          break;
      }
    }
  }
  return list[(Math.floor(randomFloat(1) * list.length))];
};
setup.nickRandomizer = function (sex, name, body) {
  var list = ["Error"];
  var result = "Error";
  if (sex == 1 || sex == 4) {
    /*check for some specifics*/
    /*possibly use slutty nickname*/
    result = "none";
  } else {
    /*same as male, but we'll just use slutty names for now*/
    list = ["Jizzy-Lizzy", "Giggle-Tits", "CumDump", "Cum Dumpster", "Cumslut", "Breeder", "Crystal", "Precious", "Princess", "Snooky", "Bianca", "Doorknob", "Cum-Gums", "Count Slutula", "Tramp", "Skanka", "Hoochie", "Despacito", "Hoe", "Cum Depository", "Hoover"];
    result = list[(Math.floor(randomFloat(1) * list.length))];
  }
  return result;
};
setup.surnameRandomizer = function (race) {
  var list = ["error"],
    cock = 0;
  if (State.active.variables.npcSetting.names[0] && State.active.variables.npcSetting.names[3].length > 0) {
    list = State.active.variables.npcSetting.names[3];
  } else {
    switch (race) {
      case "white":
        cock = 1;
        break;
      case "Gaelic":
        cock = 1;
        break;
      case "Nordic":
        cock = 1;
        break;
      case "black":
        cock = 2;
        break;
      case "native American":
        cock = 2;
        break;
      case "middle eastern":
        cock = 3;
        break;
      case "hispanic":
        cock = 4;
        break;
      case "southern European":
        cock = 4;
        break;
      case "southeast Asian":
        cock = 5;
        break;
      case "Asian":
        cock = 5;
        break;
      case "south Asian":
        cock = 6;
        break;
    }
    switch (cock) {
      case 1:
        list = ["Smith", "Johnson", "Miller", "Brown", "Jones", "Williams", "Davis", "Anderson", "Wilson", "Martin", "Taylor", "Moore", "Thompson", "White", "Clark", "Thomas", "Hall", "Baker", "Nelson", "Allen", "Young", "Harris", "King", "Adams", "Lewis", "Walker", "Wright", "Roberts", "Campbell", "Jackson", "Phillips", "Hill", "Scott", "Robinson", "Murphy", "Cook", "Green", "Lee", "Evans", "Peterson", "Morris", "Collins", "Mitchell", "Parker", "Rogers", "Stewart", "Turner", "Wood", "Carter", "Morgan", "Cox", "Kelly", "Edwards", "Bailey", "Ward", "Reed", "Myers", "Sullivan", "Cooper", "Bennett", "Hughes", "Long", "Fisher", "Price", "Russel", "Howard", "Gray", "Bell", "Watson", "Reynolds", "Foster", "Ross", "Olson", "Richardson", "Snyder", "Powell", "Stevens", "Brooks", "Perry", "West", "Cole", "Wagner", "Meyer", "Kennedy", "Barnes", "Hamilton", "Graham", "Schmidt", "Sanders", "McDonald", "Patterson", "Murray", "Gibson", "Wallace", "Butler", "Hayes", "Burns", "Ellis", "Fox", "Stone", "Henderson", "Wells", "Ryan", "Jenkins", "Hansen", "Webb", "James", "Jordan", "Griffin", "Hoffman", "Harrison", "Rose", "Simmons", "Marshall", "Johnston", "Owens", "Nochols", "Weaver", "Kelley", "Mills", "Alexander", "Tucker", "Palmer", "Rice", "Larson", "Simpson", "Shaw", "Carlson", "Hunt", "Black", "Ford", "Peters", "Arnold", "Robertson", "Pierce", "Dunn", "Crawford", "Bryant", "Carpenter", "Porter", "Carrol", "Elliott", "Freeman", "Mason", "Ferguson", "Obrien", "Hart", "Coleman", "Warren", "Jensen", "Gardner", "Hicks", "Stephens", "Henry", "Gordon", "Burke", "Weber", "Duncan", "Richards", "Woods", "Lane", "Payne", "Chapman", "Schultz", "Wheeler", "Ray", "Cunningham", "Walsh", "Knight", "Bishop", "Boyd", "Armstrong", "Schneider", "Hunter", "Spencer", "Lynch", "Morrison", "Riley", "Andrews", "Berry", "Bradley", "Perkins", "Hudson", "Welch", "Gilbert", "Lawrence", "Howell", "Walters", "Holmes", "Williamson", "Jacobs", "Davidson", "Lawson", "Keller", "May", "Dixon", "Day", "Carr", "Dean", "Fowler", "Beck", "Newman", "Hawkins", "Becker", "Bowman", "Greene", "Harper", "Brewer", "Matthews", "Powers", "Willis", "Fuller", "Barrett", "Daniels", "Harvey", "Cohen", "Curtis", "Watkins", "Holland", "Montgomery", "Austin", "Grant", "Garrett", "Erickson", "Lambert", "Klein", "Zimmerman", "Wolfe", "McCarthy", "Stanley", "Barker", "Burton", "Oliver", "Little", "Lucas", "Leonard", "PEarson", "McCoy", "Craig", "Barnett", "Bates", "Gregory", "Hopkins", "O'Connor", "Warner", "Swanson", "Norris", "Hale", "Robbins", "Holt", "Rhodes", "Christensen", "Steele", "McDaniel", "Benson", "Mann", "Shelton", "Lowe", "Higgins", "Fischer", "Doyle", "Griffith", "Reid", "Franklin", "Quinn", "Fleming", "Sutton", "McLaughlin", "Wolf", "Sharp", "Gallagher", "Bowen", "Fitzgerald", "Gross", "Potter", "Caldwell", "Jennings", "Reeves", "Adkins", "Brady", "Lyons", "Mullins", "Wade", "Baldwin", "Vaughn", "Mueller", "Chambers", "Page", "Parks", "Blair", "Fields", "Parsons", "Fletcher", "Watts", "Sims", "Ramsey", "Harman", "Kramer", "Bush", "Horton", "Bauer", "Barber", "Sherman", "Graves", "Chandler", "Barton", "Cummings", "Harmon", "Goodman", "Dawson"];
        break;
      case 2:
        list = ["Williams", "Johnson", "Smith", "Jones", "Brown", "Jackson", "Davis", "Thomas", "Harris", "Robinson", "Taylor", "Wilson", "Moore", "White", "Lewis", "Walker", "Green", "Washington", "Thompson", "Anderson", "Scott", "Carter", "Wright", "Miller", "Hill", "Allen", "Mitchell", "Young", "Lee", "Martin", "Clark", "Turner", "Hall", "King", "Edwards", "Coleman", "James", "Evans", "Bell", "Richardson", "Adams", "Brooks", "Parker", "Jenkins", "Stewart", "Howard", "Campbell", "Simmons", "Sanders", "Henderson", "Collins", "Cooper", "Watson", "Butler", "Alexander", "Bryand", "Nelson", "Morris", "Barnes", "Jordan", "Reed", "Woods", "Dixon", "Roberts", "Gray", "Phillips", "Griffin", "Baker", "Powell", "Bailey", "Ford", "Holmes", "Banks", "Daniels", "Ross", "Rogers", "Perry", "Foster", "Patterson", "Hunter", "Owens", "Grant", "Marshall", "Henry", "Morgan", "Price", "Wallace", "Ward", "Hayes", "Boyd", "Freeman", "Graham", "Hamilton", "Franklin"];
        break;
      case 3:
        list = ["Khan", "Mohamed", "Khoury", "Ali", "Ahmad", "Mohammed", "Alaoui", "Ahmadi", "Alabed", "Alam", "Alami", "Almazan", "Al-Shehri", "Al-Thani", "Al-Qahtani", "Ameen", "Amin", "Anbar", "Ansari", "Arafa", "Arif", "Badran", "Bakur", "Ben-Ahmed", "Benhassi", "Bin-Laden", "Cherifi", "Dukali", "El-Hassan", "Farah", "Gaddafi", "Habibi", "Hadia", "Hammoudi", "Imam", "Iqbal", "Islam", "Jaziri", "Kazim", "Kassem", "Kasmi", "Khalaf", "Khalid", "Khouri", "Lamari", "Maawad", "Majeed", "Malik", "Moussa", "Mostafa", "Mohammad", "Mohamad", "Nasri", "Najada", "Omar", "Rahim", "Rashid", "Safi", "Salib", "Sharif", "Siddiq", "Soudani", "Tahir", "Tammam", "Tayer", "Touati", "Ullah", "Wawa", "Yalaoui", "Yasin", "Yazbeck", "Yousif", "Zafar", "Zahid", "Zahir", "Zaki", "Ziani", "Zoubir", "Zidane", "Dique"];
        break;
      case 4:
        list = ["Garcia", "Rodriguez", "Martinex", "Hernadez", "Lopez", "Gonzalez", "Perez", "Sanchez", "Ramirez", "Torres", "Flores", "Rivera", "Gomez", "Diaz", "Reyes", "Morales", "Cruz", "Ortiz", "Gutierrez", "Chavez", "Ramos", "Gonzales", "Ruiz", "Alvarez", "Mendoza", "Vasquez", "Castillo", "Jimenez", "Moreno", "Romero", "Herrera", "Medina", "Aguilar", "Garza", "Castro", "Vargas", "Fernandez", "Guzman", "Munoz", "Mendez", "Salazar", "Soto", "Delgado", "Penas", "Rios", "Alvarado", "Sandoval", "Contreras", "Valdez", "Guerrero", "Ortega", "Estrada", "Nunez", "Vega", "Santiago", "Dominguez", "Espinoza", "Silva", "Padilla", "Marquez", "Cortez", "Rojas", "Acosta", "Figueroa", "Luna", "Juarez", "Navarro", "Campos", "Molina", "Mejia", "Solis", "Santos", "Salinas", "Trujillo", "Leon", "Rivas", "Montoya", "Colon", "Rosales"];
        break;
      case 5:
        list = ["Nguyen", "Lee", "Kim", "Patel", "Tran", "Chen", "Wong", "Le", "Yang", "Wang", "Chang", "Chan", "Pham", "Li", "Park", "Singh", "Lin", "Liu", "Wu", "Huang", "Lam", "Huynh", "Ho", "Choi", "Yu", "Shah", "Chung", "Khan", "Zhang", "Vang", "Truong", "Ng", "Ohan", "Lim", "Xiong", "Vu", "Cheng", "Cho", "Vo", "Tang", "Ngo", "Chu", "Vo", "Tang", "Ngo", "Chu", "Lu", "Kang", "Ly", "Hong", "Dang", "Dong", "Dong", "Hoang", "Do", "Chin", "Tan", "Lau", "Bui", "Kaur", "Han", "Ma", "Duong", "Leung", "Yee", "Song", "Cheung", "Ali", "Shin", "Yi", "Thao", "Lai", "Hsu", "Fong", "Reyes", "Sung", "Chow", "Young", "Liang", "Lo", "Hwang"];
        break;
      case 6:
        list = ["Achara", "Agarwal", "Khatri", "Ahuja", "Anand", "Laghari", "Patel", "Reddy", "Bakshi", "Babu", "Arya", "Balakrishna", "Banerjee", "Burman", "Bhatt", "Basu", "Bedi", "Varma", "Dara", "Dalal", "Chowdhury", "Chabra", "Chadha", "Chakrabarti", "Chawla", "Ahluwalia", "Amin", "Apte", "Datta", "Deol", "Deshpande", "Dewan", "Lal", "Kohli", "Mangal", "Malhotra", "Jha", "Joshi", "Kapadia", "Iyer", "Jain", "Khanna", "Grover", "Kaur", "Kashyap", "Gokhale", "Ghosh", "Garg", "Dhar", "Gandhi", "Ganguly", "Gupta", "Das", "Chopra", "Dhawan", "Dixit", "Dubey", "Haldar", "Kapoor", "Khurana", "Kulkarni", "Madan", "Bajwa", "Bhasin", "Chandra", "Chauhand", "Deshmukh", "Kayal", "Dhillon", "Goswami", "Goel", "Mallick", "Mahajan", "Kumar", "Mani", "Gill", "Mannan", "Biswas", "Batra", "Bawa", "Mehta", "Mukherjee", "Saxena", "Zacharia", "Shah", "Ray", "Rao", "Parekh", "Singh", "Sharma"];
        break;
    }
  }
  var cunt = list[(Math.floor(randomFloat(1) * list.length))];
  return cunt;
};
setup.colorDecode = function (code) {
  var colors = ["f5f5dc", "ffffff", "ffc0cb", "ff69b4", "add8e6", "fffacd", "dda0dd", "303030", "ff4500", "4169e1", "228b22", "9932cc", "a0522d", "ffd700", "d2b48c", "000080", "f0e68c", "006400", "800000", "d3d3d4", "696969", "505050", "87ceeb", "4682b4", "483d8b", "ffa500", "ffdab9"];
  return "#" + colors[code] || "#" + code;
};
setup.colorWord = function (code) {
  var colors = ["beige", "white", "pink", "pink", "pastel-blue", "pastel-green", "pastel-yellow", "pastel-purple", "black", "red", "blue", "green", "purple", "brown", "yellow", "tan", "navy blue", "khaki", "dark green", "burgundy", "light grey", "grey", "clear", "light bluejean", "bluejean", "dark bluejean", "orange", "fleshtone"];
  return colors[code] || "unknown-color";
};
setup.varanal = function (arg) {
  var varstr, ret, ind, name;
  if ("string" == typeof arg) {
    if (arg.search("$") != -1) {
      ind = arg.search("$") + 1;
      name = arg.slice(ind);
      name = name.trim();
      varstr = "State.active.variables." + name + ";";
      ret = eval(varstr);
      alert(ret);
    } else if (arg.search("_") != -1) {
      ind = arg.search("_") + 1;
      name = arg.slice(ind);
      name = name.trim();
      varstr = "State.temporary." + name + ";";
      ret = eval(varstr);
    } else if (arg.trim() == "true") {
      ret = true;
    } else if (arg.trim() == "false") {
      ret = false;
    } else {
      ret = arg;
    }
  } else {
    ret = arg;
  }
  return ret;
};
setup.calculateBreastStats = function (vol, shoulder, weight) {
  var band, cupNum, cupRaw, cup, bra, tempCup, tempBand, size, bm, cupAdj;
  tempBand = 34;
  switch (shoulder) {
    case 1:
      tempBand = 30;
      break;
    case 2:
      tempBand = 32;
      break;
    case 3:
      tempBand = 34;
      break;
    case 4:
      tempBand = 36;
      break;
    case 5:
      tempBand = 38;
      break;
    case 6:
      tempBand = 40;
      break;
  }
  tempBand += (2 * weight) - 4;
  band = tempBand;
  size = Math.round(vol / 10);
  if (size < 13) {
    tempCup = -50;
  } else if (size < 15) {
    tempCup = 0;
  } else if (size < 25) {
    tempCup = 1;
  } else if (size < 30) {
    tempCup = 2;
  } else if (size < 35) {
    tempCup = 3;
  } else if (size < 37) {
    tempCup = 4; /*A-Cup*/
  } else if (size < 39) {
    tempCup = 5;
  } else if (size < 41) {
    tempCup = 6;
  } else if (size < 44) {
    tempCup = 7; /*B-Cup*/
  } else if (size < 46) {
    tempCup = 8;
  } else if (size < 49) {
    tempCup = 9;
  } else if (size < 52) {
    tempCup = 10; /*C-Cup*/
  } else if (size < 56) {
    tempCup = 11;
  } else if (size < 59) {
    tempCup = 12;
  } else if (size < 63) {
    tempCup = 13; /*D-Cup*/
  } else if (size < 67) {
    tempCup = 14;
  } else if (size < 71) {
    tempCup = 15;
  } else if (size < 76) {
    tempCup = 16; /*E-Cup*/
  } else if (size < 80) {
    tempCup = 17;
  } else if (size < 85) {
    tempCup = 18;
  } else if (size < 90) {
    tempCup = 19; /*F-Cup*/
  } else if (size < 96) {
    tempCup = 20;
  } else if (size < 101) {
    tempCup = 21;
  } else if (size < 107) {
    tempCup = 22; /*G-Cup*/
  } else if (size < 113) {
    tempCup = 23;
  } else if (size < 119) {
    tempCup = 24;
  } else if (size < 126) {
    tempCup = 25; /*H-Cup*/
  } else if (size < 132) {
    tempCup = 26;
  } else if (size < 139) {
    tempCup = 27;
  } else if (size < 146) {
    tempCup = 28;
  } else if (size < 154) {
    tempCup = 29;
  } else if (size < 161) {
    tempCup = 30;
  } else if (size < 169) {
    tempCup = 31;
  } else if (size < 177) {
    tempCup = 32;
  } else if (size < 177) {
    tempCup = 33;
  } else if (size < 185) {
    tempCup = 34;
  } else if (size < 194) {
    tempCup = 35;
  } else if (size < 202) {
    tempCup = 36;
  } else if (size < 211) {
    tempCup = 37;
  } else if (size < 220) {
    tempCup = 38;
  } else if (size < 230) {
    tempCup = 39;
  } else if (size < 239) {
    tempCup = 40;
  } else if (size < 249) {
    tempCup = 41;
  } else if (size < 259) {
    tempCup = 42;
  } else if (size < 269) {
    tempCup = 43;
  } else if (size < 280) {
    tempCup = 44;
  } else if (size < 290) {
    tempCup = 45;
  } else if (size < 301) {
    tempCup = 46;
  } else if (size < 312) {
    tempCup = 47;
  } else if (size < 324) {
    tempCup = 48;
  } else if (size < 335) {
    tempCup = 49;
  } else if (size < 347) {
    tempCup = 50;
  } else if (size < 359) {
    tempCup = 51;
  } else if (size < 371) {
    tempCup = 52;
  } else if (size < 384) {
    tempCup = 53;
  } else if (size < 396) {
    tempCup = 54;
  } else if (size < 409) {
    tempCup = 55;
  } else if (size < 422) {
    tempCup = 56;
  } else if (size < 436) {
    tempCup = 57;
  } else if (size < 449) {
    tempCup = 58;
  } else if (size < 463) {
    tempCup = 59;
  } else if (size < 477) {
    tempCup = 60;
  } else if (size < 491) {
    tempCup = 61;
  } else if (size < 506) {
    tempCup = 62;
  } else if (size < 520) {
    tempCup = 63;
  } else if (size < 535) {
    tempCup = 64;
  } else if (size < 550) {
    tempCup = 65;
  } else if (size < 566) {
    tempCup = 66;
  } else if (size < 581) {
    tempCup = 67;
  } else if (size < 597) {
    tempCup = 68;
  } else if (size < 613) {
    tempCup = 69;
  } else if (size < 629) {
    tempCup = 70;
  } else if (size < 646) {
    tempCup = 71;
  } else if (size < 662) {
    tempCup = 72;
  } else if (size < 679) {
    tempCup = 73;
  } else if (size < 696) {
    tempCup = 74;
  } else if (size < 714) {
    tempCup = 75;
  } else if (size < 731) {
    tempCup = 76;
  } else if (size < 749) {
    tempCup = 77;
  } else if (size < 767) {
    tempCup = 78;
  } else if (size < 785) {
    tempCup = 79;
  } else if (size < 804) {
    tempCup = 80;
  } else if (size < 822) {
    tempCup = 81;
  } else {
    tempCup = 99;
  }
  bm = (17 - (tempBand / 2)) * 3;
  cupAdj = tempCup + bm;
  if (tempCup < 0) {
    cupNum = -1;
    cupRaw = -1;
    cup = "nonexistant";
    bra = "playing dress-up";
  } else if (tempCup <= 0) {
    cupNum = 0;
    cupRaw = 0;
    cup = "budding";
    bra = tempBand + "AAA";
  } else {
    cupNum = cupAdj;
    cupRaw = tempCup;
    var tempCupStart = Math.round((tempCup + 2) / 3);
    var tempCupStop = tempCupStart + 1;
    if (tempCupStart == 1) {
      tempCupStart = 0;
    }
    if (tempCupStop == 1) {
      tempCupStop += 1;
    }
    var string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var tempCupLet = string.slice(tempCupStart, tempCupStop);
    var tempCupFraq = ((tempCup + 2) / 3) % 1;
    if (tempCupFraq != 0) {
      tempCupFraq = Math.round(tempCupFraq);
      if (tempCupFraq == 1) {
        tempCupLet = "small " + tempCupLet;
      } else {
        tempCupLet = "large " + tempCupLet;
      }
    }
    tempCupLet += "-cup";
    cup = tempCupLet;
    var braLet;
    if (cupAdj <= 0) {
      bra = tempBand + "AAA";
    } else {
      tempCupStart = Math.round((cupAdj + 2) / 3);
      tempCupStop = tempCupStart + 1;
      if (tempCupStart <= 0) {
        braLet = "AAA";
      } else {
        if (tempCupStart == 1) {
          tempCupStart = 0;
        }
        if (tempCupStop == 1) {
          tempCupStop += 1;
        }
        string = "AAABCDEFGHIJKLMNOPQRSTUVWXYZ";
        braLet = string.slice(tempCupStart, tempCupStop);
        bra = tempBand + braLet;
      }
    }
  }
  return [band, cupNum, cupRaw, cup, bra];
};
setup.deepThoughts = function (num) {
  var r;
  var list = ["“DON'T TOUCH!” must be terrifying to read in braille.", "If you want to learn to hate a song just make it your morning alarm.", "The fact that ‘Mirror’ isn’t a palindrome is a missed opportunity", "The only difference between bands and solo artists is whether the instrumentalists get credited or not.", "Rather than saying that a band has broken up, we should say that they’ve disbanded.", "Barn owls must have been stoked when barns were invented.", "Life is like a RPG, only difference is when you reach the highest level your character gets deleted.", "The surface on most planets is breathtaking.", "Life is like a box of chocolates - it looks like you have all the choices at the beginning, but once everyone who is more important than you has had their turn, all that’s left is the shit nobody wants.", "The good thing about being ugly is that when girls laugh at your jokes you know they’re funny.", "‪If most animals don’t recognize their own reflection because their brains aren’t complex enough, there could be a chance humans observe things we cannot comprehend and don’t know we cannot comprehend because our brains lack that complexity.", "Snakes are just tails with faces.", "Jerky is more like an animal cracker than animal crackers are.", "Tobacco companies are killing their best customers, while condom companies are preventing their future customers.", "How did cats aquire such a fond taste for fish if they’re afraid of the water?", "You can put “fuck”, or “fucking” pretty fucking much fucking anywhere in a fucking sentence and fucking still be grammatically fucking correct.", "If portal guns were real, it would revolutionize glory holes.", "Every teacher born in England is an english teacher.", "If you choose not to have kids, you’re literally breaking a family tradition that goes back millions of years.", "When you’re a kid, dick jokes are considered adult content, but when you’re an adult, they’re considered immature.", "Cops are like strippers; they can touch you but you can’t touch them.", "You can go your entire life without drinking water or eating.", "It is very possible that at some point Tarzan tried to mate with a gorrila.", "Its common for babies to fall asleep and wake up in different locations all the time, but as an adult the idea of that happening is terrifying.", "It doesn’t matter if you’re gay or straight, you still probably find 95% of people unattractive.", "Batman is essentially a Pay2Win Superhero", "Pizza is a real-time pie chart of how much pizza is left.", "If an uphill battle is hard, and things going downhill are things going wrong, apparently there are no good hills.", "The people who ‘don’t care where we eat’ also happen to be the pickiest.", "There are probably a plethora of people with tattoos of Hollywood stars just dreading the day they find out they’re rapists.", "You’ll always be no more than 12,451 miles from anywhere on Earth. So when they tell you the world is a big place just look at the mileage on your car.", "When you park your car, you literally leave your most expensive possession lying out in the road.", "If snakes lost their legs for giving Adam and Eve the apple of enlightenment, clams must have really fucked up.", "People with bad spelling might have the best passwords.", "We live in a time where companies that make obsolete/non-competetive products can blame their losses on people “killing the industry”", "The worst part about ‘being the bigger man’ is letting the other person think they are right.", "Do porn editors get in trouble for not looking at porn during working hours?", "Hypochondria is the only sickness hypochondriacs don’t think they have.", "Books should number their pages in descending order so you know how many pages you have left.", "If you die during an orgasm, you’re coming and going at the same time.", "If someone from 2031 traveled back to 2001 and wrote a novel about 2031 without people knowing he was a time traveler, it would be categorized as dystopian fiction.", "The shovel was a ground breaking invention.", "Birthday gifts are just a reward for not dying.", "Trying to fall asleep is basically “fake it till you make it”.", "Out of all the things that “Taste like chicken”, eggs are ironically not one of them.", "Everybody has only three minutes left to live but with every breath you restart the timer.", "The fear of being alone in the dark, is actually the fear of not being alone in the dark.", "If you love someone, showing them is better than telling them. If you stop loving someone, telling them is better than showing them.", "People who need glasses had to pay extra for life’s HD option.", "To refer to all women as bitches isn’t just a blanket statement, it’s a broad generalization.", "Are women that drive small cars compensating for having a massive vagina?", "What if “Sarcasm is the lowest form of wit” was a sarcastic statement?", "The caveman that first successfully convinced a cavewoman to give him a blowjob, without getting bitten for trying, was probably a hero and a legend to all of the other cavemen.", "Nowadays, the best way to not leave a paper trail, is to do everything on paper.", "Every corpse on Mount Everest was once an extremely motivated person.", "Beef jerky is just cow raisins.", "It is only when your search history is void of anything suspicious, that it is the most suspicious.", "Currently Earth is undefeated in the Miss Universe Pageant.", "The color gray is the most fascinating color. It possesses an equal and paradoxical combination of the presence of all visible light and the absence of all visible light."];
  if (num == 0) {
    r = random(0, list.length);
  } else if ("string" == typeof num) {
    r = eval(num);
    if (r >= list.length) {
      r = r % list.length;
    }
  } else {
    r = num;
  }
  return list[r];
};
setup.clothSort = function (arr, j) {
  let list = [],
    v = [],
    length = arr.length,
    t;
  for (let i = 0; i < length; i++) {
    t = arr[i][j];
    if (!v.includes(t)) {
      v.push(t);
    }
  }
  v.sort(function (a, b) {
    return a - b;
  });
  for (let i = 0, l = v.length; i < l; i++) {
    for (let k = 0; k < length; k++) {
      if (arr[k][j] == v[i]) {
        list.push(arr[k]);
      }
    }
  }
  return list;
};
setup.eliteStats = function () {
  let msg = "Example of running a game function!<br><br>Awesome Person Tool:<br>";
  msg += "PC Max Energy: " + State.active.variables.PC.body.energy + "<br>";
  msg += "SelfDefense Skill: " + (State.active.variables.PC.body.tone * random(1, 3)) + "<br>";
  msg += "Sperm-in-Womb: 0/0/0";
  return msg;
};
setup.statusSave = function () {
  State.active.variables.sched.runop = [setup.AW.code.compress(JSON.stringify(State.active.variables.PC)), setup.AW.code.compress(JSON.stringify(State.active.variables.job)), setup.AW.code.compress(JSON.stringify(State.active.variables.home)), State.active.variables.AW.cash * 13];
};
setup.statusLoad = function () {
  State.active.variables.PC = JSON.parse(setup.AW.code.decompress(State.active.variables.sched.runop[0]));
  State.active.variables.job = JSON.parse(setup.AW.code.decompress(State.active.variables.sched.runop[1]));
  State.active.variables.home = JSON.parse(setup.AW.code.decompress(State.active.variables.sched.runop[2]));
  State.active.variables.AW.cash = Math.round(State.active.variables.sched.runop[3] / 13);
  if (Math.round(State.active.variables.AW.cash) != Math.round(State.active.variables.sched.runop[3] / 13)) {
    var msg = "''FATAL ERROR''<br>An unknown memory error has occured. One or more problems were detected in the live variable memory system. This problem can corrupt game saves because accumulating errors are not immediately noticeable. It is highly recommended that you completely close your browser and open it again before continuing, or simply restart your computer.<br><br>If you continue to get this error after restarting, the save you are using may have been corrupted. Also, while there is no way to determine the cause of the problem with your computer's memory, some programs can manipulate memory in a way that will cause this class of error. Try playing AW with any extra programs closed to see if that resolves the problem.";
    State.active.variables.AW.error = msg;
    state.display("errorPassage");
  }
};