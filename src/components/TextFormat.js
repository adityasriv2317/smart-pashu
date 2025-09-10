export default function formatText(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return "No information available.";
  }

  // Find the introductory sentence before the list starts.
  const introMatch = rawText.match(/^(.*?):\s\*/);
  let intro = "Here are the key areas to focus on:"; // A sensible default
  let pointsText = rawText;

  if (introMatch && introMatch[1]) {
    intro = introMatch[1].trim() + ":";
    // Isolate the part of the string that contains the points
    pointsText = rawText.substring(rawText.indexOf("*"));
  }

  // Regex to find the Title and Description for each point
  const pointRegex = /\*\s--- (.*?) ---\s(.*?)(?=\s\*\s---|$)/g;

  const formattedPoints = pointsText.replace(
    pointRegex,
    (match, title, description) => {
      // For each match, create a formatted block.
      // We'll capitalize the title to make it stand out as a heading.
      return `\n\n✅ ${title.trim().toUpperCase()}\n   - ${description.trim()}`;
    }
  );

  return (intro + formattedPoints).trim();
}
