# Тестовое задание "Контакты"
## Было реализовано:
###### Отображение данных с сервера https://randomuser.me
###### Отображение данных в виде таблицы.
Колонки ряда таблицы:
- Avatar
- Fullname
- Birthday (формат - День недели, mm/dd/yyyy, hh:mm am, кол-во лет)
- Email (должен быть кликабельным с возможностью скопировать)
- Phone (должен быть кликабельным с возможностью скопировать)
- Location (Страна, Город)
- Национальность
###### Переключение режима просмотра данных.
- табличный вид
- плиточный вид
Выбранное значение должно запоминаться в localStorage и в состоянии приложения.
При обновление страницы илперемонтировании компонента, данные должны
отобразиться в том виде, который выбрал пользователь. Если страница посещается
впервые, то использовать по-умолчанию табличный вид
###### Фильтрация данных:
 - по полному имени;
 - по половому признаку;
 - по национальности;
###### Пагинация
- по 10 пользователей на странице
- наличие пустой строки, если не хватает кол-ва пользователей
 
