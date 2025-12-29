export function ellipsizeMiddle(name: string, head = 14, tail = 10) {
    if (!name) return "";
    if (name.length <= head + tail + 3) return name;
    return `${name.slice(0, head)}...${name.slice(name.length - tail)}`;
}
