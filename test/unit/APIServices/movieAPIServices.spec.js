//API Services Testing

describe("APIService", function() {
    var $httpbackend,
        movieAPIServices,
        maxList,
        page,
        searchPhrase,
        routingConstants,
        getMovieListUrl;

    describe("Initialization", function() {
        beforeEach(function() {
            module.apply(module, appDep.TestDependencies);

            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                
                movieAPIServices = $injector.get('movieAPIServices');

                routingConstants = $injector.get('routingConstants');

                getMovieListUrl = routingConstants.url + ':' + routingConstants.port + routingConstants.moviesAPI;
            });
        });

        it("The functuon getAllMovies is defined", function() {
            expect(movieAPIServices.getAllMovies).toBeDefined();
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });

    describe("Loading all movies, get call without phrase query (filtering)", function() {
        beforeEach(function() {
            module.apply(module, appDep.TestDependencies);

            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                movieAPIServices = $injector.get('movieAPIServices');
            });
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("Should return 20 movies", function() {
            $httpBackend.when('GET', getMovieListUrl + '?list=20&page=1&q=')
                .respond(200, {"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160});

            maxList = 20;
            page = 1;
            searchPhrase = "";

            movieAPIServices.getAllMovies(maxList, page, searchPhrase)
                .then(function(data) {
                    expect(data).toBeDefined();
                    expect(data.movies.length).toBe(20);
                    expect(data).toEqual({"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160});
                });

            $httpBackend.flush();
        });
    });

    describe("Loading movies, get call with phrase query (filtering)", function() {
        beforeEach(function() {
            module.apply(module, appDep.TestDependencies);

            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                movieAPIServices = $injector.get('movieAPIServices');
            });

              $httpBackend.when('GET', getMovieListUrl + '?list=20&page=1&q=week')
                .respond(200, {"movies":[{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"Two Weeks Notice","directors":{"list":[{"name":"Marc Lawrence"}]},"actors":{"list":[{"name":"Hugh Grant"},{"name":"Sandra Bullock"},{"name":"David Haig"},{"name":"Dana Ivey"},{"name":"Alicia Witt"}]},"duration":5820,"rating":3,"year":2002}],"errorMessage":"","totalfilteredMovies":2,"totalMoviesCount":160});
        });

        it("Should return 2 movies", function() {
          
            maxList = 20;
            page = 1;
            searchPhrase = "week";

            movieAPIServices.getAllMovies(maxList, page, searchPhrase)
                .then(function(data) {
                    expect(data).toBeDefined();
                    expect(data.movies.length).toBe(2);
                    expect(data).toEqual({"movies":[{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"Two Weeks Notice","directors":{"list":[{"name":"Marc Lawrence"}]},"actors":{"list":[{"name":"Hugh Grant"},{"name":"Sandra Bullock"},{"name":"David Haig"},{"name":"Dana Ivey"},{"name":"Alicia Witt"}]},"duration":5820,"rating":3,"year":2002}],"errorMessage":"","totalfilteredMovies":2,"totalMoviesCount":160});
                });

            $httpBackend.flush();
        });
    });

    describe("Loading no movies, get call with phrase query with no matching films, error message returned 'No matching items'", function() {
        beforeEach(function() {
            module.apply(module, appDep.TestDependencies);

            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                movieAPIServices = $injector.get('movieAPIServices');
            });

              $httpBackend.when('GET', getMovieListUrl + '?list=20&page=1&q=abcdefg')
                .respond(function (method, url, data, headers) {
                    return [404, {"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160}, {}, ''];
                });
        });

        it("Should return no movies", function() {
          
            maxList = 20;
            page = 1;
            searchPhrase = "abcdefg";

            movieAPIServices.getAllMovies(maxList, page, searchPhrase)
                .then(function(data, status) {
 
                },function (data, status) {
 
                    expect(data).toBeDefined();
                    expect(data.movies.length).toBe(0);
                    expect(data.errorMessage.length).not.toBe(0);
                    expect(data.errorMessage).toEqual("No matching items");
                    expect(data).toEqual({"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160});
                });

            $httpBackend.flush();
        });
    });

    describe("When server is down error message 'Server problems. Please try again later'", function() {
        beforeEach(function() {
            module.apply(module, appDep.TestDependencies);

            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                movieAPIServices = $injector.get('movieAPIServices');
            });

              $httpBackend.when('GET', getMovieListUrl + '?list=20&page=1&q=abcdefg')
                .respond(function (method, url, data, headers) {
                    return [405, {"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160}, {}, ''];
                });
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("Should return no movies", function() {
          
            maxList = 20;
            page = 1;
            searchPhrase = "abcdefg";

            movieAPIServices.getAllMovies(maxList, page, searchPhrase)
                .then(function(data, status) {
 
                },function (data, status) {
                    expect(data).toBeDefined();
                    expect(data.movies.length).toBe(0);
                    expect(data.errorMessage.length).not.toBe(0);
                    expect(data.errorMessage).toEqual("Server problems. Please try again later");
                    expect(data).toEqual({"movies":[],"errorMessage":"Server problems. Please try again later","totalfilteredMovies":0,"totalMoviesCount":160});
                });

            $httpBackend.flush();
        });
    });
    
    //testing console.warn or in real life test the Logger
    describe("When no data return console.warn (Log the problem)", function() {
        beforeEach(function() {
            module.apply(module, appDep.TestDependencies);

            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                movieAPIServices = $injector.get('movieAPIServices');
            });

            $httpBackend.when('GET', getMovieListUrl + '?list=20&page=1&q=')
                .respond(function (method, url, data, headers) {
                    return [200, null];
                });

            consoneWarnSpy = spyOn(console, 'warn');
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("Should console.warn that no data returned by the server", function() {
            maxList = 20;
            page = 1;
            searchPhrase = "";

            movieAPIServices.getAllMovies(maxList, page, searchPhrase)
                .then(function(data, status) {
                    expect(console.warn).toHaveBeenCalled();
                    expect(console.warn).toHaveBeenCalledWith("Error in movieAPIServices _getAllMovies");
                    expect(data).toBeNull();
                },
                function (data, status) {
                });

            $httpBackend.flush();
        });
    });
});
