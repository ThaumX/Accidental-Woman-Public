/*
███████╗███████╗ ██████╗ █████╗ ██████╗ ███████╗
██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝
█████╗  ███████╗██║     ███████║██████╔╝█████╗
██╔══╝  ╚════██║██║     ██╔══██║██╔═══╝ ██╔══╝
███████╗███████║╚██████╗██║  ██║██║     ███████╗
╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝

██╗  ██╗ █████╗ ████████╗ ██████╗██╗  ██╗
██║  ██║██╔══██╗╚══██╔══╝██╔════╝██║  ██║
███████║███████║   ██║   ██║     ███████║
██╔══██║██╔══██║   ██║   ██║     ██╔══██║
██║  ██║██║  ██║   ██║   ╚██████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝
*/

interface setupEscapeHatch {
  init: () => void;
  click: () => void;
  close: () => void;
  exec: () => void;
  sit: string;
}

setup.escape = {
  init() {
    const butt = `<div id="escapeHatchMsg"></div><div id="ehatchCont">[img[IMG_EscapeIcon]]&nbsp;<<button "ESCAPE">><<run setup.escape.click()>><</button>></div>`;
    aw.replace("#escapeHatch", butt);
  },
  click() {
    const warn = `<div id="ehatchMessage"><center>[img[IMG-escapeButton]]</center><br><<if aw.passage.tags.includes("badend")>><center>The Escape Hatch function is disabled on bad-end screens.<br><br><<button "CANCEL">><<run setup.escape.close()>><</button>></center><<else>><center><<button "CANCEL">><<run setup.escape.close()>><</button>><<tab>><<button "ESCAPE">><<run setup.escape.exec()>><</button>></center><</if>></div>`;
    aw.replace("#escapeHatchMsg", warn);
  },
  close() {
    aw.replace("#escapeHatchMsg", "");
  },
  exec() {
    ↂ.flag.escapeHatch = (setup.escape.sit !== "none") ? setup.escape.sit : "Other";
    aw.replace("#awUIcontainer", "");
    switch(setup.escape.sit) {
      case "scene":
      case "date":
      case "hang":
        setup.scenario.close();
        break;
      case "interact":
        setup.interact.exit();
        setTimeout(() => setup.interact.kill(), 1500);
        break;
      case "sleep":
        aw.go("SleepForward");
        break;
      case "morning":
      case "week":
        aw.go(setup.startsPassage);
        break;
      case "jobbing":
        setup.job.endJob();
        break;
      default:
        setup.map.nav("home", "foyer");
    }
    setup.escape.sit = "none";
    setup.escape.close();
  },
  sit: "none",
};

