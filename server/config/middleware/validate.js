// //------ All Input Data Validation ------------
// module.exports = function(params) {

//     var _isNumeric = function(n) {
//         return !isNaN(parseFloat(n)) && isFinite(n);
//     };

//     var _validateInput = function (params) {
//         var listPerPageConst = 20;
//         var startPageConst = 1;
//         var minimalValueForPageAndList = 1;

//         if (params.list) {

//             if (!_isNumeric(params.list)) {

//                 params.list = listPerPageConst;
//             } else {
//                 if (params.list < minimalValueForPageAndList ||
//                     params.list > db.movies.length) {
//                     params.list = listPerPageConst;
//                 }
//             }

//             params.list = parseInt(params.list);
//         } else {
//             params.list = listPerPageConst;
//         }

//         if (params.page) {
//             if (!_isNumeric(params.page)) {
//                 params.page = startPageConst;
//             } else {
//                 if (params.page < minimalValueForPageAndList ||
//                     params.list * params.page > db.movies.length) {
//                     params.page = startPageConst;
//                 }
//             }

//             params.page = parseInt(params.page);
//         } else {
//             params.page = startPageConst;
//         }

//         if (params.query === undefined) {
//             params.query = "";
//         }

//         if (params.query) {
//             params.query = params.query.toLowerCase();
//         }

//         return params;
//     };

//     return {
//     	input: _validateInput
//     };
// };
