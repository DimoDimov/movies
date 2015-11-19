//Controllers Testing

describe("movieListCtrl", function () {
	var $rootScope,
		$scope,
		controller;

    //Controller Testing
	beforeEach(function () {
		
		module.apply(module, appDep.TestDependencies);

		inject(function ($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')("movieListCtrl", {$scope:$scope});

		});
	});	

	describe("Initialization", function () {
		it("Should instantiate movie list to equal 20", function () {
			expect($scope.list).toEqual(20);
		});

		it("Should instantiate current page to equal 1", function () {
			expect($scope.currentPage).toEqual(1);
		});
	});


	describe("Method Testing", function () {
		it("Should increment currentPage when nextcallback() is being called", function () {
			//set final page for testing
			$scope.finalPage = 5;

			expect($scope.currentPage).toEqual(1);
			$scope.nextcallback();
			expect($scope.currentPage).toEqual(2);
			$scope.nextcallback();
			expect($scope.currentPage).toEqual(3);
		});

		it("Should increment currentPage when nextcallback() is being called but should not be able to go above the final page", function () {
			//set final page for testing
			$scope.finalPage = 5;
			expect($scope.currentPage).toEqual(1);

			//try to increment above the final page
			for (var i = 0; i < $scope.finalPage + 10; i++) {
				$scope.nextcallback();
			}

			expect($scope.currentPage).toEqual($scope.finalPage);
		});

		it("Should decrement currentPage when previouscallback() is being called but should not be able to go below 1", function () {
			//set final page for testing
			$scope.finalPage = 5;
			expect($scope.currentPage).toEqual(1);

			//increment to final page
			for (var i = 0; i < $scope.finalPage; i++) {
				$scope.nextcallback();
			}

			//try to decrement below 1
			for (var j = 0; j < $scope.finalPage + 10; j++) {
				$scope.previouscallback();
			}

			expect($scope.currentPage).toEqual(1);
		});

		it("Should decrement currentPage when previouscallback() is being called", function () {
			//set final page for testing
			$scope.finalPage = 5;

			expect($scope.currentPage).toEqual(1);
			$scope.nextcallback();
			$scope.nextcallback();
			$scope.nextcallback();
			expect($scope.currentPage).toEqual(4);
			$scope.previouscallback();
			expect($scope.currentPage).toEqual(3);
			$scope.previouscallback();
			expect($scope.currentPage).toEqual(2);
			$scope.previouscallback();
			expect($scope.currentPage).toEqual(1);
		});
	});
});

//Should trace the data handling by movieModelService
describe("Should trace the data handling by movieModelService within movieListCtrl", function() {
    var $rootScope,
		$scope,
		controller,
		createController,
		response,
		movieModelServices,
		$q,
		deferred;


    beforeEach(function() {
        module.apply(module, appDep.TestDependencies);
        inject(function($injector) {
        	response = {"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160};
        	$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
            $q = $injector.get('$q');

            deferred = $q.defer();
	        movieModelServices = $injector.get('movieModelServices');

            movieModelServicesSpy = spyOnAngularService($injector.get('movieAPIServices'), 'getAllMovies', deferred);

			controller = $injector.get('$controller')("movieListCtrl", {$scope:$scope});
			deferred.resolve(response);
        });
    });

	it("Should initialize correctly and load 20 movies", function() {
    	expect($scope.movieList.length).toBe(0);
     	$rootScope.$digest();
    	expect(movieModelServicesSpy).toHaveBeenCalled();
    	expect($scope.movieList.length).toBe(20);
    });

	it("Should display error when recieved", function() {
     	$rootScope.$digest();

       	//response = {"movies":[{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"Two Weeks Notice","directors":{"list":[{"name":"Marc Lawrence"}]},"actors":{"list":[{"name":"Hugh Grant"},{"name":"Sandra Bullock"},{"name":"David Haig"},{"name":"Dana Ivey"},{"name":"Alicia Witt"}]},"duration":5820,"rating":3,"year":2002}],"errorMessage":"","totalfilteredMovies":2,"totalMoviesCount":160};
    
       	//prepare the error response
       	response = {"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160};
       	deferred = $q.defer();
        movieModelServicesSpy = changeSpyReturn(movieModelServicesSpy, deferred);
        deferred.resolve(response);
 
        $scope.searchPhrase = "wrong phrase";

        $rootScope.$digest();
    	expect(movieModelServicesSpy).toHaveBeenCalled();

     	expect($scope.errorMessage).toBe('No matching items');
    });

    it("Should reject result", function() {
     	$rootScope.$digest();

       	//response = {"movies":[{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"Two Weeks Notice","directors":{"list":[{"name":"Marc Lawrence"}]},"actors":{"list":[{"name":"Hugh Grant"},{"name":"Sandra Bullock"},{"name":"David Haig"},{"name":"Dana Ivey"},{"name":"Alicia Witt"}]},"duration":5820,"rating":3,"year":2002}],"errorMessage":"","totalfilteredMovies":2,"totalMoviesCount":160};
    
       	//prepare the error response
       	response = {"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160};
       	deferred = $q.defer();
        movieModelServicesSpy = changeSpyReturn(movieModelServicesSpy, deferred);
        deferred.reject(response);
 
        $scope.searchPhrase = "wrong phrase";

        $rootScope.$digest();
    	expect(movieModelServicesSpy).toHaveBeenCalled();

     	expect($scope.errorMessage).toBe('No matching items');
    });
});