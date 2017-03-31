// chrome.browserAction.onClicked.addListener(function (activeTab) {
//   var newURL = "http://stackoverflow.com/";
//   chrome.tabs.create({ url: newURL });
// });




var courses = [];
courses.push({
  course_code: " course_code",
  course_name: "course_name",
  course_ects:5,
  course_grade: "BB"
});
console.log(courses);

for (var course in courses) {
  console.log(courses[course]);
  var n_row = $('<tr/>');
  $('#tbl-courses tbody').append('<tr class="child"  align="center" ><td>' + courses[course].course_code + '</td><td>' + courses[course].course_name + '</td><td>' + courses[course].course_ects + '</td><td>' + courses[course].course_grade + '</td></tr>');

}
// var grades = {
//     "AA": 4,
//     "BA": 3.5,
//     "BB": 3,
//     "CB": 2.5,
//     "CC": 2,
//     "DC": 1.5,
//     "DD": 1,
//     "DZ": 0,
//     "FF": 0
// }

// var s = $('<select />');

// for (var val in grades) {
//     $('<option />', { value: grades[val], text: val }).appendTo(s);
// }

// s.appendTo('body'); // or wherever it should be
