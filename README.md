
# Picksup 

Picksup is an ecommerce platform for buying exclusive sneakers present in the market.

## Installation

Download MySQL workbench and start a localhost MySQL server.

Database specifications:

Host: localhost

Database: picksup

Username: root 

Password: mysqlpassword


## Database configuration

We have to create a database named "picksup" in MySQL workbench.

* CREATE DATABASE picksup;

* USE picksup;

## Nodejs configuration

* Download the github repository. Navigate to the folder and run "npm install" in the cmd.

* now run "npm run dev"

* now open the browser and visit "localhost:3000"

* [IMPORTANT] now open the MySQL workbench and run the following script:

INSERT INTO items(product_name,price,color,type)
VALUES("KGL 01",2000,"red","sneaker"),
	  ("JKM 99",1022,"red","sneaker"),
      ("LL 11",2500,"red","sneaker"),
      ("MNI 12",2000,"red","sneaker"),
      ("ROCK 99",2000,"red","sneaker"),
      ("ZAM 69",4500,"yellow","sneaker"),
      ("YEL 44",7000,"yellow","sneaker"),
      ("ABC Z",600,"yellow","sneaker"),
      ("BL 77",600,"blue","sneaker"),
      ("NICE 21",6090,"blue","sneaker"),
      ("REP 26",9999,"blue","sneaker"),
      ("GL-12",1234,"green","sneaker"),
      ("ZZ 9",1022,"green","sneaker"),
      ("PT 77",8922,"green","sneaker");


## Congratulations

If you manage to follow all the instructions successfully then "Picksup" will be live without any problem.