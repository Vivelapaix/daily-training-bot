function executeCommand(chat_id, user_id, command) {
    switch (command) {
        case '/start':
            sendText(chat_id, 'Перед началом работы необходима регистрация', registrationInlineKeyboard);
            let row = findUserSheetIdRow(user_id);
            if (row < 2) {
                getUserSheetIdTable().appendRow([user_id]);
            }
            break;   
        default:
            Logger.log("Unknown command");
    }
}


function executeCallBackCommand(chat_id, user_id, command) {
    if (isDaysCallbackCommand(command)) {
        executeDaysCallbackCommand(chat_id, user_id, command);
    } else if (isTrainingCallbackCommand(command)) {
        executeTrainingCallbackCommand(chat_id, user_id, command);
    } else if (command === 'main_menu') {
        sendText(chat_id, 'Главное меню', mainInlineKeyboard);
    } else if (command ==='register_training_program') {
        sendText(chat_id, getRegistrationText(), { force_reply: true, input_field_placeholder: "https://docs.google.com/spreadsheets/d/fnjcnjc-Jxo/edit#gid=0" } );
    }
    return ;
}


function executeForceReplyCommand(chat_id, user_id, command, data) {
    if (command.startsWith('ИНСТРУКЦИЯ')) {
        var row = findUserSheetIdRow(user_id);
        let start = data.indexOf('/d/') + 3;
        let end = data.indexOf('/edit');
        getUserSheetIdTable().getRange(row, 2).setValue(data.substring(start, end));
        getUserSheetIdTable().getRange(row, 3).setValue(data);
        createUserTrainingProgram(chat_id, user_id);
        sendText(chat_id, `Заполните программы тренировок по дням недели по ссылке ${data}`, mainInlineKeyboard);
    }
}


