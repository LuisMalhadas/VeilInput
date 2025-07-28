<p align="center">
  <img src="./logo/VeilInput_logo.png" alt="VeilInput Logo" width="200"/>
</p>

# Veil Input — Experimental Privacy Anonymizer for ChatGPT Inputs

Veil Input is a highly experimental Chrome extension that automatically anonymizes your input on the [chatgpt.com](https://chatgpt.com) interface using a small local language model. It replaces sensitive information in your text before submission to help protect your privacy.

⚠️ **Important:** This is a proof of concept and **not officially supported**. It may stop working at any time and does **not guarantee** complete anonymization.

---

## Features

- Automatically replaces sensitive information in ChatGPT inputs using a local lightweight language model.
- Runs entirely in your browser — no data leaves your device.
- Trigger anonymization manually by clicking a button next to the input box.
- Seamlessly integrates with the official ChatGPT web interface.

---

## Current Limitations (things you can work on)

- No option to review or confirm replaced text before sending.
- Replacement is nondeterministic; the extent of anonymization varies each time.
- Designed as an experimental proof of concept; may break with future ChatGPT updates.
- Not officially affiliated with or supported by OpenAI or ChatGPT or any relation with them.

---

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle top-right).
4. Click **Load unpacked** and select the extension folder.
5. The extension icon will appear in your browser toolbar.

---

## Usage

1. Type your input into the ChatGPT input box as usual.
2. Click the submit button next to the input box in the ChatGPT interface.
3. The extension will automatically anonymize sensitive information in your input.

---

## Next Features (Other things you can work on)

- Create and display a mapping of anonymized entities to their originals.
- Replace anonymized entities in ChatGPT's responses with the original values.
- Allow configuring which entity types to anonymize (e.g., emails, names, phone numbers).
- Support keyboard shortcut triggers for anonymization.
- Improve local language model accuracy and performance.
- Extend to other web interfaces beyond ChatGPT.

---

## Contributing

Contributions and feedback are welcome! Please open an issue or submit a pull request to help improve VeilInput.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Disclaimer

VeilInput is an experimental tool. Use it at your own risk. It provides no warranties or guarantees regarding privacy or functionality.

---

## Contact

For questions or suggestions, please open an issue on GitHub.
