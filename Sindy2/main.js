let opened = false;
let sidebar = document.querySelector('.sidebar');
const toggleDisplay = () => {
  if(!opened){
    sidebar.style.left = "0";
    
    opened = true;
  }else{
    sidebar.style.left = "-300px";
    opened = false;
    
  }
}
let content1 = document.querySelector('.content1');
let content2 = document.querySelector('.content2');
let content3 = document.querySelector('.content3');
let content4 = document.querySelector('.content4');
let diary = document.querySelector('.diary');


function Home(){
  content1.style.display = "block";
  content2.style.display = "none";
  content3.style.display = "none";
  content4.style.display = "none";
  diary.style.display = "none";
  sidebar.style.left = "-300px";
  opened = false;
  if(!audio.paused){
    audio.pause();
  }
}

function Diary(){
  
  content1.style.display = "none";
  content2.style.display = "block";
  content3.style.display = "none";
  content4.style.display = "none";
  diary.style.display = "none";
  sidebar.style.left = "-300px";
  opened = false;
  if(!audio.paused){
    audio.pause();
  }
}

function Places(){
  content1.style.display = "none";
  content2.style.display = "none";
  content3.style.display = "block";
  content4.style.display = "none";
  diary.style.display = "none";
  sidebar.style.left = "-300px";
  opened = false;
  if (!audio.paused) {
    audio.pause();
  }
}
function openDiary(){
  content1.style.display = "none";
  content2.style.display = "none";
  content3.style.display = "none";
  content4.style.display = "none";
  diary.style.display = "block";
  sidebar.style.left = "-300px";
  opened = false;
  if (!audio.paused) {
    audio.pause();
  }
}

let container = document.querySelector('.container1');
let imgSrc = ["src/IMG-20240816-WA0006.jpg","src/IMG-20240816-WA0008.jpg","src/IMG-20240816-WA0010.jpg","src/IMG-20240816-WA0011.jpg","src/IMG-20240816-WA0012.jpg","src/IMG-20240816-WA0016.jpg","src/IMG-20240816-WA0018.jpg","src/IMG-20240816-WA0020.jpg","src/IMG-20240816-WA0022.jpg","src/IMG-20240816-WA0024.jpg"];
window.onload = () => {
  fetchDiary();
  fetchMessage();
  fetchNewItem();
  if(localStorage.getItem('done') == null){
    intro();
  }else{
    
  }
  imgSrc.forEach(element => {
    container.innerHTML += `<div class="card">
         <img src = "${element}" alt = "photo">
         </div>`;
         //console.log(element)
  });
}
let audio;
function message(){
  content1.style.display = "none";
  content2.style.display = "none";
  content3.style.display = "none";
  content4.style.display = "block";
  diary.style.display = "none";
  sidebar.style.left = "-300px";
  opened = false;
  audio = new Audio('misc/04. Theme of Love(2).mp3');
  audio.play();
  audio.loop = true;
}

const firebaseConfig = {
  apiKey: "process.env.SECRET",
  authDomain: "validator-533ce.firebaseapp.com",
  projectId: "validator-533ce",
  storageBucket: "validator-533ce.appspot.com",
  messagingSenderId: "367967988323",
  appId: "1:367967988323:web:18390dc55e99e718d9a656",
  measurementId: "G-0KGQDK3R0Y",
  databaseURL: "https://validator-533ce-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function uploadDiary(){
  let text = document.querySelector('.text1').value;
  
  const dataRef = database.ref('Diary'). push();
  if(text == ""){
    iziToast.warning({
      message:'Please type something'
    });
  }else{
  dataRef.set({
    message:text
  }).then(() => {
    iziToast.success({
      message:'Saved Successfully',
      color:'black'
    });
    document.querySelector('.text1').value = "";
  }).catch((error) => {
    iziToast.warning({
      message:'Failed'
    });
  })
  }
}
let note = document.querySelector('.note');
  let pages = [];

function fetchDiary(){
  const dataRef = database.ref('Diary');
  dataRef.once('value')
  .then((snapshot) => {
    snapshot.forEach(childSnapShot => {
      const data = childSnapShot.val().message;
      pages.push(data);
    });
    note.innerHTML = `<img src = "icons/1087434.png" class = "iconSize"> ${pages[0]}`;
      pageDetails.innerHTML = `Page:${aliasPage}`;
      page++;
  }).catch((error) => {
    iziToast.warning({
      message:'Failed to fetch'
    });
  })
  
}
let pageDetails = document.querySelector('.pageDetails');
let page = 0;
let aliasPage = 1;
function next(){
  page++;
  aliasPage++;
  if(page < pages.length){
        note.innerHTML = `<img src = "icons/1087434.png" class = "iconSize"> ${pages[page]}`;
         pageDetails.innerHTML = `Page:${aliasPage}`;
   }else{
       page = 0;
       aliasPage = 1;
        note.innerHTML = `<img src = "icons/1087434.png" class = "iconSize"> ${pages[page]}`;
         pageDetails.innerHTML = `Page:${aliasPage}`;
   }
}
function clearDiary(){
  const dataRef = database.ref('Diary');
  dataRef.once('value')
  .then((snapshot) => {
    snapshot.forEach(childSnapShot => {
      childSnapShot.ref.remove();
    });
    iziToast.success({
      message: 'Deleted Successfully',
      color: 'black'
    })
  }).catch((error) => {
    iziToast.warning({
      message:'Unable to delete'
    })
  })
}
let next1 = document.querySelector('.next2');
next1.addEventListener('click',() => {
  next1.style.backgroundColor = "grey";
  setTimeout(() => {
    next1.style.backgroundColor = "blueviolet";
  },500);
})

let myMessage = document.querySelector('.myMessage');
function fetchMessage(){
  const dataRef = database.ref('myMessage');
  dataRef.once('value')
  .then((snapshot) => {
    const data = snapshot.val().message;
    myMessage.innerHTML = `<img src = "icons/1087434.png" class = "iconSize"> ${data}`;
  }).catch((error) => {
    iziToast.warning({
      message:'Failed'
    });
  })
}
let newItem = document.querySelector('.newItem');
function setNewItem(event){
  event.preventDefault();
  let first = document.querySelector('.first').value;
  let second = document.querySelector('.second').value;
  let third = document.querySelector('.third').value;
  const dataRef = database.ref('newItem').push();
  dataRef.set({
    Meal:first,
    Places: second,
    Fun:third
  }).then(() => {
    iziToast.success({
      message:'Updated Successfully',
      color:'black'
    });
  }).catch((error) => {
    iziToast.warning({
      message:'Failed to update'
    });
  })
}
function fetchNewItem() {
  const dataRef = database.ref('newItem');
  dataRef.once('value')
    .then((snapshot) => {
      let htmlContent = ''; // Temporary string to hold all rows

      snapshot.forEach(childSnapShot => {
        const data = childSnapShot.val().Meal;
        const data1 = childSnapShot.val().Places;
        const data2 = childSnapShot.val().Fun;

        // Append each row to the htmlContent string
        htmlContent += `<tr>
            <td>${data}</td>
            <td>${data1}</td>
            <td>${data2}</td>
          </tr>`;
      });

      // Append all rows to newItem after loop completes
      newItem.innerHTML += htmlContent;
    })
    .catch((error) => {
      
    });
}

function delete1(){
  const dataRef = database.ref('newItem');
  dataRef.once('value')
  .then((snapshot) => {
    snapshot.forEach(childSnapShot => {
      childSnapShot.ref.remove();
    })
  }).then(() => {
    iziToast.success({
      message:'Deleted Successfully',
      color:'Black'
    })
  }).catch((error) => {
    iziToast.warning({
      message: 'Failed'
    })
  })
}
function intro(){
  introJs().setOptions({
    steps:[
      {
      intro:"Welcome Sindy, feel free to explore"
      },
      {
        element:".container",
        intro:"This is the menu icon, you can navigate to various sections of the app from here. click to view after tutorial"
      },
      {
        element:".message1",
        intro:"Here Nicholas Johnson sent you a special message!, Click to view."
      },{
        element:".styled-table",
        intro:"Remember when you said this.... Smile you could add more"
      },{
        element:".dirWrapper",
        intro:"This is a present for you, A diary. feel free to write as much as you want."
      },{
        intro:"Enjoy!"
      }
      ],
      showBullets:true,
      exitOnOverlayClick:false,
      exitOnEsc:false,
      disableInteraction:true
  }).start();
  localStorage.setItem("done",true);
}