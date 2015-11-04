var path = require('path');

//using chas-as-promised for testing promises
//in our case we test the Q
//in this example I use the data.json
//in real life I would mock up the database
var httpMocks = require('node-mocks-http'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    Q = require('q');

chai.use(chaiAsPromised);

var expect = chai.expect,
    assert = chai.assert;

var getApiMovies = require(path.join(__dirname, '../../../../server/config/middleware/getApiMovies.js'));
var db = require(path.join(__dirname, '../../../../server/data.json'));

var req, res, promise;

//testing the middleware logic
//main case - loading 20 movies for the first page
describe('getApiMov', function() {
    beforeEach(function() {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();

        req.query.list = 20;
        req.query.page = 1;
        req.query.q = "";

        promise = getApiMovies(req, res);
    });

    it('is fullfilled', function() {
        return expect(promise).to.be.fullfilled;
    });

    it('is not rejected', function() {
        return expect(promise).to.not.be.rejected;
    });

    //different approaches to compare the data using chai-as-promised
    it('resolves valid data', function() {
        var expectedResult = {"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160};

        return promise.then(function(data) {
            expect(data).to.deep.equal(expectedResult);
        });
    });

    it('resolves valid data', function() {
        var expectedResult = {"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160};

        return expect(promise).to.eventually.deep.eq(expectedResult);
    });

    it('resolves valid data', function() {
        var expectedResult = {"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160};

        return expect(promise).to.become(expectedResult);
    });
    
    //chaining promises
    it('all happy', function() {
        var expectedResult = {"movies":[{"title":"2 Days in the Valley","directors":{"list":[{"name":"John Herzfeld"}]},"actors":{"list":[{"name":"James Spader"},{"name":"Danny Aiello"},{"name":"Eric Stoltz"},{"name":"Teri Hatcher"},{"name":"Glenne Headly"},{"name":"Jeff Daniels"},{"name":"Charlize Theron"},{"name":"Keith Carradine"},{"name":"Marsha Mason"}]},"duration":6000,"rating":3,"year":1996},{"title":"20,000 Leagues Under The Sea","directors":{"list":[{"name":"Richard Fleischer"}]},"actors":{"list":[{"name":"James Mason"},{"name":"Kirk Douglas"},{"name":"Paul Lukas"},{"name":"Peter Lorre"}]},"duration":7260,"rating":4,"year":1954},{"title":"25th Hour","directors":{"list":[{"name":"Spike Lee"}]},"actors":{"list":[{"name":"Edward Norton"},{"name":"Barry Pepper"},{"name":"Rosario Dawson"},{"name":"Philip Seymour Hoffman"},{"name":"Anna Paquin"},{"name":"Brian Cox"}]},"duration":7740,"rating":4,"year":2002},{"title":"28 Days Later","directors":{"list":[{"name":"Danny Boyle"}]},"actors":{"list":[{"name":"Cillian Murphy"},{"name":"Naomie Harris"},{"name":"Brendan Gleeson"},{"name":"Christopher Eccleston"},{"name":"Noah Huntley"},{"name":"Megan Burns"}]},"duration":6720,"rating":3,"year":2002},{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"300: Rise of an Empire","directors":{"list":[{"name":"Noam Murro"}]},"actors":{"list":[{"name":"Sullivan Stapleton"},{"name":"Eva Green"},{"name":"Lena Headey"},{"name":"Rodrigo Santoro"},{"name":"David Wenham"}]},"duration":5880,"rating":3,"year":2014},{"title":"3:10 to Yuma","directors":{"list":[{"name":"James Mangold"}]},"actors":{"list":[{"name":"Russell Crowe"},{"name":"Christian Bale"},{"name":"Ben Foster"},{"name":"Peter Fonda"},{"name":"Gretchen Mol"}]},"duration":7020,"rating":4,"year":2007},{"title":"42","directors":{"list":[{"name":"Brian Helgeland"}]},"actors":{"list":[{"name":"Chadwick Boseman"},{"name":"Harrison Ford"},{"name":"Nicole Beharie"},{"name":"Christopher Meloni"},{"name":"Alan Tudyk"}]},"duration":7380,"rating":0,"year":2013},{"title":"47 Ronin","directors":{"list":[{"name":"Carl Rinsch"}]},"actors":{"list":[{"name":"Keanu Reeves"},{"name":"Rinko Kikuchi"},{"name":"Rick Genest"},{"name":"Hiroyuki Sanada"},{"name":"Cary-Hiroyuki Tagawa"}]},"duration":6780,"rating":0,"year":2013},{"title":"50 First Dates","directors":{"list":[{"name":"Peter Segal"}]},"actors":{"list":[{"name":"Adam Sandler"},{"name":"Drew Barrymore"},{"name":"Rob Schneider"},{"name":"Sean Astin"},{"name":"Dan Aykroyd"}]},"duration":5700,"rating":3,"year":2004},{"title":"8 Minutes Idle","directors":{"list":[{"name":"Mark Simon Hewis"}]},"actors":{"list":[{"name":"Tom Hughes"},{"name":"Ophelia Lovibond"},{"name":"Paul Kaye"},{"name":"Antonia Thomas"},{"name":"Luke Newberry"}]},"duration":4920,"rating":0,"year":2012},{"title":"A Bridge Too Far","directors":{"list":[{"name":"Richard Attenborough"}]},"actors":{"list":[{"name":"Sean Connery"},{"name":"Michael Caine"},{"name":"Gene Hackman"},{"name":"Dirk Bogarde"},{"name":"Edward Fox"}]},"duration":10080,"rating":4,"year":1977},{"title":"A Christmas Carol (1984)","directors":{"list":[{"name":"Clive Donner"}]},"actors":{"list":[{"name":"George C. Scott"},{"name":"Frank Finlay"},{"name":"David Warner"},{"name":"Edward Woodward"},{"name":"Susannah York"},{"name":"Nigel Davenport"},{"name":"Angela Pleasance"},{"name":"Michael Carter"}]},"duration":5760,"rating":0,"year":1984},{"title":"A Civil Action","directors":{"list":[{"name":"Steven Zaillian"}]},"actors":{"list":[{"name":"Robert Duvall"},{"name":"John Lithgow"},{"name":"John Travolta"},{"name":"Tony Shalhoub"},{"name":"William H Macy"}]},"duration":6600,"rating":3,"year":1998},{"title":"A Clockwork Orange","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Malcolm McDowell"},{"name":"Patrick Magee"},{"name":"Warren Clarke"},{"name":"Aubrey Morris"}]},"duration":7860,"rating":4,"year":1971},{"title":"A Dirty Shame","directors":{"list":[{"name":"John Waters"}]},"actors":{"list":[{"name":"Tracey Ullman"},{"name":"Chris Isaak"},{"name":"Selma Blair"},{"name":"Johnny Knoxville"}]},"duration":5100,"rating":2,"year":2004},{"title":"A Few Good Men","directors":{"list":[{"name":"Rob Reiner"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Kevin Bacon"},{"name":"Tom Cruise"},{"name":"Kiefer Sutherland"},{"name":"Demi Moore"}]},"duration":7920,"rating":4,"year":1992},{"title":"A Gentleman's Gentleman","directors":{"list":[{"name":"Clyde Geronimi"}]},"actors":{"list":[{"name":"Pluto"}]},"duration":420,"rating":0,"year":1941},{"title":"The Reluctant Fundamentalist","directors":{"list":[{"name":"Mira Nair"}]},"actors":{"list":[{"name":"Riz Ahmed"},{"name":"Kate Hudson"},{"name":"Liev Shreiber"},{"name":"Kiefer Sutherland"},{"name":"Om Puri"}]},"duration":7440,"rating":3,"year":2012},{"title":"The Remains of the Day","directors":{"list":[{"name":"James Ivory"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Emma Thompson"},{"name":"Peter Vaughan"},{"name":"Hugh Grant"},{"name":"Christopher Reeve"},{"name":"James Fox"}]},"duration":7680,"rating":5,"year":1993}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160};

        return Q.all([
            expect(promise).to.become(expectedResult),
            expect(promise).to.not.become('invalid data'),
            expect(promise).to.not.be.rejected,
            expect(promise).to.be.fullfilled
        ]);
    });
});

//testing the middleware logic
//second page loading
describe('getApiMov second page', function() {
    beforeEach(function() {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();

        req.query.list = 20;
        req.query.page = 2;
        req.query.q = "";

        promise = getApiMovies(req, res);
    });

    it('is fullfilled', function() {
        return expect(promise).to.be.fullfilled;
    });

    it('is not rejected', function() {
        return expect(promise).to.not.be.rejected;
    });

    it('resolves valid data', function() {
        var expectedResult = {"movies":[{"title":"The Rescuers Down Under","directors":{"list":[{"name":"Hendel Butoy"},{"name":"Mike Gabriel"}]},"actors":{"list":[{"name":"Bob Newhart"},{"name":"Eva Gabor"},{"name":"John Candy"},{"name":"George C Scott"},{"name":"Tristan Rogers"}]},"duration":4380,"rating":3,"year":1990},{"title":"The Right Stuff","directors":{"list":[{"name":"Philip Kaufman"}]},"actors":{"list":[{"name":"Ed Harris"},{"name":"Sam Shepard"},{"name":"Scott Glenn"},{"name":"Barbara Hershey"}]},"duration":11040,"rating":3,"year":1983},{"title":"The Rocketeer","directors":{"list":[{"name":"Joe Johnston"}]},"actors":{"list":[{"name":"Bill Campbell"},{"name":"Jennifer Connelly"},{"name":"Timothy Dalton"},{"name":"Alan Arkin"}]},"duration":6240,"rating":3,"year":1991},{"title":"The Rocky Horror Picture Show","directors":{"list":[{"name":"Jim Sharman"}]},"actors":{"list":[{"name":"Tim Curry"},{"name":"Susan Sarandon"},{"name":"Barry Bostwick"},{"name":"Richard O'Brien"}]},"duration":5700,"rating":4,"year":1975},{"title":"The Saint","directors":{"list":[{"name":"Phillip Noyce"}]},"actors":{"list":[{"name":"Val Kilmer"},{"name":"Elisabeth Shue"},{"name":"Rade Serbedzija"},{"name":"Henry Goodman"},{"name":"Valery Nikolaev"}]},"duration":6660,"rating":0,"year":1997},{"title":"The Santa Clause","directors":{"list":[{"name":"John Pasquin"}]},"actors":{"list":[{"name":"Tim Allen"},{"name":"Judge Reinhold"},{"name":"Wendy Crewson"},{"name":"Eric Lloyd"}]},"duration":5580,"rating":3,"year":1994},{"title":"The Santa Clause 2","directors":{"list":[{"name":"Michael Lembeck"}]},"actors":{"list":[{"name":"Tim Allen"},{"name":"Spencer Breslin"},{"name":"Elizabeth Mitchell"},{"name":"David Krumholtz"},{"name":"Eric Lloyd"}]},"duration":6000,"rating":3,"year":2002},{"title":"The Sea Inside","directors":{"list":[{"name":"Alejandro Amenábar"}]},"actors":{"list":[{"name":"Javier Bardem"},{"name":"Belen Rueda"},{"name":"Lola Dueñas"},{"name":"Mabel Rivera"}]},"duration":7200,"rating":4,"year":2004},{"title":"The Search for Santa Paws","directors":{"list":[{"name":"Robert Vince"}]},"actors":{"list":[{"name":"Zachary Gordon"},{"name":"Kaitlyn Maher"},{"name":"Madison Pettis"},{"name":"Richard Riehle"},{"name":"Bonnie Somerville"}]},"duration":5520,"rating":0,"year":2010},{"title":"The Secret Life of Walter Mitty","directors":{"list":[{"name":"Ben Stiller"}]},"actors":{"list":[{"name":"Ben Stiller"},{"name":"Kristen Wiig"},{"name":"Jon Daly"},{"name":"Kathryn Hahn"},{"name":"Sean Penn"}]},"duration":6540,"rating":4,"year":2013},{"title":"The Seven Year Itch","directors":{"list":[{"name":"Billy Wilder"}]},"actors":{"list":[{"name":"Marilyn Monroe"},{"name":"Tom Ewell"}]},"duration":6000,"rating":4,"year":1955},{"title":"The Shaggy Dog","directors":{"list":[{"name":"Brian Robbins"}]},"actors":{"list":[{"name":"Tim Allen"},{"name":"Kristin Davis"},{"name":"Zena Grey"},{"name":"Spencer Breslin"},{"name":"Robert Downey Jr"},{"name":"Danny Glover"}]},"duration":5640,"rating":3,"year":2006},{"title":"The Shining","directors":{"list":[{"name":"Stanley Kubrick"}]},"actors":{"list":[{"name":"Jack Nicholson"},{"name":"Shelley Duvall"},{"name":"Danny Lloyd"},{"name":"Scatman Crothers"}]},"duration":6840,"rating":5,"year":1980},{"title":"The Silence of the Lambs","directors":{"list":[{"name":"Jonathan Demme"}]},"actors":{"list":[{"name":"Anthony Hopkins"},{"name":"Jodie Foster"},{"name":"Scott Glenn"},{"name":"Ted Levine"},{"name":"Anthony Heald"}]},"duration":6780,"rating":5,"year":1990},{"title":"The SpongeBob SquarePants Movie","directors":{"list":[{"name":"Stephen Hillenburg"}]},"actors":{"list":[{"name":"Tom Kenny"},{"name":"Scarlett Johansson"},{"name":"Clancy Brown"},{"name":"David Hasselhoff"},{"name":"Alec Baldwin"}]},"duration":4980,"rating":4,"year":2004},{"title":"The Sum of All Fears","directors":{"list":[{"name":"Phil Alden Robinson"}]},"actors":{"list":[{"name":"Ben Affleck"},{"name":"Morgan Freeman"},{"name":"Bridget Moynahan"},{"name":"James Cromwell"},{"name":"Ciarán Hinds"},{"name":"Liev Schreiber"},{"name":"Alan Bates"}]},"duration":7080,"rating":4,"year":2002},{"title":"The Sword and the Rose","directors":{"list":[{"name":"Ken Annakin"}]},"actors":{"list":[{"name":"James Robertson Justice"},{"name":"Michael Gough"},{"name":"Richard Todd"},{"name":"Glynis Johns"}]},"duration":5280,"rating":3,"year":1953},{"title":"The Temp","directors":{"list":[{"name":"Tom Holland"}]},"actors":{"list":[{"name":"Lara Flynn Boyle"},{"name":"Timothy Hutton"},{"name":"Faye Dunaway"},{"name":"Oliver Platt"}]},"duration":5520,"rating":0,"year":1993},{"title":"The Ten Commandments","directors":{"list":[{"name":"Cecil B Demille"}]},"actors":{"list":[{"name":"Charlton Heston"},{"name":"Anne Baxter"},{"name":"Yul Brynner"},{"name":"Edward G Robinson"}]},"duration":12600,"rating":4,"year":1956},{"title":"The Texas Chainsaw Massacre (2003)","directors":{"list":[{"name":"Marcus Nispel"}]},"actors":{"list":[{"name":"Jessica Biel"},{"name":"Jonathan Tucker"},{"name":"Andrew Bryniarski"},{"name":"R Lee Ermey"}]},"duration":5640,"rating":3,"year":2003}],"errorMessage":"","totalfilteredMovies":160,"totalMoviesCount":160};

        return expect(promise).to.eventually.deep.eq(expectedResult);
    });
});

//testing the middleware logic
//main scenario - return searched movies
describe('getApiMov with filter phrase', function() {
    beforeEach(function() {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();

        req.query.list = 20;
        req.query.page = 1;
        //search by phrase "week"
        req.query.q = "week";

        promise = getApiMovies(req, res);
    });

    it('is fullfilled', function() {
        return expect(promise).to.be.fullfilled;
    });

    it('is not rejected', function() {
        return expect(promise).to.not.be.rejected;
    });

    it('resolves valid data', function() {
        var expectedResult = {"movies":[{"title":"28 Weeks Later","directors":{"list":[{"name":"Juan Carlos Fresnadillo"}]},"actors":{"list":[{"name":"Robert Carlyle"},{"name":"Jeremy Renner"},{"name":"Rose Byrne"},{"name":"Catherine McCormack"}]},"duration":5760,"rating":3,"year":2007},{"title":"Two Weeks Notice","directors":{"list":[{"name":"Marc Lawrence"}]},"actors":{"list":[{"name":"Hugh Grant"},{"name":"Sandra Bullock"},{"name":"David Haig"},{"name":"Dana Ivey"},{"name":"Alicia Witt"}]},"duration":5820,"rating":3,"year":2002}],"errorMessage":"","totalfilteredMovies":2,"totalMoviesCount":160};

        return expect(promise).to.eventually.deep.eq(expectedResult);
    });
});

//testing the middleware logic
//main scenario - return error message when no movies found by phrase 
describe('getApiMov with filter phrase when no movies found', function() {
    beforeEach(function() {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();

        req.query.list = 20;
        req.query.page = 1;
        //search by phrase "wsdk"
        req.query.q = "wsdk";

        promise = getApiMovies(req, res);
    });

    it('is fullfilled', function() {
        return expect(promise).to.be.fullfilled;
    });

    it('is not rejected', function() {
        return expect(promise).to.not.be.rejected;
    });

    it('resolves valid data', function() {
        var expectedResult = {"movies":[],"errorMessage":"No matching items","totalfilteredMovies":0,"totalMoviesCount":160};

        return expect(promise).to.eventually.deep.eq(expectedResult);
    });
});