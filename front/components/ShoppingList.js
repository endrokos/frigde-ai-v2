import { useMemo } from "react";

function parseShoppingList(text) {
  const lines = text.split(/\r?\n/);
  const sections = [];
  let section = null;
  const headingRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})?\s*\*\*(.+?)\*\*/u;

  for (let raw of lines) {
    const line = raw.trim();
    if (!line || line === "---") continue;

    const headingMatch = line.match(headingRegex);
    if (headingMatch) {
      if (section) sections.push(section);
      section = { title: headingMatch[2], icon: headingMatch[1] || "", items: [] };
      continue;
    }
    if (!section) continue;

    if (line.startsWith("- ")) {
      section.items.push({ icon: "", text: line.slice(2) });
    } else {
      const emojiMatch = line.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u);
      if (emojiMatch) {
        section.items.push({ icon: emojiMatch[1], text: line.slice(emojiMatch[0].length) });
      } else {
        section.items.push({ icon: "", text: line });
      }
    }
  }
  if (section) sections.push(section);
  return sections;
}

export default function ShoppingList({ text }) {
  const sections = useMemo(() => parseShoppingList(text), [text]);

  const colors = {
    "Platos seleccionados": "text-emerald-600",
    "Verduras y frutas": "text-green-700",
    "Cereales y derivados": "text-yellow-700",
    "Proteínas animales y vegetales": "text-red-700",
    "Lácteos": "text-blue-700",
    Otros: "text-gray-700",
  };

  return (
    <div className="flex flex-col gap-6">
      {sections.map((sec) => (
        <div key={sec.title}>
          <h3 className={`font-semibold flex items-center gap-2 ${colors[sec.title] || "text-emerald-800"}`}>
            {sec.icon && <span>{sec.icon}</span>}
            <span>{sec.title}</span>
          </h3>
          <ul className="mt-2 space-y-1 ml-4 list-disc">
            {sec.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2">
                {it.icon && <span className="mr-1">{it.icon}</span>}
                <span>{it.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
