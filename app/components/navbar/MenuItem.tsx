"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string | React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {typeof label === "string" ? <span>{label}</span> : label}
    </div>
  );
};
export default MenuItem;
