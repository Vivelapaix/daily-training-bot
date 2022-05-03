const BOT_TOKEN = '',
    BOT_NAME = '',
    TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/`,
    CHAT_ID = '';


function setWebhook() {
    let WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzpEerQXZ-BolCqLvszMIEusigvrKG2ATAVZ8IqHjUeqn7Mj11rayF6qqcLPWFquAUR/exec";
    let url = `${TELEGRAM_API}setWebhook?url=${WEB_APP_URL}`;
    let response = UrlFetchApp.fetch(url);
    Logger.log(response);
}


function deleteWebhook() {
    let url = `${TELEGRAM_API}deleteWebhook`
    let response = UrlFetchApp.fetch(url);
    Logger.log(response);
}


function sendText(chat_id, text, keyboard) {
    let data = {
        method: "post",
        payload: {
            method: "sendMessage",
            chat_id: String(chat_id),
            text: text,
            reply_markup: JSON.stringify(keyboard)
        }
    };
    let url = TELEGRAM_API;
    let response = UrlFetchApp.fetch(url, data);
    let {ok, result} = JSON.parse(response);
    if (ok !== true) {
        Logger.log(`Error: ${result}`);
    } else {
        Logger.log('Send success');
    }
    return result.message_id;
}


function sendMessage(chat_id, text) {
    let url = `${TELEGRAM_API}sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=HTML`;
    Logger.log(url);
    let response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    let {ok, result} = JSON.parse(response);
    if (ok !== true) {
        Logger.log(`Error: ${description}`);
    } else {
        Logger.log('Send success');
    }
}


function deleteMessage(chat_id, message_id) {
    let data = {
        method: "post",
        payload: {
            method: "deleteMessage",
            chat_id: String(chat_id),
            message_id: String(message_id)
        }
    };
    let url = TELEGRAM_API;
    let response = UrlFetchApp.fetch(url, data);
    let {ok, description} = JSON.parse(response);
    if (ok !== true) {
        Logger.log(`Error: ${description}`);
    } else {
        Logger.log('Send success');
    }
}
