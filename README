Dev in Test - Recruitment Task

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