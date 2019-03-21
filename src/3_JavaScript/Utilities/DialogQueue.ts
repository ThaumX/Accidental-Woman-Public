/*
██████╗ ██╗ █████╗ ██╗      ██████╗  ██████╗
██╔══██╗██║██╔══██╗██║     ██╔═══██╗██╔════╝
██║  ██║██║███████║██║     ██║   ██║██║  ███╗
██║  ██║██║██╔══██║██║     ██║   ██║██║   ██║
██████╔╝██║██║  ██║███████╗╚██████╔╝╚██████╔╝
╚═════╝ ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝

 ██████╗ ██╗   ██╗███████╗██╗   ██╗███████╗
██╔═══██╗██║   ██║██╔════╝██║   ██║██╔════╝
██║   ██║██║   ██║█████╗  ██║   ██║█████╗
██║▄▄ ██║██║   ██║██╔══╝  ██║   ██║██╔══╝
╚██████╔╝╚██████╔╝███████╗╚██████╔╝███████╗
 ╚══▀▀═╝  ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝
*/

aw.diAlertQueue = [];
aw.dialogQueue = [];

aw.dialogOpen = function(): void {

  if (aw.diAlertQueue.length < 1 && aw.dialogQueue.length < 1) {
    // no queued items, close
    return;
  }
  if (aw.diAlertQueue.length > 0) {
    // do a UI alert
    const alItem = aw.diAlertQueue.shift();
    UI.alert(alItem);
  } else if (aw.dialogQueue.length > 0) {
    // do a dialog item
    const diaItem = aw.dialogQueue.shift();
    if (Array.isArray(diaItem) && typeof diaItem[0] === "string") {
      setup.dialog(diaItem[0], diaItem[1]);
    }
  }
  // fallthrough - no items to open
};
