import Link from "next/link";
import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ButtonCorners() {
  return (
    <span className={styles.corners} aria-hidden="true">
      <span className={styles.cornerTl} />
      <span className={styles.cornerTr} />
      <span className={styles.cornerBl} />
      <span className={styles.cornerBr} />
    </span>
  );
}

export function Button({
  variant,
  href,
  children,
  className,
  target,
  rel
}: {
  variant: ButtonVariant;
  href: string;
  children: ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
}) {
  const variantClass =
    variant === "primary" ? styles.primary : variant === "secondary" ? styles.secondary : styles.tertiary;

  return (
    <Link href={href} className={cx(styles.button, variantClass, className)} target={target} rel={rel}>
      {children}
      {variant === "primary" || variant === "secondary" ? <ButtonCorners /> : null}
    </Link>
  );
}
