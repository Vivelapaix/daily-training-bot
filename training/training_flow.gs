function isTrainingCallbackCommand(command) {
    return command.startsWith('training');
}


const TRAINING_ALL_COMMANDS = {
    'training': 0
};


function executeTrainingCallbackCommand(chat_id, user_id, command) {
    let operation = TRAINING_ALL_COMMANDS[command] ?? -1;
    //SpreadsheetApp.getActive().getSheetByName("Sheet1").appendRow([chat_id, user_id, command]);
    switch (operation) {
        case -1:
            console.log("Unknown callback command");
            break;
        case 0:
            sendText(chat_id, 'Пока функциональность не доделана', fromTrainingToMainMenuInlineMenu);
            break;
        default:
            console.log("Sorry, we are out of " + expr + ".");
    }
}