MVC Design Patern (using Node.js with Express.js and a MySQL database)
This is demo project about the burial memories.

DOWNLOAD PROJECT & INSTALL
1. Git clone this project 
https://github.com/Oldfarts/Burialmemories_SERVER

2. Install PostGreSQL database and create db and set up the table (db schema located at folder .\config\db\schema.sql)
2.1	Edit the files in server project:
- config.js -> change the database password
- customerdata.js -> change the database password
- interface.js  -> change the database password

3. Install latest node

4. Open up Terminal or Command line
Navigate to the directory where the project was cloned to
Run this command: npm -i install

5. To start the application, run this command: npm start
The application will run at: 192.168.1.209:4000. If you need different IP address or port please change the server.js - "server.listen(4000,'192.168.1.209');"

6. To test the functionality:
- a open web browser from page http://192.168.1.209:4000
- b Add customerdata (name, text, image and shot video (video has to be max <2MB)
- c Git clone client project
- d Install android studio
- e Compile the application
- f Install the application to mobile phone or use it via emulator
- g Start the client app and scan the name from some QR generation page (eg. Jani Ärväs - the program has address already)
- h Verify the results (see the data what you have entered into database)
