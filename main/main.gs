function doPost(e) {
    let contents = JSON.parse(e.postData.contents);

    //SpreadsheetApp.getActive().getSheetByName("Дебаг").appendRow([JSON.stringify(contents, null, 7)]);

    //SpreadsheetApp.getActive().getSheetByName(DEBUG_TABLE).getRange(1, 1).setValue(JSON.stringify(contents, null, 7));

    if (isForceReplyCommand(contents)) {
        let chat_id = contents.message.chat.id;
        let user_id = contents.message.from.id;
        if (isNotValidUserMock(user_id)) {
            sendText(chat_id, `Недостаточно прав. Обратитесь к администрации, указав id=${user_id}`);
            return;
        }
        let data = contents.message.text;
        let command = contents.message.reply_to_message.text;
        let previous_message_id = contents.message.message_id;
        let reply_previous_message_id = contents.message.reply_to_message.message_id;

        deleteMessage(chat_id, previous_message_id);
        deleteMessage(chat_id, reply_previous_message_id);

        executeForceReplyCommand(chat_id, user_id, command, data);

    } else if (isCallbackQueryCommand(contents)) {
        let chat_id = contents.callback_query.message.chat.id;
        let user_id = contents.callback_query.from.id;
        if (isNotValidUserMock(user_id)) {
            sendText(chat_id, `Недостаточно прав. Обратитесь к администрации, указав id=${user_id}`);
            return;
        }
        let text = contents.callback_query.data;
        let previous_message_id = contents.callback_query.message.message_id;  

        deleteMessage(chat_id, previous_message_id);

        executeCallBackCommand(chat_id, user_id, text);

    } else if (isCommand(contents)) {
        let chat_id = contents.message.chat.id;
        let user_id = contents.message.from.id;
        if (isNotValidUserMock(user_id)) {
            sendText(chat_id, `Недостаточно прав. Обратитесь к администрации, указав id=${user_id}`);
            return;
        }
        let command = contents.message.text;

        executeCommand(chat_id, user_id, command);
    }
}


function isForceReplyCommand(contents) {
    return contents.message && contents.message.reply_to_message && contents.message.reply_to_message.from.username === BOT_NAME;
}


function isCallbackQueryCommand(contents) {
    return contents.callback_query;
}


function isCommand(contents) {
    return contents.message && contents.message.text.startsWith("/");
}

function isNotValidUserMock(user_id) {
    return 5 < 4;
}


function isNotValidUser(user_id) {
    let last_row = getUserSecurityTable().getLastRow();
    let data = getUserSecurityTable().getRange(2, 1, last_row, 1).getValues().flat();
    let row = data.indexOf(user_id);
    return row < 0;
}

