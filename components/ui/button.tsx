import * as React from "react";
import { Link } from "@/lib/i18n/routing";
import clsx from "clsx";

type Variant = "primary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  "data-cursor"?: string;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
};

type ButtonAsLocaleLink = BaseProps & {
  href: string;
  external?: false;
};

type ButtonAsExternal = BaseProps & {
  href: string;
  external: true;
  download?: boolean | string;
};

type Props = ButtonAsButton | ButtonAsLocaleLink | ButtonAsExternal;

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-sm",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90 transition-opacity",
  ghost:
    "border border-[var(--color-rule)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors",
  link: "text-[var(--color-accent)] underline underline-offset-4 decoration-1 hover:decoration-2",
};

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;
  const classes = clsx(
    "inline-flex items-center gap-2 font-[var(--font-mono)] tracking-tight rounded-none",
    sizeMap[size],
    variantMap[variant],
    className,
  );

  if ("href" in props && props.href) {
    if ("external" in props && props.external) {
      const downloadAttr =
        "download" in props && props.download
          ? typeof props.download === "string"
            ? props.download
            : true
          : undefined;
      return (
        <a
          href={props.href}
          target={downloadAttr ? undefined : "_blank"}
          rel={downloadAttr ? undefined : "noopener noreferrer"}
          download={downloadAttr as never}
          className={classes}
          data-cursor={props["data-cursor"]}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} data-cursor={props["data-cursor"]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={"type" in props ? props.type ?? "button" : "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={classes}
      data-cursor={props["data-cursor"]}
    >
      {children}
    </button>
  );
}