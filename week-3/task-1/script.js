let studentData = [
  {
    id: 1,
    name: "Ahmet",
    surname: "Yılmaz",
    class: "10-A",
    age: 16,
  },
  {
    id: 2,
    name: "Ayşe",
    surname: "Kaya",
    class: "11-B",
    age: 17,
  },
  {
    id: 3,
    name: "Mehmet",
    surname: "Demir",
    class: "9-A",
    age: 15,
  },
  {
    id: 4,
    name: "Zeynep",
    surname: "Özkan",
    class: "12-A",
    age: 18,
  },
  {
    id: 5,
    name: "Ali",
    surname: "Çelik",
    class: "10-B",
    age: 16,
  },
];

let nextId = 6;

$(document).ready(function () {
  renderStudentTable();
  updateStats();
  setupEventListeners();
});

function setupEventListeners() {
  $("#studentForm").on("submit", handleFormSubmit);

  $(document).on("click", ".student-row", handleRowClick);

  $(document).on("click", ".btn-delete", handleDeleteClick);
}

function handleFormSubmit(e) {
  e.preventDefault();

  try {
    const formData = {
      name: $("#studentName").val().trim(),
      surname: $("#studentSurname").val().trim(),
      class: $("#studentClass").val(),
      age: parseInt($("#studentAge").val()) || null,
    };

    if (!validateFormData(formData)) {
      return;
    }

    const newStudent = {
      id: nextId++,
      ...formData,
    };

    studentData.push(newStudent);

    renderStudentTable();
    updateStats();

    $("#studentForm")[0].reset();

    showAlert(
      "success",
      `${newStudent.name} ${newStudent.surname} başarıyla eklendi!`
    );
  } catch (error) {
    console.error("Hata:", error);
    showAlert("error", "Beklenmedik bir hata oluştu.");
  }
}

// Form validasyonu
function validateFormData(data) {
  if (!data.name) {
    showAlert("error", "Öğrenci adı zorunludur.");
    $("#studentName").focus();
    return false;
  }

  if (!data.surname) {
    showAlert("error", "Soyadı zorunludur.");
    $("#studentSurname").focus();
    return false;
  }

  if (!data.class) {
    showAlert("error", "Sınıf seçimi zorunludur.");
    $("#studentClass").focus();
    return false;
  }

  // Aynı isimde öğrenci var mı kontrolü
  const existingStudent = studentData.find(
    (s) =>
      s.name.toLowerCase() === data.name.toLowerCase() &&
      s.surname.toLowerCase() === data.surname.toLowerCase()
  );

  if (existingStudent) {
    showAlert("error", "Bu isimde bir öğrenci zaten mevcut.");
    return false;
  }

  return true;
}

// Satıra tıklama işlemi (Renk değiştirme)
function handleRowClick(e) {
  // Delete butonuna tıklandıysa işlem yapma
  if ($(e.target).hasClass("btn-delete")) {
    return;
  }

  // Tüm satırlardan selected class'ını kaldır
  $(".student-row").removeClass("selected");

  // Tıklanan satıra selected class'ı ekle
  $(this).addClass("selected");

  // Öğrenci bilgisini al
  const studentId = parseInt($(this).data("student-id"));
  const student = studentData.find((s) => s.id === studentId);

  if (student) {
    showAlert("success", `${student.name} ${student.surname} seçildi!`);
  }
}

// Silme butonu işlemi
function handleDeleteClick(e) {
  e.stopPropagation(); // Satır click olayını engelle

  const studentId = parseInt($(this).data("student-id"));
  const student = studentData.find((s) => s.id === studentId);

  if (
    student &&
    confirm(
      `${student.name} ${student.surname} öğrencisini silmek istediğinizden emin misiniz?`
    )
  ) {
    // Öğrenciyi listeden kaldır
    studentData = studentData.filter((s) => s.id !== studentId);

    // Tabloyu güncelle
    renderStudentTable();
    updateStats();

    showAlert(
      "success",
      `${student.name} ${student.surname} başarıyla silindi!`
    );
  }
}

// Öğrenci tablosunu render et
function renderStudentTable() {
  const $container = $("#tableContainer");

  if (studentData.length === 0) {
    $container.html(`
            <div class="empty-state">
                <i>📚</i>
                <h3>Henüz öğrenci yok</h3>
                <p>Yukarıdaki formu kullanarak öğrenci ekleyin</p>
            </div>
        `);
    return;
  }

  let tableHTML = `
        <table class="student-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ad Soyad</th>
                    <th>Sınıf</th>
                    <th>Yaş</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
    `;

  studentData.forEach((student, index) => {
    tableHTML += `
            <tr class="student-row" data-student-id="${student.id}">
                <td>${index + 1}</td>
                <td><strong>${student.name} ${student.surname}</strong></td>
                <td><span style="background: #667eea; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.9rem;">${
                  student.class
                }</span></td>
                <td>${student.age || "-"}</td>
                <td>
                    <button class="btn btn-danger btn-delete" data-student-id="${
                      student.id
                    }">
                        🗑️ Sil
                    </button>
                </td>
            </tr>
        `;
  });

  tableHTML += `
            </tbody>
        </table>
    `;

  $container.html(tableHTML);
}

function updateStats() {
  const totalStudents = studentData.length;
  const uniqueClasses = [...new Set(studentData.map((s) => s.class))].length;
  const avgAge =
    totalStudents > 0
      ? Math.round(
          studentData.filter((s) => s.age).reduce((sum, s) => sum + s.age, 0) /
            studentData.filter((s) => s.age).length
        ) || 0
      : 0;

  $("#totalStudents").text(totalStudents);
  $("#totalClasses").text(uniqueClasses);
  $("#averageAge").text(avgAge);
}

function showAlert(type, message) {
  const $alert = type === "success" ? $("#alertSuccess") : $("#alertError");
  const $other = type === "success" ? $("#alertError") : $("#alertSuccess");

  $other.hide();

  $alert.html(message).show();

  setTimeout(() => {
    $alert.fadeOut();
  }, 3000);
}
