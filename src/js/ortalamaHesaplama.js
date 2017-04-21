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

function notlarComboBoxOlustur(index) {
    let not_cb_html = '<select id="not' + index + '" class="form-control">' +
        '<option >Seçiniz</option>' +
        '<option value="4.0">AA</option>' +
        '<option value="3.5">BA</option>' +
        '<option value="3.0">BB</option>' +
        '<option value="2.5">CB</option>' +
        '<option value="2.0">CC</option>' +
        '<option value="1.5">DC</option>' +
        '<option value="1.0">DD</option>' +
        '<option value="0.5">FD</option>' +
        '<option value="0.0">FF</option>' +
        '</select>';
    return not_cb_html;
}

function kredilerComboBoxOlustur(index) {
    let kredi_cb_html = '<select id="kredi' + index + '" class="form-control"> ';
    for (i = 0; i < 30; i++) {
        kredi_cb_html += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
    }
    kredi_cb_html += '</select>';

    return kredi_cb_html;
}

function dersKredisiniGetir(all_courses, course_code) {
    let course = all_courses.find(function (course) {
        return course.course_code === course_code;
    });
    if (course) {
        console.log("course ects");
        console.log(course.course_ects[0]);
    } else {
        console.log("course code");
        console.log(course_code);
    }


    return course.course_ects[0];
}

let VALID_GRADES = ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FD", "FF"];

chrome.storage.sync.get("parsed_courses", function (items) {

    $.getJSON("https://raw.githubusercontent.com/cankatabaci/ChromeEklenti-v1/master/src/course_ects.json", function (json) {
        let all_courses = json;
        let parsed_courses = items.parsed_courses;

        // TODO: 1. Loop through all parsed courses,  (done) add a row,
        //       2.  (done) Write course name inside "dersadi(n)" element
        //       3. Find course credit using course code from all_courses
        //       4. Select course credit (done) put inside "kredi(n)" element
        //       5. (done) Select course grade, (done) put insie "not(n)" element


        for (index = 0; index < parsed_courses.length; ++index) {

            if (VALID_GRADES.includes(parsed_courses[index].course_grade.toString()) || parsed_courses[index].course_grade.toString() === "A") {
                let course_name_html = '<input type="text" class="form-control col-sm-10" name="dersadi' + index + '" value="' + parsed_courses[index].course_name + '">';
                let course_credits_html = kredilerComboBoxOlustur(index);
                let course_grades_html = notlarComboBoxOlustur(index);
                let course_credit = dersKredisiniGetir(all_courses, parsed_courses[index].course_code);

                console.log("course_credit");
                console.log(course_credit);

                $("#not_tablosu").find('tbody')
                    .append($('<tr>')
                        .append($('<td>').append(parsed_courses[index].course_code))
                        .append($('<td>').append(course_name_html))
                        .append($('<td>').append(course_credits_html))
                        .append($('<td>').append(course_grades_html))
						.append($('<td>').append('<a href="#" class="silinicekSatir">Sil</a>'))
                    );

                $("#not" + index + " option").filter(function () { // selecting grade options based on its text
                    return $(this).text() === parsed_courses[index].course_grade;
                }).prop("selected", true);

                $("#kredi" + index + " option").filter(function () { // selecting credits options based on its text
                    return $(this).text() === course_credit.toString();
                }).prop("selected", true);


            } else {
                console.log(parsed_courses[index].course_grade);
            }
        }

    });
});

	$(document).ready(function() {  
		$('#not_tablosu').on('click','.silinicekSatir', function (){  
			if (confirm('Dersi Silmek İstediğinizden Emin Misiniz?')){  
			$(this).parent('td').parent('tr').remove();  
			}  
		});  
	});  