import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm_L1YxsdXGSiGNxj3Rh_qndh0VMGSWF8",
  authDomain: "erp-project01.firebaseapp.com",
  projectId: "erp-project01",
  storageBucket: "erp-project01.firebasestorage.app",
  messagingSenderId: "970396902724",
  appId: "1:970396902724:web:dd9d3ad5dae0ff93472311",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const loginForm = document.querySelector(".input-form");
const messageDiv = document.querySelector(".messageDiv");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector(".email-input").value;
  const password = document.querySelector(".password-input").value;

  console.log("Login with:", email, password);

  try {
    let userFound = false;

    const collections = ["students", "teachers", "admin"];
    for (const collectionName of collections) {
      const userDocRef = doc(db, collectionName, email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().yourPassword === password) {
        userFound = true;

        if (collectionName === "students")
          window.location.href = "./Student/Dashboard/dashboard.html";
        if (collectionName === "teachers")
          window.location.href = "./Teacher/Dashboard/dashboard.html";
        if (collectionName === "admin")
          window.location.href = "./Admin/Dashboard/dashboard.html";

        break;
      }
    }

    if (!userFound) {
      messageDiv.textContent = "Invalid ID or Password.";
      messageDiv.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    messageDiv.textContent = "Something went wrong. Try again.";
  }
});

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Function to Upload PDF File

function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const folder = document.getElementById("upload-folder").value;
  const uploadStatus = document.getElementById("uploadStatus");

  if (!fileInput.files.length) {
    alert("Please select a PDF file.");
    return;
  }

  const file = fileInput.files[0];

  // Check if the file is a PDF
  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed!");
    return;
  }

  const storageRef = storage.ref(`${folder}/${file.name}`);

  //Upload File

  storageRef
    .put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      return db.collection("pdf_files").add({
        folder: folder,
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date(),
      });
    })
    .then(() => {
      uploadStatus.textContent = "Upload successful!";
      uploadStatus.style.color = "green";
      fileInput.value = "";
    })
    .catch((error) => {
      uploadStatus.textContent = "Upload failed!";
      uploadStatus.style.color = "red";
      console.error("Error uploading file: ", error);
    });
}

//Function to fetch files from Firestore
function fetchFiles() {
  const folder = document.getElementById("download-folder").value;
  const fileList = document.getElementById("fileList");

  fileList.innerHTML = "Loading...";

  db.collection("pdf_files")
    .where("folder", "==", folder)
    .get()
    .then((snapshot) => {
      fileList.innerHTML = "";
      if (snapshot.empty) {
        fileList.innerHTML = "<li>No files found in this folder.</li>";
        return;
      }
      snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = data.url;
        link.textContent = data.name;
        link.target = "_blank";
        li.appendChild(link);
        fileList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error fetching files:", error);
      fileList.innerHTML = "<li>Error loading files.</li>";
    });
}
