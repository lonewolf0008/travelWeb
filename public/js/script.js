// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// input validation
let priceBtn = document.querySelector(".price");
if (priceBtn) {
  priceBtn.addEventListener("input", (event) => {
    let inputValue = priceBtn.value;
    let filteredValue = inputValue.replace(/[^\d.-]/g, "");
    priceBtn.value = filteredValue;
    console.log("You entered: " + filteredValue);
  });
}

// alert box timeout
// let alertBox = document.querySelectorAll("#successAlertBox");
// setTimeout(() => {
//   alertBox.fadeTo(2000, 0).slideUp(500, () => {
//     alertBox.remove();
//   });
// }, 3000);
