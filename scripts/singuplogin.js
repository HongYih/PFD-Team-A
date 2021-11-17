// Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCJibBa9I0XjRSttIhMgh8bym_e6QBhNH0",
        authDomain: "pfddatabase-6127c.firebaseapp.com",
        projectId: "pfddatabase-6127c",
        storageBucket: "pfddatabase-6127c.appspot.com",
        messagingSenderId: "259884057317",
        appId: "1:259884057317:web:964e10e432ecffecd70a0c",
        databaseURL: "https://pfddatabase-6127c-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import {getDatabase, ref, get, set, child, update, remove}
    from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

    const db = getDatabase();

    window.onload = showAllData;

    function showAllUsers()
    {
        const dbref = ref(db);

        get(child(dbref, "User/")).then(function(AllRecords)
        {

            AllRecords.forEach(function(CurrentRecord) {
                console.log(CurrentRecord);
            });
            });
    }s


    function InsertUser(){

        const dbref = ref(db);

        get(child(dbref, "User/" + rollbox.value)).then(snapshot=>{
            if(snapshot.exists()){
                alert("Data  with that ID alr exists");
            }
            else
            {
            set(ref(db, "TheStudents/"+rollbox.value),{
                NameOfStd: namebox.value,
                RollNo: rollbox.value,
                Section: secbox.value,
                Gender: genbox.value
            })
            .then( ()=> {
                alert("DATA STORED!!!")
            })
            .catch( (error)=> {
                alert("unsuccessful,\n error:" + error);
            });
        }
        })
    }

