import { getTechIcon } from "../../data/techCatalog";

export default function TechIcon({ name, size = 14 }) {
  const icon = getTechIcon(name);
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className="shrink-0 text-[#1C1C1C]/70">
      <title>{name}</title>
      <path d={icon.path} />
    </svg>
  );
}
