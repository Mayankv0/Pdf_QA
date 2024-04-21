document.addEventListener("DOMContentLoaded", function() {
    const pdfInput = document.getElementById("pdfInput");
    const pdfContainer = document.getElementById("pdfContainer");
    const questionInput = document.getElementById("questionInput");
    const submitButton = document.getElementById("submitQuestion");
    const answerContainer = document.getElementById("answerContainer");
  
    let pdfDoc = null;
  
    pdfInput.addEventListener("change", function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const typedarray = new Uint8Array(event.target.result);
        PDFJS.getDocument(typedarray).promise.then(function(pdf) {
          pdfDoc = pdf;
          renderPage(pdf, 1);
        });
      };
  
      reader.readAsArrayBuffer(file);
    });
  
    function renderPage(pdf, pageNumber) {
      pdf.getPage(pageNumber).then(function(page) {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });
  
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
  
        page.render(renderContext).promise.then(function() {
          pdfContainer.innerHTML = "";
          pdfContainer.appendChild(canvas);
        });
      });
    }
  
    submitButton.addEventListener("click", function() {
      const question = questionInput.value.trim();
      if (question !== "") {
        // Call your machine learning model endpoint to get answer
        const answer = "backend not available";
        answerContainer.innerHTML = `<p><strong>Answer:</strong> ${answer}</p>`;
      } else {
        alert("Please enter a question.");
      }
    });
  });
  