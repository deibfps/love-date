let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const gifElement = document.getElementById("mikasa-helado");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of gifs - in order
const gifs = [
  "src/images/mikasa-happy.gif",
  "src/images/mikasa-sad1.gif",
  "src/images/mikasa-sad2.gif",
  "src/images/mikasa-crying.gif",
];
// array of messages
const buttonMessages = [
  "Estas segura??",
  "corazón por favor",
  "CORAZÓN por favor",
  "No puedes hacerme esto :( !",
];

// no button clicked
noButton.addEventListener("click", () => {
  if (noClicks < maxNoClicks) {
    // change image
    gifElement.src = gifs[noClicks];
  }

  // change no button text
  noButton.textContent = buttonMessages[noClicks % maxNoClicks];

  // Adjust button width to fit text
  noButton.style.width = "auto";
  noButton.style.width = `${noButton.scrollWidth}px`;

  // decrease the size of the no button
  if (noScale > minNoScale) {
    noScale -= 0.1;
    noButton.style.transform = `scale(${noScale})`;
  }

  // Calculate the scaled width of the yesButton
  const baseWidth = parseFloat(yesButtonStyle.width);
  const scaledWidth = baseWidth * yesScale; // Reflects the actual visual size of the button

  console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

  // Check if the scaled width is less than the max width
  if (scaledWidth < maxYesWidth) {
    yesScale += 0.5; // Increment scale by a smaller step
    yesButton.style.transform = `scale(${yesScale})`;

    // Get the current gap scale factor from CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const gapScaleFactor =
      parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

    // Adjust the gap dynamically
    const currentGap = parseFloat(buttonContainer.style.gap) || 20;
    const newGap = Math.sqrt(currentGap * gapScaleFactor); // Scale based on the factor
    buttonContainer.style.gap = `${newGap}px`;
  }

  // increment the number of clicks
  noClicks++;
});
