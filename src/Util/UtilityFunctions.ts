export default function trimDescription(description: string) {
    const desc = description
        .replace("<p>", "")
        .replace("</p>", "")
        .replace("<p>", "")
        .replace("</p>", "")
        .replace("<p>", "")
        .replace("</p>", "");
    if (desc.length > 110) {
        const trimmedString = desc.substring(0, 110);
        return trimmedString + "...";
    } else {
        return desc;
    }
};