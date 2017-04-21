/*
*
* {
 "course_code": "CBU 4401",
 "course_grade": "A",
 "course_name": "Girişimcilik"
 }

 {
 "course_code": "FIZ 1301",
 "course_ects": [
 5
 ]
 }

* */
chrome.storage.sync.get("parsed_courses", function (items) {

    $.getJSON("https://raw.githubusercontent.com/cankatabaci/ChromeEklenti-v1/master/src/course_ects.json", function (json) {
        let all_courses = json;
        let parsed_courses = items.parsed_courses;

        // TODO: 1. Loop through all parsed courses, add a row,
        //       2. Write course name inside "dersadi(n)" element
        //       3. Find course credit using course code from all_courses
        //       4. Select course credit insde "kredi(n)" element
        //       5. Select course grade, put insie "not(n)" element
    });
});