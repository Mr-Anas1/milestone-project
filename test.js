// login

document.getElementById("login").addEventListener("submit", async (e)=>{
    e.preventDefault();
  
    const userID = document.getElementById("userID").value;
    const password = document.getElementById("Password").value;
    const message = document.getElementById("message");
  
    try{
      let userFound = false;
  
      // check in all collections (students, teachers, admins)
  
      const collections = ["student","teacher","admin"];
      for(const collectionName of collections) {
        const userDocRef = doc(db, collectionName, email); 
        const userDoc = await getDoc(userDocRef);        if (userDoc.exists && unserDoc.data().yourpassword== password){
        
            if (userDoc.exists() && userDoc.data().yourPassword === password) {
                userFound = true;
        
          //redirect based on role
  
          if (collectionName === "student") window.location.href = "./project 1/admin-dashboard/admin.html";
          else if (collectionName === "teacher") window.location.href ="project 1/admin-dashboard/admin.html";
          else if (collectionName === "admin") window.location.href = "project 1/admin-dashboard/admin.html";
  
          break; // exit loop found
        }
      }
      if (!userFound) {
        message.textContent = "Invalid ID or Password.";
        message.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      message.textContent = "Something went wrong. try again.";
    }
  });