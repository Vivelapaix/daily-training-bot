function isTrainingCallbackCommand(command) {
    return command.startsWith('training');
}


const TRAINING_ALL_COMMANDS = {
    'training': 0,
    'training_day_choose': 1,
    'training_day_preview': 2,
    'training_day_start': 3,
};


function executeTrainingCallbackCommand(chat_id, user_id, command_source) {
    SpreadsheetApp.getActive().getSheetByName("Sheet1").appendRow([chat_id, user_id, command_source]);
    var [command, ...other ] = command_source.split(";");
    Logger.log(command_source);
    Logger.log(command);
    Logger.log(other);
    Logger.log(command_source.split(";"));
    let operation = TRAINING_ALL_COMMANDS[command] ?? -1;
    //
    switch (operation) {
        case -1:
            console.log("Unknown callback command");
            break;
        case 0:
            sendText(chat_id, 'Выберите день тренировки:', createButtonsForTrainingDays(user_id));
            break;
        case 1:
            sendText(chat_id, other[0], createCurrentTrainingDayMenu(other[0]));
            break; 
        case 2:
            sendText(chat_id, 'Тут будет превью всех упражнений',  createButtonBackToTrainingDayChoose(other[0]));
            break;
        case 3:
            sendText(chat_id, 'Начали тренировку', createButtonBackToTrainingDayChoose(other[0]));
            break;                      
        default:
            console.log("Sorry, we are out of " + expr + ".");
    }
}


function createButtonsForTrainingDays(user_id) {
    let userSheetId = findUserSheetId(user_id);
    let driver = SpreadsheetApp.openById(userSheetId);

    var buttons = Array.from({ length: 7 }, (_, index) => index)
      .map(dayNum => {
        var dayName = days[dayNum];
        var row = driver.getSheetByName(dayName).getLastRow();
        return row > 1 ? `${dayName}` : '';
      })
      .filter(x => x != '')
      .map(x => {
        return [{ text: x, callback_data: `training_day_choose;${x}` }]
      });
    
    buttons.push(fromTrainingToMainMenuInlineMenu.inline_keyboard[0]);
    return { inline_keyboard: buttons };
}


function createCurrentTrainingDayMenu(dayName) {
    return {
        inline_keyboard: [
            [{ text: 'Посмотреть все упражнения', callback_data: `training_day_preview;${dayName}` }],
            [{ text: 'Приступить к тренировке', callback_data: `training_day_start;${dayName}` }],
            [{ text: 'Назад', callback_data: 'training' }]
        ]
    };
}


function createButtonBackToTrainingDayChoose(dayName) {
    return {
        inline_keyboard: [
            [{ text: 'Назад', callback_data: `training_day_choose;${dayName}` }]
        ]
    };
}
