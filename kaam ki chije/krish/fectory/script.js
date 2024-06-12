const text1_options = [
    "Why art is so important",
    "Why you shouldn't buy the new iPhone",
    "Is life actually real?",
    "How to learn JS in 2 months"
  ];
  const text2_options = [
    "69 min. read",
    "7 min. read",
    "8 min. read",
    "87,658.1277 min. read"
  ];
  const color_options = ["#EBB9D2", "#FE9968", "#7FE0EB", "#6CE5B1"];
  const image_options = [
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdLGRKS2rrgoGt64zEyAx7g0f0E2_scedQuNi2rm3ZIwkjcgda",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKtrdHW8l_bCB7uYe97UfdogwAImMhyeW7g7r_dh6n55WsIFG",
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTS0SscGgxahIKlB0XtlSFkDf5q_kOKSWbviCyFGuzgXKxHGHx_",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdsXU5PaZKQ6Ol70e8UOX2W-52UzREBytBteaq__bPGYQu0xRP"
  ];
  var i = 0;
  const currentOptionText1 = document.getElementById("current-option-text1");
  const currentOptionText2 = document.getElementById("current-option-text2");
  const currentOptionImage = document.getElementById("image");
  const carousel = document.getElementById("carousel-wrapper");
  const mainMenu = document.getElementById("menu");
  const optionPrevious = document.getElementById("previous-option");
  const optionNext = document.getElementById("next-option");
  
  currentOptionText1.innerText = text1_options[i];
  currentOptionText2.innerText = text2_options[i];
  currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
  mainMenu.style.background = color_options[i];
  
  optionNext.onclick = function () {
    i = i + 1;
    i = i % text1_options.length;
    currentOptionText1.dataset.nextText = text1_options[i];
  
    currentOptionText2.dataset.nextText = text2_options[i];
  
    mainMenu.style.background = color_options[i];
    carousel.classList.add("anim-next");
    
    setTimeout(() => {
      currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    }, 455);
    
    setTimeout(() => {
      currentOptionText1.innerText = text1_options[i];
      currentOptionText2.innerText = text2_options[i];
      carousel.classList.remove("anim-next");
    }, 650);
  };
  
  optionPrevious.onclick = function () {
    if (i === 0) {
      i = text1_options.length;
    }
    i = i - 1;
    currentOptionText1.dataset.previousText = text1_options[i];
  
    currentOptionText2.dataset.previousText = text2_options[i];
  
    mainMenu.style.background = color_options[i];
    carousel.classList.add("anim-previous");
  
    setTimeout(() => {
      currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    }, 455);
    
    setTimeout(() => {
      currentOptionText1.innerText = text1_options[i];
      currentOptionText2.innerText = text2_options[i];
      carousel.classList.remove("anim-previous");
    }, 650);
  };
  