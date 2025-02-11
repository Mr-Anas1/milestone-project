import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm_L1YxsdXGSiGNxGSiGNx3Rh_qndh0VMGSWF8",
  authDomain: "erp-project01.firebaseapp.com",
  projectId: "erp-project01",
  storageBucket: "erp-project01.firebasestorage.app",
  messagingSenderId: "970396902724",
  appId: "1:970396902724:web:dd9d3ad5dae0ff93472311",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.db = db;

const students = [
  { id: "student1", name: "John", rollNo: "001", attendance: "89%" },
  { id: "student2", name: "Emma", rollNo: "002", attendance: "95%" },
  { id: "student3", name: "Liam", rollNo: "003", attendance: "92%" },
  { id: "student4", name: "Olivia", rollNo: "004", attendance: "88%" },
  { id: "student5", name: "Noah", rollNo: "005", attendance: "94%" },
  { id: "student6", name: "Ava", rollNo: "006", attendance: "90%" },
];

const subjects = [
  "Language",
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computer Science",
];

function addTable() {
  const table = document.getElementById("studentTable");

  students.forEach((student) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td class="studentName" onclick="openAttendance('${student.id}')">${student.name}</td>
      <td>${student.rollNo}</td>
      <td>${student.attendance}</td>
    `;

    table.appendChild(row);
  });
}

function openAttendance(studentId) {
  const student = students.find((s) => s.id === studentId);
  if (!student) return;

  document.getElementById(
    "studentName"
  ).innerText = `Mark Attendance for ${student.name}`;
  const subjectsList = document.getElementById("subjectsList");
  subjectsList.innerHTML = "";

  subjects.forEach((subject) => {
    const subjectRow = document.createElement("div");
    subjectRow.setAttribute("data-subject", subject); 

    subjectRow.innerHTML = `
        <p>${subject}</p>
        <button class="present" onclick="markAttendance('${student.id}', '${subject}', 'Present')">Present</button>
        <button class="absent" onclick="markAttendance('${student.id}', '${subject}', 'Absent')">Absent</button>
      `;

    subjectsList.appendChild(subjectRow);
  });

  document.getElementById("attendanceOverlay").style.display = "flex";
}

function closeAttendance() {
  document.getElementById("attendanceOverlay").style.display = "none";
}

async function markAttendance(studentId, subject, status) {
  const student = students.find((s) => s.id === studentId);
  if (!student) return;

  try {
    await setDoc(doc(db, "attendance", `${studentId}_${subject}`), {
      studentId: studentId,
      studentName: student.name,
      subject: subject,
      status: status,
      timestamp: new Date(),
    });

    const buttons = document.querySelectorAll(
      `#subjectsList div[data-subject="${subject}"] button`
    );
    buttons.forEach((btn) => {
      if (btn.innerText === status) {
        btn.style.backgroundColor =
          status === "Present" ? "#28a745" : "#dc3545"; 
        btn.style.color = "white";
      } else {
        btn.style.backgroundColor = "#ccc"; 
        btn.style.color = "black";
      }
    });
  } catch (error) {
    console.error("Error storing attendance:", error);
  }
}

addTable();
window.openAttendance = openAttendance;
window.closeAttendance = closeAttendance;
window.markAttendance = markAttendance;
