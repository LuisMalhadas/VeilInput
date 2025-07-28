
async function maskInput(event) {
  const button = document.querySelector(".composer-submit-btn");
  if (isProgrammaticClick) {
    // Reset the flag and ignore this event to prevent loop
    isProgrammaticClick = false;
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();

  const editable = document.querySelector(".ProseMirror");
  if (!editable) return;
  const originalText = editable.innerText;
  let anonymized = await anonymizeText(originalText);
  // Sometimes it fails to anonymize, so we retry until we get a different result
  while (anonymized === originalText) {
    anonymized = await anonymizeText(originalText);
  }
  editable.innerHTML = '';
  editable.appendChild(document.createTextNode(anonymized));
  editable.dispatchEvent(new InputEvent("input", { bubbles: true }));

  isProgrammaticClick = true;
  setTimeout(() => {
    button.click();  // Programmatic click - will be ignored next time
  }, 50);
}

let isProgrammaticClick = false;
function setupListener() {
  document.body.addEventListener("click", async (event) => {
    const button = event.target.closest && event.target.closest(".composer-submit-btn");
    if (button) {
      await maskInput(event);
    }
  }, { capture: true, passive: false });
  document.body.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      await maskInput(event);
    }
  }, { capture: true, passive: false });
}
setupListener();

let session = null; 
async function anonymizeText(text) {
    try {
        if (!session) {
            session = await LanguageModel.create({
                //...params,
                initialPrompts: [{
                  role: 'system',
                  content: `Replace ALL the GDPR sensitive information in the text by placeholders.
                Use the format: 
                    "John Doe" -> "{{NAME}}", "johndoe@gmail.com" -> "{{EMAIL}}"

                Example sentence 1: Hello, my name is John Doe and my email is johndoe@gmail.com,
                will be transformed to: Hello, my name is {{NAME}} and my email is {{EMAIL}}.
                Example sentence 2: My phone number is +1234567890,
                Will be transformed to: My phone number is {{PHONE}}.
                
                Do not add any other text. Go!`,
                }],
            });
        }
        const replacedText = await session.prompt(text);
        console.log('Replaced text:', replacedText);
        return replacedText;
    } catch (e) {
        console.error('Prompt failed:', e);
        reset();
        throw e;
    }
}
