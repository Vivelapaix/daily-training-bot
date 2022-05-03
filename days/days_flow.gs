function isDaysCallbackCommand(command) {
    return command.startsWith('days');
}


const DAYS_ALL_COMMANDS = {
    'days': 0
};


function executeDaysCallbackCommand(chat_id, user_id, command) {
    let do_command = DAYS_ALL_COMMANDS[command] ?? -1;
    //SpreadsheetApp.getActive().getSheetByName("Sheet1").appendRow([chat_id, user_id, command]);
    switch (do_command) {
        case -1:
            console.log("Unknown callback command");
            break;
        case 0:
            sendText(chat_id, getTextForTrainingDays(user_id), fromDaysToMainMenuInlineMenu);
            break;
        default:
            console.log("Sorry, we are out of " + expr + ".");
    }
}


function getTextForTrainingDays(user_id) {
    let userSheetId = findUserSheetId(user_id);
    let driver = SpreadsheetApp.openById(userSheetId);

    return Array.from({ length: 7 }, (_, index) => index).map(dayNum => {
             var dayName = days[dayNum];
             var row = driver.getSheetByName(dayName).getLastRow();
             return row > 1 ? `<b>${dayName}: есть тренировка</b>` : `${dayName}`;
           }).join('\n');
}
