//Directory Testing

describe("movieListDir", function() {
    var $rootScope,
        $scope,
        $compile,
        movieModelServicesSpy,
        el,
        $body = $('body'),
        simpleHtml = '<movie-list class="movie-list-wrapper"></movie-list>';

    //Controller Testing
    beforeEach(function() {
        module.apply(module, app.Dependencies);

        inject(function($injector) {
            $body.html('');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            movieModelServicesSpy = spyOnAngularService($injector.get('movieModelServices'), 'getAllMovies', {"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":60,"totalMoviesCount":160});
            $compile = $injector.get('$compile');
            el = $compile(angular.element(simpleHtml))($scope);
            
        });
        
        $body.append(el);
        $rootScope.$digest();
        $el = $('.movie-list-wrapper');
    });

    describe("Initialization", function() {
        it("Should compile el", function() {
            expect(el).not.toBeNull();
        });

        it("Should add el to DOM", function() {

            expect($el.length).toEqual(1);
        });
    });
    
    describe("Action Handlers", function() {
        it("Should call movieModelServices.getAllMovies() to feed the movie data on the page load", function() {
            expect(movieModelServicesSpy).toHaveBeenCalled();
        });

        it("Should get movies on page load", function() {
            expect($scope.movieList).toEqual([{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}]);
        });

        it("Should get exactly 20 movies on page load", function() {
            expect($scope.movieList.length).toEqual(20);
        });
    });

    describe("Watchers", function () {
        it("Should not allow 'list' value to go bellow 1", function() {            
            $scope.list = 1;
            $scope.$digest();
            expect($scope.list).toEqual(1);

            $scope.list = 0;
            $scope.$digest();
            expect($scope.list).toEqual(1);

            $scope.list = -1;
            $scope.$digest();
            expect($scope.list).toEqual(1);
        });

        it("Should not allow 'list' value to go above 'totalMoviesCount'", function() {
            //set maximum number for list
            $scope.list = $scope.totalMoviesCount;
            $scope.$digest();
            expect($scope.list).toEqual($scope.totalMoviesCount);

            //go beyond the $scope.totalMoviesCount, should not be allowed
            //the result of $scope.list should be equal or bellow $scope.totalMoviesCount
            $scope.list++;
            $scope.$digest();
            expect($scope.list).toEqual($scope.totalMoviesCount);
        });

         it("Should not allow 'list' value to exceed the maximum of the 'totalFilteredMovies' ", function() {
            //set set list to filtered movies
            $scope.list = $scope.totalfilteredMovies;
            $scope.$digest();
            expect($scope.list).toEqual($scope.totalfilteredMovies);

            //try tp go beyond the limit of $scope.totalfilteredMovies
            //the value should not be allowed to do so 
            $scope.list++;
            $scope.$digest();
            expect($scope.list).toEqual($scope.totalfilteredMovies);

            //Should be allowed to be less than = $scope.totalfilteredMovies 
            $scope.list = $scope.totalfilteredMovies;
            $scope.list--;
            $scope.$digest();
            expect($scope.list).toEqual(--$scope.totalfilteredMovies);
        });


        it("Should not allow current page to go beyond the final page", function() {
            //click counter, be sure we make more clicks than pages
            var clicksBeyondFinalPage =  $scope.finalPage + 1;

            for (var i = 0; i < clicksBeyondFinalPage; i++) {
                $scope.currentPage++;
                $scope.$digest();
            }

            expect($scope.currentPage).toEqual($scope.finalPage);
        });

        it("The counter should not go below 1. Even if pagination.previous() is being applied", function() {
            expect($scope.currentPage).toEqual(1);

            $scope.currentPage--;
            $scope.$digest();
            expect($scope.currentPage).toEqual(1);
            
            $scope.currentPage--;
            $scope.$digest();
            expect($scope.currentPage).toEqual(1);
        });
    });
});
