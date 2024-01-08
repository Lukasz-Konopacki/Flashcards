Sposób uruchomienia:
1. W folderze Flashcards\Database znajduje się skrypt tworzący bazę danych mysql, należy go wykonać aby utworzyć bazę danych potrzebą do działania aplikacji.
2. Przy użyciu terminala przejść do folderu Backend i uruchomić komendę npm install pobierze, to potrzebe zależności do folderu node_modules
3. W Flashcards\Backend\configuration\dbconfig.js należy ustawić dane połączenia ze swoją bazą mysql.
4. W terminalu odpalamy cmd: node main.js Teraz cześć serwerowa powinna już działać. Możemy to sprawdzić zapytaniem http://localhost:8080/flashcards które powinno zwrócić nam odpowiedź o statusie 403 z ciałem: {"message":"Token not provided"}. 
4. Teraz odpalamy cześć reactową. Tak jak w przypadku backendu najpierw należy w terminalu puścić: npm install aby pobrać zależności.
5. No i uchuamiamy samą aplikacje cmd: npm install.
6. Powinna otworzyć się w przeglądarce nowa kartka z aplikacja. Domyśly użytkownik do admin posiadający hasło: admin.