import clsx from "clsx";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "border border-[var(--color-rule)] bg-[var(--color-surface)] p-6 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}