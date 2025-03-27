let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // Esto rastrea el escalamiento
const gifElement = document.getElementById("mikasa-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.getElementById(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// Arreglo de gifs en orden
const gifs = [
    "src/images/mikasa-happy.gif",
    "src/images/mikasa-sad-1.gif",
    "src/images/mikasa-sad-2.gif",
    "src/images/mikasa-crying.gif",
];

// Arreglo de mensajes
const buttonMessages = [
    "Estas segura??",
    "Porfavor cariño",
    "PORFAVOR cariño",
    "No puedes hacerme esto D:",
];

// Boton de 'no' siendo clickeado
noButton.addEventListener("click", () => {
    if (noClicks < maxNoClicks) {
      // change image
      gifElement.src = gifs[noClicks];
    }
  
    // Cambiar boton de 'no'
    noButton.textContent = buttonMessages[noClicks % maxNoClicks];
  
    // Ajusta el ancho del boton para el texto
    noButton.style.width = "auto";
    noButton.style.width = `${noButton.scrollWidth}px`;
  
    // Disminuir el tamaño del boton de 'no'
    if (noScale > minNoScale) {
      noScale -= 0.1;
      noButton.style.transform = `scale(${noScale})`;
    }
  
    // Calcular la escala de ancho del boton de 'si'
    const baseWidth = parseFloat(yesButtonStyle.width);
    const scaledWidth = baseWidth * yesScale; // Reflects the actual visual size of the button
  
    console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);
  
    // Checar si el ancho escalado es menor de el ancho mayor
    if (scaledWidth < maxYesWidth) {
      yesScale += 0.5; // Increment scale by a smaller step
      yesButton.style.transform = `scale(${yesScale})`;
  
      // Obtener el gap scale factor actual de CSS
      const rootStyles = getComputedStyle(document.documentElement);
      const gapScaleFactor =
        parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;
  
      // Ajustar el espacio de forma dinamica
      const currentGap = parseFloat(buttonContainer.style.gap) || 20;
      const newGap = Math.sqrt(currentGap * gapScaleFactor); // Scale based on the factor
      buttonContainer.style.gap = `${newGap}px`;
    }
  
    // Incremento de numero de clicks
    noClicks++;
  });