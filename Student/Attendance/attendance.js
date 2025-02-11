document.addEventListener("DOMContentLoaded", function () {
  const students = [
    { SiNo: "1", Subject: "Language", attendance: "89%" },
    { SiNo: "2", Subject: "English", attendance: "69%" },
    { SiNo: "3", Subject: "Mathematics", attendance: "94%" },
    { SiNo: "4", Subject: "Physics", attendance: "77%" },
    { SiNo: "5", Subject: "Chemistry", attendance: "49%" },
    { SiNo: "6", Subject: "Computer Science", attendance: "90%" },
  ];

  function addTable() {
    const table = document.getElementById("studentTable");

    students.forEach((student) => {
      let row = document.createElement("tr");

      row.innerHTML = `
              <td>${student.SiNo}</td>
              <td>${student.Subject}</td>
              <td>${student.attendance}</td>
          `;

      table.appendChild(row);
    });
  }

  addTable(); // Call function after DOM loads
});
