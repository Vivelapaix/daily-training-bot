const USER_SECURITY_TABLE = 'user_security_table',
      USER_SHEET_ID = 'user_sheet_id',
      REGISTRATION_TEXT = 'registration_text',
      USER_GMAIL_NAME = ''; -- paste admin gmail


function createUserSecurityTable() {
    let driver = SpreadsheetApp.getActive();
    let itt = driver.getSheetByName(USER_SECURITY_TABLE);
    if (!itt) {
        driver.insertSheet(USER_SECURITY_TABLE);
    }

    let last_row = driver.getSheetByName(USER_SECURITY_TABLE).getLastRow();
    if (last_row === 0) {
        driver.getSheetByName(USER_SECURITY_TABLE)
            .appendRow(['user_id', 'cr_time', 'expire_time'])
            .appendRow([438689048]);
    }
}


function createUserSheetIdTable() {
    let driver = SpreadsheetApp.getActive();
    let itt = driver.getSheetByName(USER_SHEET_ID);
    if (!itt) {
        driver.insertSheet(USER_SHEET_ID);
    }

    let last_row = driver.getSheetByName(USER_SHEET_ID).getLastRow();
    if (last_row === 0) {
        driver.getSheetByName(USER_SHEET_ID)
            .appendRow(['user_id', 'sheet_id', 'expire_time'])
            .appendRow([438689048]);
    }
}

function createRegistrationTextTable() {
    let text = `ИНСТРУКЦИЯ:
    
    1. Перейдите по ссылке https://docs.google.com/spreadsheets/u/0/
    
    2. Создайте таблицу и назовите ее training_bot 
    
    3. В правом верхнем углу выберите Настройки доступа (SHARE)
    
    4. Затем добавьте пользователя ${USER_GMAIL_NAME}
    
    5. Скопируйте ссылку из браузерной строки и приложите в ответ на это сообщение`;
    
    let driver = SpreadsheetApp.getActive();
    let itt = driver.getSheetByName(REGISTRATION_TEXT);
    if (!itt) {
        driver.insertSheet(REGISTRATION_TEXT);
    }

    let last_row = driver.getSheetByName(REGISTRATION_TEXT).getLastRow();
    if (last_row === 0) {
        driver.getSheetByName(REGISTRATION_TEXT)
            .appendRow(['text'])
            .appendRow([text]);
    }
}

function initTables() {
    createUserSecurityTable();
    createUserSheetIdTable();
    createRegistrationTextTable();
}


function getUserSheetIdTable() {
    return SpreadsheetApp.getActive().getSheetByName(USER_SHEET_ID);
}


function findUserSheetIdRow(user_id) {
    let last_row = getUserSheetIdTable().getLastRow();
    let data = getUserSheetIdTable().getRange(2, 1, last_row, 1).getValues().flat();
    let row = data.indexOf(user_id);
    return row + 2;
}


function findUserSheetId(user_id) {
    let last_row = getUserSheetIdTable().getLastRow();
    let data = getUserSheetIdTable().getRange(2, 1, last_row, 2).getValues().flat();
    let indx = data.indexOf(user_id);
    return indx >= 0 ? data[indx + 1] : '';
}


const days = {1:'Понедельник',2:'Вторник',3:'Среда',4:'Четверг',5:'Пятница',6: 'Суббота', 0:'Воскресенье', 8:'Пример заполнения программы'};


function createUserTrainingProgram(chat_id, user_id) {
    let sheetNames = Object.values(days);
    let userSheetId = findUserSheetId(user_id);

    if (userSheetId === '') {
       sendText(chat_id, 'Вы не прикладывали ссылку на программу тренировок, обратитесь к администратору');
    }

    let driver = SpreadsheetApp.openById(userSheetId);

    sheetNames.forEach(sheetName => {
        var sheetObj = driver.getSheetByName(sheetName);
        if (!sheetObj) {
            driver.insertSheet(sheetName);
            driver.getSheetByName(sheetName).appendRow(['Название упражнения', 'Количество повторений', 'Ссылка на технику', 'Комментарий']);
        } 
        // else {
        //     sheetObj.clear({ formatOnly: false, contentsOnly: true });
        // }
        

        if (sheetName == 'Пример заполнения программы') {
            driver.getSheetByName(sheetName).appendRow(['Жим лежа', '10', 'https://www.youtube.com/watch?v=5OcDDlVxVto', 'Сконцентрируйся'])
                .appendRow(['Отдых', '60 секунд', '', 'Ходить пешком'])
                .appendRow(['Подтягивания', '10', 'https://www.youtube.com/watch?v=ky274kFzATo', 'Концентрироваться на широчайших'])
                .appendRow(['...', '...', '...', '...']);
        }

    });
}


function getRegistrationText() {
    let last_row = SpreadsheetApp.getActive().getSheetByName(REGISTRATION_TEXT).getLastRow();
    let data = SpreadsheetApp.getActive().getSheetByName(REGISTRATION_TEXT).getRange(2, 1).getValue();
    return data;
}


















