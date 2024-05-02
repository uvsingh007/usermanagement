let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let loginEmailInput =document.getElementById("loginEmail");
let loginPasswordInput = document.getElementById("loginPassword");
let loginbtn = document.getElementById("loginbtn");
let signupNameInput = document.getElementById("signupName");
let signupEmailInput =document.getElementById("signupEmail");
let signupPasswordInput = document.getElementById("signupPassword")
let signupbtn =document.getElementById("signupbtn");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});


loginbtn.addEventListener("click",loginUser)

async function loginUser(){
    try{
        const user={
            email:loginEmailInput.value,
            password:loginPasswordInput.value
        }
        const res = await fetch("http://localhost:3000/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        })
        const data = await res.json();
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
}