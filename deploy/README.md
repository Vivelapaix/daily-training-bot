# Залить файлы из Intellij на Google Apps Script
1. Зайти сюда https://script.google.com/home/my
2. Далее зайти внутрь разрабатываемого проекта, там будет ссылка https://script.google.com/home/projects/{scriptId}/edit
3. Скопировать scriptId из ссылки предыдущего пункта и перейти сюда https://developers.google.com/apps-script/api/reference/rest/v1/projects/getContent
4. Указать справа scriptId, стянуть json и сохранить его в файл под названием ```get_content.txt```
5. Запустить в командной строке ```shell ./upload.py```
6. Копируем содержимое файла ```update_content.json```
7. Идем сюда https://developers.google.com/apps-script/api/reference/rest/v1/projects/updateContent
8. Подставляем scriptId из 2 пункта и в качестве тела запроса указываем данные из 6 пункта
9. Обновляем страницу из пункта 2
10. Готово, ваш проекта на GAS обновлен

# Стянуть файлы с Google Apps Script в Intellij
1. Зайти сюда https://script.google.com/home/my
2. Далее зайти внутрь разрабатываемого проекта, там будет ссылка https://script.google.com/home/projects/{scriptId}/edit
3. Скопировать scriptId из ссылки предыдущего пункта и перейти сюда https://developers.google.com/apps-script/api/reference/rest/v1/projects/getContent
4. Указать справа scriptId, стянуть json и сохранить его в файл под названием ```get_content.txt```
5. Запустить в командной строке ```shell ./download.py```
6. Кликнуть на любой файл
7. Готово, проект в Intellij обновлен, git подсветит все изменения