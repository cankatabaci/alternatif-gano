$(function () {
    let courses = [];

    $(".accordion-toggle").each(function () {
        let course_code = $(this).find("td").eq(1).text();
        let course_name = $(this).find("td").eq(2).text();

        let course_grade = $(this).find("td").eq(6).text();

        courses.push({
            course_code: course_code,
            course_name: course_name,
            course_grade: course_grade
        });

    });

    courses = courses.reduce(function (field, e1) {
        let matches = field.filter(function (e2) {
            return e1.course_code === e2.course_code
        });
        if (matches.length === 0) {
            field.push(e1);
        }
        return field;
    }, []);



    chrome.runtime.sendMessage({action: "show", parsed_courses: courses});
});
