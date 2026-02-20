function HighlightedText({ text, risks }) {
  let highlightedText = text;

  risks.forEach((risk) => {
    const safeSentence = risk.sentence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safeSentence, "gi");

    highlightedText = highlightedText.replace(
      regex,
      `<span class="highlight">${risk.sentence}</span>`
    );
  });

  return (
    <div
      className="text-box"
      dangerouslySetInnerHTML={{ __html: highlightedText }}
    />
  );
}

export default HighlightedText;