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
            sendText(chat_id, 'Пока функциональность не доделана', fromDaysToMainMenuInlineMenu);
            break;
        default:
            console.log("Sorry, we are out of " + expr + ".");
    }
}