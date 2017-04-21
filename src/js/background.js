chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({'url': chrome.extension.getURL('src/html/ortalamaHesaplama.html')}, function (tab) {
        // Tab opened.
        console.log(tab);
    });
});


/*
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

 }*/