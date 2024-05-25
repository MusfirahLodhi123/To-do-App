var firebaseConfig = {
    apiKey: "AIzaSyA08cf6ARzxwjyfBcsx_LKAIJEL5oVmio8",
    authDomain: "todo-d9c4b.firebaseapp.com",
    databaseURL: "https://todo-d9c4b-default-rtdb.firebaseio.com",
    projectId: "todo-d9c4b",
    storageBucket: "todo-d9c4b.appspot.com",
    messagingSenderId: "89195319371",
    appId: "1:89195319371:web:210b54f7a318e0c4037dce"
  };
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();
console.log(db);

function addtodo(){
    var input = document.getElementById('todoinput');
    var id = Date.now().toString(25);
    var obj = {
      key: id,
todoValue: input.value,
}
firebase.database().ref("todos/"+id).set(obj);
}

    // var list = document.getElementById('list');
    // list.innerHTML+= `<li>${input.value} 
    // <button onclick="editItem(this)">Edit</button> 
    // <button onclick="deleteItem(this)">Deleteitem</button></li>`

function deleteall(){
  firebase.database().ref("todos").remove();
  var list = document.getElementById('list');
  list.innerHTML="";
    // var list = document.getElementById("list");
    //  list.innerHTML = "";
    }
    function deleteItem(e) {
      firebase.database().ref('todos/'+e.id).remove()
      e.parentNode.remove();
  //  e.parentNode.remove();
 }
        
 function editItem(e) {
  var valId=e.id;
  var updatedValId= prompt('Enter updated value');
  firebase.database().ref('todos/'+valId).set({
    key:e.id,
    todoValue:updatedValId,
  })
  e.parentNode.firstChild.nodeValue=updatedValId;
  //  var updateValue = prompt("Enter updated value..");
  //     e.parentNode.firstChild.nodeValue = updateValue;
 }
firebase.database().ref('todos').on('child_added',function(data){
  console.log(data.val().todoValue);
  var list = document.getElementById('list');
  list.innerHTML +=`<li>${data.val().todoValue}
  <button id=${data.val().key} onclick="editItem(this)">Edit</button>
  <button id=${data.val().key} onclick="deleteItem(this)">Delete</button>
  </li>`
})