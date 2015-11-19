//Factory Testing

describe("movieModelServices", function() {
    var maxList, 
        page, 
        searchPhrase, 
        getCashedMovies,
        $rootScope,
        $q,
        deffered,
        factory,
        wrongFactory,
        movieModelServicesSpy,
        movieModelServicesWrongSpy;

    //Factory Testing
    beforeEach(function() {
        module.apply(module, appDep.TestDependencies);

        inject(function($injector) {
            factory = $injector.get('movieModelServices');
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            deferred = $q.defer();

            //Faking response with $q
            movieModelServicesSpy = spyOnAngularService($injector.get('movieAPIServices'), 'getAllMovies', deferred);

            deferred.resolve({"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":60,"totalMoviesCount":160}); 
        });

        maxList = 20;
        page = 1;
        searchPhrase = "";
        getCashedMovies = false;
        
    });

    describe("Method Testing Wrong", function() {
        beforeEach(function() {
            
            inject(function($injector) {
                wrongFactory = $injector.get('movieModelServices');
                deferred = $q.defer();
                movieModelServicesWrongSpy = changeSpyReturn(movieModelServicesSpy, deferred);
                
                deferred.resolve({"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160});
                
            });
        });

        it("Should make a unsuccessful call to movieAPIServices if the wrong search phrase is given", function() {
            searchPhrase = "not valid search phrase";
            wrongFactory.getAllMovies(maxList, page, searchPhrase).then(function (data) {
                expect(data).toBeDefined(); 
                expect(movieModelServicesWrongSpy).toHaveBeenCalled();
                expect(movieModelServicesWrongSpy).toHaveBeenCalledWith(maxList, page, searchPhrase);
                expect(data.errorMessage).toEqual('No matching items');
                expect(data).toEqual({"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160});
            });  
            $rootScope.$digest();       
        });
    });

    describe("Method Testing", function() {

        it("Should make a successful call to movieAPIServices if the right parameters are given", function() {
            factory.getAllMovies(maxList, page, searchPhrase).then(function (data) {
                expect(data).toBeDefined(); 
                expect(movieModelServicesSpy).toHaveBeenCalled();
                expect(movieModelServicesSpy).toHaveBeenCalledWith(maxList, page, searchPhrase);
                expect(data.errorMessage).toEqual('');                
                expect(data).toEqual({"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":60,"totalMoviesCount":160});
            });  
            $rootScope.$digest();          
        });

        it("Should make a successful call to movieAPIServices if the right parameters are given, cache the result and return it if requested, without call to API", function() {
            //first call to the api caches the result
            factory.getAllMovies(maxList, page, searchPhrase).then(function (data) {
                expect(data).toBeDefined(); 
                expect(movieModelServicesSpy).toHaveBeenCalled();
                expect(movieModelServicesSpy).toHaveBeenCalledWith(maxList, page, searchPhrase);

                //called once  
                expect(movieModelServicesSpy.calls.count()).toEqual(1);
                expect(data).toEqual({"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":60,"totalMoviesCount":160});
                 
            });
            
            $rootScope.$digest(); 

            var loadCachedResult = true;
            //first call to the api
            factory.getAllMovies(maxList, page, searchPhrase, loadCachedResult).then(function (data) {
                expect(data).toBeDefined(); 
                //movieModelServices is called just once as the second return is the cached result  
                expect(movieModelServicesSpy.calls.count()).toEqual(1);
                expect(data).toEqual({"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":60,"totalMoviesCount":160});             
            });

            //second call to the Model Cache  
            $rootScope.$digest();          
        });
    });

    describe("Input Validation Testing", function() {
        it("Should throw an exception when a call to movieAPIServices when maxList parameter is wrong", function() {
            maxList = "I am wrong";

            expect(function () {
                factory.getAllMovies(maxList, page, searchPhrase).then(function (data) {
                    expect(data).toBeDefined(); 
                });  
                $rootScope.$digest();   
            }).toThrow();                   
        });

        it("Should throw an exception when a call to movieAPIServices when page parameter is wrong", function() {
            page = "I am wrong";

            expect(function () {
                factory.getAllMovies(maxList, page, searchPhrase).then(function (data) {
                    expect(data).toBeDefined(); 
                });  
                $rootScope.$digest();   
            }).toThrow();                   
        });

        it("Should throw an exception when a call to movieAPIServices when maxList and page parameters are wrong", function() {
            maxList = "I am wrong";
            page = "I am also wrong";

            expect(function () {
                factory.getAllMovies(maxList, page, searchPhrase).then(function (data) {
                    expect(data).toBeDefined(); 
                });  
                $rootScope.$digest();   
            }).toThrow();                   
        });
    });   
});

//-------------Error Handling And Error Logging Tests------------

//testing console.warn or in real life test the Logger
describe("When no data return console.warn (Log the problem)", function() {
    var movieAPIServices,
        movieAPIServicesSpy,
        deferred,
        movieModelServicesSpy,
        movieModelServices,
        $rootScope,
        $q;


    beforeEach(function() {
        module.apply(module, appDep.TestDependencies);
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            movieModelServices = $injector.get('movieModelServices');
            movieModelServicesSpy = spyOn(movieModelServices, 'getAllMovies').and.callThrough();
            //movieModelServicesSpy.and.callThrough();

            deferred = $q.defer();
            movieAPIServices = $injector.get('movieAPIServices');
            movieAPIServicesSpy = spyOnAngularService(movieAPIServices, 'getAllMovies', deferred);
            
            deferred.resolve(null);
        });

        consoleWarnSpy = spyOn(console, 'warn');
    });

    it("Should console.warn that no data returned by the server", function() {
        maxList = 20;
        page = 1;
        searchPhrase = "";
        movieModelServices.getAllMovies(maxList, page, searchPhrase).then(function (data) {
            expect(movieAPIServicesSpy).toHaveBeenCalled();
            expect(consoleWarnSpy).toHaveBeenCalled();
            expect(consoleWarnSpy).toHaveBeenCalledWith("Error in movieModelServices _getAllMovies"); 
            expect(data).toBeNull();            
        },
        function (argument) {
        });
        $rootScope.$digest();  
    });
});


//when rejected data from API service should be rejected from the movieModelService
describe("Should reject data from movieModelService, when it was rejected by API service", function() {
    var movieAPIServices,
        movieAPIServicesSpy,
        deferred,
        movieModelServicesSpy,
        movieModelServices,
        $rootScope,
        $q;


    beforeEach(function() {
        module.apply(module, appDep.TestDependencies);
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            movieModelServices = $injector.get('movieModelServices');
            movieModelServicesSpy = spyOn(movieModelServices, 'getAllMovies').and.callThrough();

            deferred = $q.defer();
            movieAPIServices = $injector.get('movieAPIServices');
            movieAPIServicesSpy = spyOnAngularService(movieAPIServices, 'getAllMovies', deferred);
            
            deferred.reject(null);
        });
    });

    it("Should reject data from API service", function() {
        maxList = 20;
        page = 1;
        searchPhrase = "";
        movieModelServices.getAllMovies(maxList, page, searchPhrase).then(function (data) {  

        },
        function (data) {
            expect(movieAPIServicesSpy).toHaveBeenCalled();
            expect(data).toBeNull();     
        });
        $rootScope.$digest();  
    });
});