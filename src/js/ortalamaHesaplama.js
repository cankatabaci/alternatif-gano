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
    if (course === undefined) {
        alert("course_ects.json'da bulunamayan ders: " + course_code);
        console.log("Bunulanamayan ders: [" + course_code + "]");
    }

    return course.course_ects[0];
}

function tabloyaDersEkle(course_code, course_name, index) {
    let course_name_html = '<input type="text" class="form-control col-sm-10" id="dersadi' + index + '" value="' + course_name + '">';
    let course_credits_html = kredilerComboBoxOlustur(index);
    let course_grades_html = notlarComboBoxOlustur(index);


    $("#not_tablosu").find('tbody')
        .append($('<tr id="' + index + '">')
            .append($('<td>').append(course_code))
            .append($('<td>').append(course_name_html))
            .append($('<td>').append(course_credits_html))
            .append($('<td>').append(course_grades_html))
            .append($('<td>').append('<input color="black" class="silinicekSatir" type="button" value="Sil">'))
        );
}
let VALID_GRADES = ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FD", "FF"];

function ganoHesaplaYazdir() {
    let not_kredi_dict = {};
    $("tr").each(function () {
        let id = $(this).attr('id');
        let not = $("#not" + id + " option:selected").val();
        let kredi = $("#kredi" + id + " option:selected").val();

        if (not !== "Seçiniz") {
            not = parseFloat(not);
            if (not_kredi_dict[not]) {
                not_kredi_dict[not] = not_kredi_dict[not] + parseInt(kredi);
            } else {
                not_kredi_dict[not] = parseInt(kredi);
            }
        }
    });

    delete not_kredi_dict['NaN'];

    let tamamlananKredi = 0;
    let gano = 0.0;

    for (let not in not_kredi_dict) {
        let kredi = parseInt(not_kredi_dict[not]);
        tamamlananKredi = tamamlananKredi + kredi;
    }


    for (let not in not_kredi_dict) {
        let kredi = parseInt(not_kredi_dict[not]);
        gano = gano + kredi * not;
    }
    gano = gano / tamamlananKredi;
    gano = parseFloat(gano).toFixed(2);

    $("#gano").text(gano);
    $("#akts").text(tamamlananKredi);
}


chrome.storage.sync.get("parsed_courses", function (items) {

    $.getJSON("https://raw.githubusercontent.com/cankatabaci/ChromeEklenti-v1/master/src/course_ects.json", function (json) {
        let all_courses = json;
        let parsed_courses = items.parsed_courses;

        for (index = 0; index < parsed_courses.length; ++index) {

            if (VALID_GRADES.includes(parsed_courses[index].course_grade.toString()) || parsed_courses[index].course_grade.toString() === "A") {

                let course_code = parsed_courses[index].course_code;
                let course_name = parsed_courses[index].course_name;
                tabloyaDersEkle(course_code, course_name, index);

                let course_credit = dersKredisiniGetir(all_courses, course_code);

                $("#not" + index + " option").filter(function () { // selecting grade options based on its text
                    return $(this).text() === parsed_courses[index].course_grade;
                }).prop("selected", true);

                $("#kredi" + index + " option").filter(function () { // selecting credits options based on its text
                    return $(this).text() === course_credit.toString();
                }).prop("selected", true);

                ganoHesaplaYazdir();
            } else {
                console.log(parsed_courses[index].course_grade);
            }
        }

    });
});

function satirdakiDersAdiniGetirme(satirID) {
    let degisken = "dersadi" + satirID;
    return $("#" + degisken).val();
}

$(document).ready(function () {

    $('#not_tablosu').on('click', 'select', function () {
        ganoHesaplaYazdir();
    });


    $('#not_tablosu').on('click', '.silinicekSatir', function () {
        let aktif = $(this);
        let satirID = aktif.closest("tr").attr('id');
        let dersAd = satirdakiDersAdiniGetirme(satirID);
        if (confirm(dersAd + ' Dersini Silmek İstediğinizden Emin Misiniz?')) {
            $(this).parent('td').parent('tr').remove();
            ganoHesaplaYazdir();
        }
    });

    $('#btn').click(function () {
        let kod = "Eklenen";
        let name = "";
        let id = $('#not_tablosu tr:last').attr('id');

        tabloyaDersEkle(kod, name, id + 1);
        alert("Yeni Ders Satırı Eklenmiştir");
        $("html, body").animate({scrollTop: $(document).height() - $(window).height()});//Scrolls to bottom.
    });

    $('#yenile').click(function () {
        location.reload();
    });

});
