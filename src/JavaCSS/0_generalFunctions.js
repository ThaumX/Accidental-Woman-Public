function calculateNPCATR(main,body){
  return [2,1,1];
}
function nameRandomizer(sex,race){
  var list = ["error"];
  if(sex == 1 || sex == 4){
    list = ["John","Joe","NoName"];
  }else{
    switch(race){
      case "white", "Gaelic", "Nordic", "native American":
        list = ["Alice","Andrea","Alison","Amy","Ashley","Amanda","Anna","Angela","Amber","Barbara","Beth","Betty","Brittney","Brenda","Carol","Carla","Chloe","Christina","Diane","Denise","Daniella","Dorothy","Debra","Donna","Elizabeth","Emily","Emma","Evelyn","Fiona","Felicity","Genevieve","Gloria","Grace","Holly","Hellen","Heather","Joan","Jane","Janet","Janice","Jennifer","Jessica","Julia","Karen","Kelly","Kristen","Kimberly","Kayla","Kathleen","Leah","Loren","Lauren","Linda","Lisa","Mary","Marie","Melissa","Michelle","Natalie","Naomi","Nicole","Nancy","Ophelia","Polly","Pamela","Rachael","Rebecca","Ruth","Samantha","Shirley","Stephanie","Susan","Sharon","Sarah","Theresa","Teresa","Tiffany","Violet","Victoria","Virginia","Wendy","Zoe"];
        break;
      case "black":
        list = ["Imani","Shanice","Aaliyah","Precious","Nia","Deja","Diamond","Asia","Aliyah","Jada","Tierra","Tiara","Kiara","Jazmine","Jasmin","Jazmin","Jasmine","Alexus","Shaniqua","Shabooboo","Keisha","Laptoyanqua","Leshaniqua","La-Sha","Sharkiesha","Kalisha","Eboleisha","Latoya","Rohandra","Sha'Nay","Barbeesha","Latifah"];
        break;
      case "middle eastern":
        list = ["Myriam","Nadia","Faten","Noura","Laila","Habiba","Ghayda","reenad","Bushra","A","Maboutou","Rehab","Anal","Amaal","Ala","Salsabyl","Fatima","Rana","Nurah","Norah","Rehab","Anal","Al-anoud","Nana","Lulu","Alsama","Alia","Najjat","sadeen","Rehab","Anal","Sowsan","Nona","Lamia","Lizet","FoFo","Doha","Arwa","Alaa","Zain","Ghada","Reem","Raihana","Ruba","Mariam","Ola","Rehab","Anal","Kefaya"];
        break;
      case "hispanic", "southern European":
        list = ["Sofía","Isabella","Valentina","Emma","Martina","Lucifa","Victoria","Luciana","Valeria","Camila","Julieta","Ximena","Sara","Daniela","Emilia","Renata","Mía","Catalina","Julia","Elena","Olivia","Regina","Paula","Natalia","Mariana","Samantha","María","Antonella","Gabriela","Emily","María-José","Zoe","Alma","Alejandra","Andrea","Noa","Alba","Aitana","Amanda","Abril","Miranda","Salomé","Ana-Sofía","Carla","Alexa","Juana","Ivanna","Allison","Guadalupe","Antonia"];
        break;
      case "southeast Asian", "Asian", "south Asian":
        list = ["Aadarshini", "Ah Lam", "Aika", "Akemi", "Am", "	Arati", "Atsuko", "Ayako", "Azumi", "Bian", "Bindu", "Cai", "Chiharu", "Chun", "Deepti", "Emiyo", "Fang", "Far", "Gembira", "Hae", "Haruko", "Hideko", "Hikari", "Hoa", "Huan", "Hye", "Ja", "Jia", "Jiao", "Jing", "Kalini", "Kameko", "Kana", "Kaoru", "Ki", "Kozue", "Kuniko", "Lan", "Li", "Lin", "Ling", "Machiko", "Mako", "Manjusha", "Masami", "Midori", "Mingxia", "Misumi", "Nadiya", "Nanako", "Niyati", "Nuo", "Padmaja", "Pranali", "Qi", "Qing", "Reena", "Ren", "Riku", "Ruiling", "Sachiko", "Saura", "Sayo", "Setsuko", "Song", "Suzuki", "Tam", "Thao", "Tomoko", "Tu", "Umeko", "Vanida", "Vanna", "Wen", "Xiaoli", "Xiuying", "Yeo", "Yuan", "Yukiko", "Yumiko", "Zhenzhen"];
        break;
    }
  }
  return list[(Math.floor(random()*list.length))];
}
function nickRandomizer(sex,name,body){
  var list = ["Error"];
  var result = "Error";
  if(sex == 1 || sex == 4){
    /*check for some specifics*/
    /*possibly use slutty nickname*/
    result = "none";
  }else{
    /*same as male, but we'll just use slutty names for now*/
    list = ["Jizzy-Lizzy","Giggle-Tits","CumDump","Cum Dumpster","Cumslut","Breeder","Crystal","Precious","Princess","Snooky","Bianca","Doorknob","Cum-Gums","Count Slutula","Tramp","Skanka","Hoochie","Despacito","Hoe","Cum Depository","Hoover"];
    result = list[(Math.floor(random()*list.length))];
  }
  return result;
}
function surnameRandomizer(race){
  var list = ["error"];
  switch(race){
    case "white", "Gaelic", "Nordic":
      list = ["Smith","Johnson","Miller","Brown","Jones","Williams","Davis","Anderson","Wilson","Martin","Taylor","Moore","Thompson","White","Clark","Thomas","Hall","Baker","Nelson","Allen","Young","Harris","King","Adams","Lewis","Walker","Wright","Roberts","Campbell","Jackson","Phillips","Hill","Scott","Robinson","Murphy","Cook","Green","Lee","Evans","Peterson","Morris","Collins","Mitchell","Parker","Rogers","Stewart","Turner","Wood","Carter","Morgan","Cox","Kelly","Edwards","Bailey","Ward","Reed","Myers","Sullivan","Cooper","Bennett","Hughes","Long","Fisher","Price","Russel","Howard","Gray","Bell","Watson","Reynolds","Foster","Ross","Olson","Richardson","Snyder","Powell","Stevens","Brooks","Perry","West","Cole","Wagner","Meyer","Kennedy","Barnes","Hamilton","Graham","Schmidt","Sanders","McDonald","Patterson","Murray","Gibson","Wallace","Butler","Hayes","Burns","Ellis","Fox","Stone","Henderson","Wells","Ryan","Jenkins","Hansen","Webb","James","Jordan","Griffin","Hoffman","Harrison","Rose","Simmons","Marshall","Johnston","Owens","Nochols","Weaver","Kelley","Mills","Alexander","Tucker","Palmer","Rice","Larson","Simpson","Shaw","Carlson","Hunt","Black","Ford","Peters","Arnold","Robertson","Pierce","Dunn","Crawford","Bryant","Carpenter","Porter","Carrol","Elliott","Freeman","Mason","Ferguson","Obrien","Hart","Coleman","Warren","Jensen","Gardner","Hicks","Stephens","Henry","Gordon","Burke","Weber","Duncan","Richards","Woods","Lane","Payne","Chapman","Schultz","Wheeler","Ray","Cunningham","Walsh","Knight","Bishop","Boyd","Armstrong","Schneider","Hunter","Spencer","Lynch","Morrison","Riley","Andrews","Berry","Bradley","Perkins","Hudson","Welch","Gilbert","Lawrence","Howell","Walters","Holmes","Williamson","Jacobs","Davidson","Lawson","Keller","May","Dixon","Day","Carr","Dean","Fowler","Beck","Newman","Hawkins","Becker","Bowman","Greene","Harper","Brewer","Matthews","Powers","Willis","Fuller","Barrett","Daniels","Harvey","Cohen","Curtis","Watkins","Holland","Montgomery","Austin","Grant","Garrett","Erickson","Lambert","Klein","Zimmerman","Wolfe","McCarthy","Stanley","Barker","Burton","Oliver","Little","Lucas","Leonard","PEarson","McCoy","Craig","Barnett","Bates","Gregory","Hopkins","O'Connor","Warner","Swanson","Norris","Hale","Robbins","Holt","Rhodes","Christensen","Steele","McDaniel","Benson","Mann","Shelton","Lowe","Higgins","Fischer","Doyle","Griffith","Reid","Franklin","Quinn","Fleming","Sutton","McLaughlin","Wolf","Sharp","Gallagher","Bowen","Fitzgerald","Gross","Potter","Caldwell","Jennings","Reeves","Adkins","Brady","Lyons","Mullins","Wade","Baldwin","Vaughn","Mueller","Chambers","Page","Parks","Blair","Fields","Parsons","Fletcher","Watts","Sims","Ramsey","Harman","Kramer","Bush","Horton","Bauer","Barber","Sherman","Graves","Chandler","Barton","Cummings","Harmon","Goodman","Dawson"];
      break;
    case "black", "native American":
      list = ["Williams","Johnson","Smith","Jones","Brown","Jackson","Davis","Thomas","Harris","Robinson","Taylor","Wilson","Moore","White","Lewis","Walker","Green","Washington","Thompson","Anderson","Scott","Carter","Wright","Miller","Hill","Allen","Mitchell","Young","Lee","Martin","Clark","Turner","Hall","King","Edwards","Coleman","James","Evans","Bell","Richardson","Adams","Brooks","Parker","Jenkins","Stewart","Howard","Campbell","Simmons","Sanders","Henderson","Collins","Cooper","Watson","Butler","Alexander","Bryand","Nelson","Morris","Barnes","Jordan","Reed","Woods","Dixon","Roberts","Gray","Phillips","Griffin","Baker","Powell","Bailey","Ford","Holmes","Banks","Daniels","Ross","Rogers","Perry","Foster","Patterson","Hunter","Owens","Grant","Marshall","Henry","Morgan","Price","Wallace","Ward","Hayes","Boyd","Freeman","Graham","Hamilton","Franklin"];
      break;
    case "middle eastern":
      list = ["Khan","Mohamed","Khoury","Ali","Ahmad","Mohammed","Alaoui","Ahmadi","Alabed","Alam","Alami","Almazan","Al-Shehri","Al-Thani","Al-Qahtani","Ameen","Amin","Anbar","Ansari","Arafa","Arif","Badran","Bakur","Ben-Ahmed","Benhassi","Bin-Laden","Cherifi","Dukali","El-Hassan","Farah","Gaddafi","Habibi","Hadia","Hammoudi","Imam","Iqbal","Islam","Jaziri","Kazim","Kassem","Kasmi","Khalaf","Khalid","Khouri","Lamari","Maawad","Majeed","Malik","Moussa","Mostafa","Mohammad","Mohamad","Nasri","Najada","Omar","Rahim","Rashid","Safi","Salib","Sharif","Siddiq","Soudani","Tahir","Tammam","Tayer","Touati","Ullah","Wawa","Yalaoui","Yasin","Yazbeck","Yousif","Zafar","Zahid","Zahir","Zaki","Ziani","Zoubir","Zidane","Dique"];
      break;
    case "hispanic", "southern European":
      list = ["Garcia","Rodriguez","Martinex","Hernadez","Lopez","Gonzalez","Perez","Sanchez","Ramirez","Torres","Flores","Rivera","Gomez","Diaz","Reyes","Morales","Cruz","Ortiz","Gutierrez","Chavez","Ramos","Gonzales","Ruiz","Alvarez","Mendoza","Vasquez","Castillo","Jimenez","Moreno","Romero","Herrera","Medina","Aguilar","Garza","Castro","Vargas","Fernandez","Guzman","Munoz","Mendez","Salazar","Soto","Delgado","Penas","Rios","Alvarado","Sandoval","Contreras","Valdez","Guerrero","Ortega","Estrada","Nunez","Vega","Santiago","Dominguez","Espinoza","Silva","Padilla","Marquez","Cortez","Rojas","Acosta","Figueroa","Luna","Juarez","Navarro","Campos","Molina","Mejia","Solis","Santos","Salinas","Trujillo","Leon","Rivas","Montoya","Colon","Rosales"];
      break;
    case "southeast Asian", "Asian":
      list = ["Nguyen","Lee","Kim","Patel","Tran","Chen","Wong","Le","Yang","Wang","Chang","Chan","Pham","Li","Park","Singh","Lin","Liu","Wu","Huang","Lam","Huynh","Ho","Choi","Yu","Shah","Chung","Khan","Zhang","Vang","Truong","Ng","Ohan","Lim","Xiong","Vu","Cheng","Cho","Vo","Tang","Ngo","Chu","Vo","Tang","Ngo","Chu","Lu","Kang","Ly","Hong","Dang","","Dong","Hoang","Do","Chin","Tan","Lau","Bui","Kaur","Han","Ma","Duong","Leung","Yee","Song","Cheung","Ali","Shin","Yi","Thao","Lai","Hsu","Fong","Reyes","Sung","Chow","Young","Liang","Lo","Hwang"];
      break;
    case "south Asian":
      list = ["Achara","Agarwal","Khatri","Ahuja","Anand","Laghari","Patel","Reddy","Bakshi","Babu","Arya","Balakrishna","Banerjee","Burman","Bhatt","Basu","Bedi","Varma","Dara","Dalal","Chowdhury","Chabra","Chadha","Chakrabarti","Chawla","Ahluwalia","Amin","Apte","Datta","Deol","Deshpande","Dewan","Lal","Kohli","Mangal","Malhotra","Jha","Joshi","Kapadia","Iyer","Jain","Khanna","Grover","Kaur","Kashyap","Gokhale","Ghosh","Garg","Dhar","Gandhi","Ganguly","Gupta","Das","Chopra","Dhawan","Dixit","Dubey","Haldar","Kapoor","Khurana","Kulkarni","Madan","Bajwa","Bhasin","Chandra","Chauhand","Deshmukh","Kayal","Dhillon","Goswami","Goel","Mallick","Mahajan","Kumar","Mani","Gill","Mannan","Biswas","Batra","Bawa","Mehta","Mukherjee","Saxena","Zacharia","Shah","Ray","Rao","Parekh","Singh","Sharma"];
      break;
  }
  return list[(Math.floor(random()*list.length))];
}