var db = firebase.firestore();
var doc1=[];
class City {
    constructor (website, username, password1,email ) {
        this.website = website;
        this.username = username;
        this.password1 = password1;
		this.email=email;
    }
    toString() {
        return 'website: '+this.website + '<br>' +'username: '+ this.username + '<br>' + 'password:'+this.password1+ '<br>' +' registered email: '+ this.email;
    }
}

    // Firestore data converter
  passwordConverter = {
      toFirestore: function(a) {
          return {
              website: a.website,
              username: a.username,
              password1: a.password1,
			  email: a.email
              }
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new City(data.website, data.username, data.password1,data.email)
      }
  }
function trail(){

   
	var small=0,spl=0,cap=0,num=0;
	var r="";
	var flag=0;
	while(flag === 0){
		var choice=Math.floor(Math.random() * 4 );
		if(choice ===0 &&  small<4){
			small++;
			var choice1=Math.floor(Math.random() * 26 )+97;
			var str1=r.concat(String.fromCharCode(choice1));
			r=str1;
		}
		else if(choice ===1 &&  spl<4){
			spl++;
			var choice1=Math.floor(Math.random() * 10 )+33;
			var str1=r.concat(String.fromCharCode(choice1));
			r=str1;
		}
		else if(choice ===2 &&  cap<4){
			cap++;
			var choice1=Math.floor(Math.random() * 26 )+65;
			var str1=r.concat(String.fromCharCode(choice1));
			r=str1;
		}
		else if(choice ===3 &&  num<4){
			num++;
			var choice1=Math.floor(Math.random() * 10 )+48;
			var str1=r.concat(String.fromCharCode(choice1));
			r=str1;
		}
		
		if(spl ===4 &&small ===4 &&cap ===4 &&num ===4)
			flag++;
	}
	var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = r;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
	
	
	document.getElementById('password1').innerHTML 
                = r;
				

	 
}
function delete1(){
	var web11=document.getElementById("web21").value;
	if(doc1.length===0){
		
		window.alert("You have searched anything to delete!!!!");
	}
	else{
		console.log(web11);
		if(web11==='' ||parseInt(web11)<1 || parseInt(web11)>doc1.length ){
		
		window.alert("Please Enter a proper value!!!");
		}
		else{
			console.log("sucess");
			console.log(doc1[parseInt(web11)-1]);
			if (window.confirm("Do you want to proceed with the deletion")) {
  			db.collection("password").doc(doc1[parseInt(web11)-1]).delete().then(function() {
			window.alert("Document successfully deleted!");
			}).catch(function(error) {
					window.alert("Deletion wasnt successfull Please try again!!!");
				});
            } 
			else {
                     txt = "You pressed Cancel!";
            }
			
		}
	}
	search();
}
function insert(){
	
	
	var website= document.getElementById("website1").value;
	var username1=document.getElementById("user1").value;
	var pass=document.getElementById("password1").textContent;
	var email= document.getElementById("email1").value;
	console.log( pass);
	db.collection("password").add({
    website: website,
    username: username1,
	password1: pass,
	email:email
	
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
	window.alert("Successfully inserted into firebase")

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}



function search(){
	console.log("ITs in the search")
	
	doc1=[];
	var web11=document.getElementById("web1").value;
	console.log(web11);
	db.collection("password").where("website","==",web11)
	.withConverter(passwordConverter)
    .get()
    .then(function(querySnapshot) {
		console.log("It has received!!");
		var count=0,r="";
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
			a=doc.data();
			r+=(count+1).toString()+") <br>";
            r+=a.toString()+"<br><br><br>";
		    console.log(doc.id, " => ", a.toString());
			doc1.push(doc.id);
			count++;
        });
		
		if(count===0)  {document.getElementById("pass1").innerHTML= "Invaild Website";}
		else if(count>0){
			document.getElementById("pass1").innerHTML=r;
		}
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}