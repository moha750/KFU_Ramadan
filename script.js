var create_workspace=document.querySelector(".create-workspace");
var next_click=document.querySelectorAll(".next-click");
var back_click=document.querySelectorAll(".back-click");
var finish_click=document.querySelector(".finish-click");
var main_form=document.querySelectorAll(".main");
var list=document.querySelectorAll(".progress-bar li")
let formnumber=0;


create_workspace.addEventListener('click',function(){
    if(!validateform()){
        return false;
    }
   formnumber++;
   updateform();
   progress_forward();
});

next_click.forEach(function(next_page){
    next_page.addEventListener('click',function(){
         if(!validateform()){
        return false;
        }
         formnumber++;
         updateform();
         progress_forward();
    });
});


back_click.forEach(function(back_page){
    back_page.addEventListener('click',function(){
         formnumber--;
         updateform();   
    });
});

finish_click.addEventListener('click',function(){
//   if(!validateform()){
//         return false;
//         }
         formnumber++;
         updateform();
         var remove_progress=document.querySelector(".progress-bar");
         remove_progress.classList.add('d-none'); 
});
function progress_forward(){
    list[formnumber].classList.add('active');
}



function updateform(){
    main_form.forEach(function(main_number){ 
       main_number.classList.remove('active'); 
    });
    main_form[formnumber].classList.add('active');
  
   
} 



 
function validateform() {
    let validate = true;
    let errorMessage = ""; // لتجميع الأخطاء

    let validate_form = document.querySelectorAll(".main.active input, .main.active select, .main.active textarea");

    validate_form.forEach(function (val) {
        val.classList.remove('warning'); 

        if (val.hasAttribute('require')) {
            if (val.type === "text" || val.type === "email" || val.type === "number" || val.type === "date" || val.type === "color") {
                if (val.value.trim() === "") {
                    validate = false;
                    val.classList.add('warning');
                    errorMessage = "🚓🚨 و يو ويو، صدناك ما عبيت كُل البيانات";

                }
            }

            // التحقق من الاسم الثلاثي أو الرباعي
            if (val.name === "الأسم الثلاثي") {
                let nameValue = val.value.trim();
                let namePattern = /^[\u0600-\u06FF]+\s[\u0600-\u06FF]+\s[\u0600-\u06FF]+(\s[\u0600-\u06FF]+)?$/;

                // التحقق إذا كان الحقل فارغًا
                if (nameValue === "") {
                    validate = false;
                    val.classList.add('warning');
                    errorMessage = "شلون نبدأ وأنت مو حاط أسمك🦦؟";
                } 
                // التحقق من صحة تنسيق الاسم
                else if (!namePattern.test(nameValue)) {
                    validate = false;
                    val.classList.add('warning');
                    errorMessage = "🤨تفكر ما نقدر نشوفك؟ حط أسمك الثلاثي يـ شاطر";
                }
            }

            // التحقق من رقم الهاتف (يجب أن يبدأ بـ 05 ويكون طوله 10 أرقام)
            if (val.name === "رقم الجوال") {
                let phonePattern = /^05\d{8}$/;
                if (!phonePattern.test(val.value)) {
                    validate = false;
                    val.classList.add('warning');
                    errorMessage = "📱وين عايش؟ رقم الجوال لازم يبدأ بِـ05";
                }
            }

            // التحقق من السجل المدني (يجب أن يكون 10 أرقام)
            if (val.name === "السجل المدني") {
                let idPattern = /^\d{10}$/;
                if (!idPattern.test(val.value)) {
                    validate = false;
                    val.classList.add('warning');
                    errorMessage = "🪪ترا الهوية الوطنية 10 أرقام يا الحبيب";
                }
            }

            // التحقق من الرقم الأكاديمي (يجب أن يكون 9 أرقام)
            if (val.name === "الرقم الأكاديمي") {
                let idPattern = /^\d{9}$/;
                if (!idPattern.test(val.value)) {
                    validate = false;
                    val.classList.add('warning');
                    errorMessage = "🤦🏻حتى رقمك الجامعي مو حافظه؟ أنت شنو حافظ في حياتك";
                }
            }

            // التحقق من البريد الإلكتروني
            if (val.type === "email") {
                let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(val.value)) {
                    validate = false;
                    val.classList.add('warning');
                    errorMessage = "يالزنس أنت، أكتب ايميلك صح";
                }
            }
        }
    });

    // التحقق من اختيار اللجان (radio)
    let radioGroups = document.querySelectorAll(".main.active input[type='radio'][name='اللجنة']");
    if (radioGroups.length > 0) {
        let checked = Array.from(radioGroups).some(radio => radio.checked);
        if (!checked) {
            validate = false;
            errorMessage = "!🦦يعني تبغى تقعد بالنادي بدون لجنة";
        }
    }

// التحقق من اختيار المستوى الدراسي (select)
let selectFields = document.querySelectorAll(".main.active select");

let isSelectValid = true; // متغير لمتابعة حالة التحقق من القائمة المنسدلة

for (let select of selectFields) {
    select.classList.remove('warning'); // إزالة التحذير القديم

    if (select.hasAttribute('required') && select.value.trim() === "") {
        select.classList.add('warning');
        errorMessage = " 🫠تتوقع بنعرف مستواك الدراسي من أسمك ";
        isSelectValid = false;
        break; // إيقاف التحقق عند أول خطأ
    }
}

// عرض رسالة تنبيه باستخدام SweetAlert2 إذا كان هناك خطأ
if (!isSelectValid) {
    Swal.fire({
        title: "❗ تنبيه",
        text: "يرجى اختيار المستوى الدراسي.",
        icon: "warning",
        errorMessage: "🎨 لا تنسى اختيار اللون الأساسي.",
        confirmButtonText: "حسنًا",
        confirmButtonColor: "#009345"
    });
    validate = false;
}


        // ✅ التحقق من اختيار التقييم
        let rating = document.querySelectorAll(".main.active input[type='radio'][name='التقييم']");
        let ratingChecked = Array.from(rating).some(rate => rate.checked);
        if (rating.length > 0 && !ratingChecked) {
            validate = false;
            errorMessage = "😅 قيم تجربتك مع أدِيب قبل المتابعة.";
        }
    
        // ✅ التحقق من اختيار الألوان
        let primaryColor = document.querySelector(".main.active input[name='اللون الأساسي']");
        let secondaryColor = document.querySelector(".main.active input[name='اللون الثانوي']");
    
        if (primaryColor && primaryColor.value.trim() === "") {
            validate = false;
            errorMessage = "🎨 لا تنسى اختيار اللون الأساسي.";
        }
    
        if (secondaryColor && secondaryColor.value.trim() === "") {
            validate = false;
            errorMessage = "🌈 لا تنسى اختيار اللون الثانوي.";
        }

    // عرض رسالة خطأ باستخدام SweetAlert2 إذا كان هناك خطأ
    if (!validate) {
        Swal.fire({
            html: `<p style="font-size: 20px; color:#f27474;">${errorMessage}</p>`,
            text: errorMessage,
            icon: "error",
            confirmButtonText: "😔حاضر، لا تعصب",
            confirmButtonColor: "#009345",
            customClass: {
                htmlContainer: 'custom-swal-text' // لتغيير حجم ولون النص
            }
        });
    }

    validate_form.forEach(function (val) {
        if (val.tagName.toLowerCase() === "textarea") {
            if (val.value.trim() === "") {
                validate = false;
                val.classList.add('warning');
                errorMessage = "📝 لا يمكنك ترك المساحة الإبداعية فارغة!";
            }
        }
    });
    


    

    return validate;
}



