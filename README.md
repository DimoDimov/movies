Dev in Test 

Technical Details:

1. OS – Windows

2. Platform – Sublime Text 3

3. Front end technologies used: Angular, jQuery, Bootstrap, CSS3, HTML5. Responsiveness of the design is being implemented.

4. Back end technologies used: Node, Express.

5. Testing technologies and tools:  

front layer - Jasmine, Karma; 

business layer: Chai, Chai-As-Promised, Mocha; 

e2e testing – Protractor; 

code coverage – Istanbul, Karma-Coverage, Grunt-Mocha-Istanbul, Grunt-Istanbul, Grunt-Protractor-Coverage;

6. Task runner: Grunt

7. Helpers: grunt-contrib-concat, grunt-contrib-uglify, grunt-css, grunt-contrib-jshint, grunt-contrib-clean, grunt-express-server, grunt-contrib-watch, grunt-bowercopy, grunt-protractor-runner, grunt-karma, grunt-simple-mocha, grunt-debug, grunt-node-inspector, grunt-concurrent, grunt-shell

8. Bower for version control of the front end libs

9. Version control system – Git

10. GitHub account - https://github.com/DimoDimov/movies


Steps to Follow To Run The Project:

1. Copy the project to a project directory.

2. Make sure npm is up to date (Win Only) – Start Git Bash terminal and copy the following “npm update -g npm” 

3. Install Grunt globally – Start Git Bash terminal and copy the following “npm install -g grunt-cli”

4. Install Protractor globally – Start Git Bash terminal and copy the following “npm install -g protractor”

5. Open Git bash terminal and run the command “npm install” – to instal npm modules, bower modules will install automatically. Selenium will check to updates automatically. All necessary libraries will be copied to the project.

6. Start two Git Bash terminals from the project directory.

7. Run the command “grunt start” – to start the server from the first Git Bash terminal.

8. From the second Git Bash terminal run the command “grunt test” – to start all the tests.

9. Code coverage of the test – summary on the console. The complete reports are in ‘test-coverage’ folder

10. Generating e2e reports:

* Note: the process of generating e2e reports is time consuming and is taking average 2-3 minutes.

	10.1 If any express server is started – then stop it. 

	10.2 Run grunt e2e-coverage-data - it will copy the project files to test-coverage/e2e-coverage/instrumented and will instrument the js files with Istanbul so that coverage report is being recorded. Then it will start a new server with the instrumented files and will record the coverage.

	10.3 Run grunt e2e-coverage-reports – this will generate coverage reports about the e2e testing. Reports are stored at test-coverage/e2e-coverage/e2e-unit-report and test-coverage/e2e-coverage/e2e-server-report. 

* Note: Protractor is not always being able to run Web Drvier correctly. If at any point e2e testing fails, just rerun the test.

* Note: server-coverage and unit-coverage reports are 100%. e2e reports for e2e-unit-coverage are <100% because many of the cases are only programatically available. The html and js restrictions will not allow some incorrect input data to be entered inside the front end logical layer. The e2e report for e2e-server-coverage are even less covered because the front end restrictions are making sure no bad data is being sent to the server side. 

Approach

Back end - as no documentation was provided regarding how to handle the bad requests – wheather to handle the errors silentley or to show error messages, I decide to silently handle the bad requests and return any valid result if possible. I believe this approach is more challenging.
	
Front end – the restrictions applied in the front end layer will not allow inappropriate requests to be send.

Approach
	Back end - as no documentation was provided regarding how to handle the bad requests – wheather to handle the errors silentley or to show error messages, I decide to silently handle the bad requests and return any valid result if possible. I believe this approach is more challenging.
	Front end – the restrictions applied in the front end layer will not allow inappropriate requests to be send.



Structure

For the hereby “Movie List” project I am using classical, three layered architecture including Angular for the Client (Front End) layer, Node for the Business (Middle) layer and I am using a Data.json file as a mock for the Data (Back) End layer. 

Business (Middle) layer

Creating services with Node and Express is simple and fun. What I like to do is to use promise libraries such as Q. A promise is an abstraction for asychronous programming. I also prefer to detach my logic into separate, middleware files. I do this on purpose. I create different modules of logic. One or combination of several modules might implement the endpoint logic.


Implementation:

- The server is serving server/data.json when a request is made to /api/movies

- Clients are being able to request a subset of data
		- Allowed limiting the number of items returned – list parameter
		- Allowed pagination of data – page parameter

Testing:

 I really would like not to just test my endpoints, but to test each of the logic modules. Once I am sure my modules are doing fine I am attaching them to my endpoint and microservices.  The Behavior Driven Development (which is extension of the Test Driven Development) is the core motivation.

For testing my Q promises nicely I am using the extension for Chai – Chai-As-Promised and Mocha. In the tests you can find various scenarious where I am showing the very Best Practices for testing promises. The comments are all around the implementation and the testing logic.


Client (Front End) layer

Structure:

Resuable modules. I believe that what works together should live together. All necessary files of each single module are in one being stored in folder, Example: 'public/js/app/modules/…’. This helps to easily store and find all the build files of each module (Controllers, Directive, Views). This work great for average or huge Web Applications where the logic of hundreds of Controllers, Directives and Views are being declared in the code.

	Organazing the code 'The Domain Style'

With a complex domain model and hundreds of components, an enterprise application can easily become a mess if certain concerns are overlooked. One of the best ways to organize the code in this situation is by distributing each component in a domain-named folder structure.

Example:

	app/ -> files of the application

	dist/ -> the concatenated js and css files

		app.min.css -> main application stylesheet, consists of concatenated and minified css files

		app.min.js -> main application java script, consists of concatenated and minified js files

	ReusableModules/

		login/ -> login module directory

			login.css -> login stylesheet

			loginCtrl.js -> login controller

			login.html -> login view

		listMovies/ -> listMovies module directory

			listMovies.css -> listMovies stylesheet

			listMovies.js -> listMovies controller

			listMovies.html -> listMovies view

		movie/ -> movie module directory

			movie.css -> movie stylesheet

			movieCtrl.js -> movie controller

			movie.html -> movie view

	lib/ -> javascript libraries

		angular.js -> AngularJS script

	index.html -> main html file

Implementation
	
For the front end I prefer to break down the logic for gathering data from
backend:

- I am having an ‘API Service’ layer, which is only responsible for doing the CRUD operations and to handle the communication with the servers. API service provider. Responsible for declaring and offering services to the backend using $http. It handles and saves (logs) any errors related to backend oeprations. It offers Layer of abstraction for dealing with backend manipulations. 'APIservices' are being used together with the 'modelServices'. ‘Model services’ is another layer of abstraction for saving and updating any data with the backend. It offers to the controllers in the application reusable logic for saving and sharing temporary data models saved in the model services.
	randomController => modelService => APIService => server operation request.
- I use add another layer of abstraction the ‘Model Service’ layer which delegates the CRUD operations to the an ‘API Service’ layer and stores the received models (might be a simple or more complex object, or collection of objects). The received model might be updated and changed in the front end. When we are ready with the changes we are pushing the updated model to the ‘API Service’ layer for further manipulations with the ‘Business and Data Layers’.
	All the requests between all the different layers of abstraction are being done
with $q, which is the promise library for working with Angular. 

Testing 

I am testing my ‘Front End Layer’ with Jasmine and Karma. Protractor is nice tool as well. In protractor test I am showing how to isolate the test logic (movieListPage.js) and reuse it in different tests (movieList.spec.js). Creating reusable, easy maintanable code for the test services is essential for boosting the development of the test. 
Acceptance Criteria Covered
	- On page load, you I  display first 20 movies, ordered alphabetically by title.
	- For each movie list: title, year, rating, duration in minutes and all actors.
	- If the search box contains less than three characters, but more than 0, the following message is being displayed: 'Enter at least three characters to begin search'.
	- When the user enters a search phrase of three characters or more, a list of movies is displayed below the search box, filtered down to the ones whose title field contains the phrase entered.
		- The match is case-insensitive.
		- The search is being performed as the user types.

- When there is at least one matching movie:
	- The following text is displayed: 'Matched X of Y movies total'
	- Where X is the number of movies found and Y is the total number of movies
	- For each movie, both Title and Year are displayed
		 
 - Backend
	- The server serves server/data.json when a request is made to /api/movies
	- Clients is being able to request a subset of data
		- Allowed limiting the number of items returned
		- Allowed pagination of data, e.g. get 10 items from the 4th 'page'	 
 - When there is at least one matching movie:
 	- The following text is displayed: 'Matched X of Y movies total'
	- Where X is the number of movies found and Y is the total number of movies
	- For each movie, both Title and Year are displayed

 - When the search phrase does not match any movies, the following message is being displayed: 'No matching items'

Automation of the tasks and processes
Automation of the processes is the best approach to save developers time from the boring, repetitive tasks so that he can spend it in other more important parts of the development. It is a must and I like using Grunt. In this project the main commands to use are:
grunt test – runs all the tests [e2e, unit, server-unit]
we can run any of the test separately by running the following commands:
grunt e2e
grunt unit
grunt server-unit
grunt rebuild – it cleans the dist directory, runs jshint to confirm that the js is error free, concatenates all js into one bundle, then we check for any errors after concatination again using jshing, then we minify the js and the css.
grunt start – it rebuilds the project and runs the Express Server
* Remember to always start the server with grunt start before you start the grunt-test. Use two Git bash terminals.
	The commands are alternative to the one used in the base project:
Commands to run:
 npm run start - starts local server
 npm run unit - run the karma unit tests
 npm run e2e - run the protractor tests 
 npm run server-unit - run the backend mocha tests

Task Accomplished:
 
Implement the following user story in JavaScript / AngularJS, using TDD/BDD/ATDD.
Write acceptance tests in Protractor and unit tests as you see fit.


Guidance
 - You can, but are not obliged to, use the seed project we provided with this task. 
 - Having good test coverage is really important to us.
 - When you submit your work, please briefly explain the decisions you make including discussing the architecture and direction of your solution.
 - You are not expected to finish the exercise, we are more interested in your processes and methodologies.

** As a Now TV Customer
** I would like to filter a list of movies using a search query box
** So that I can easily find movies I'd like to watch.

Please create a UI that contains a list of movies, and a search box which is capable of filtering. There are no stylesheets included on the page, creating a pretty UI is a bonus but is not mandatory.

Acceptance Criteria
 
 - Frontend
 	- On page load, you should display first 20 movies, ordered alphabetically by title.
 	- For each movie list: title, year, rating, duration in minutes and all actors.
 	- If the search box contains less than three characters, but more than 0, the following message should be displayed: 'Enter at least three characters to begin search'.
	- When the user enters a search phrase of three characters or more, a list of movies is displayed below the search box, filtered down to the ones whose title field contains the phrase entered.
		- The match is case-insensitive.
 		- The search should be performed as the user types.
		 
 - Backend
	- The server should serve server/data.json when a request is made to /api/movies
	- Clients should be able to request a subset of data
		- Allow limiting the number of items returned
		- Allow pagination of data, e.g. get 10 items from the 4th 'page'
	 
 - When there is at least one matching movie:
 	- The following text is displayed: 'Matched X of Y movies total'
	- Where X is the number of movies found and Y is the total number of movies
	- For each movie, both Title and Year are displayed

 - When the search phrase does not match any movies, the following message should be displayed: 'No matching items'

Commands to run:

 npm run start - starts local server
 npm run unit - run the karma unit tests
 npm run e2e - run the protractor tests 
 npm run server-unit - run the backend mocha tests