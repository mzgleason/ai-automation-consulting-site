import Link from "next/link";
import type { ReactNode } from "react";
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
  className
}: {
  variant: ButtonVariant;
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const variantClass =
    variant === "primary" ? styles.primary : variant === "secondary" ? styles.secondary : styles.tertiary;

  return (
    <Link href={href} className={cx(styles.button, variantClass, className)}>
      {children}
      {variant === "primary" || variant === "secondary" ? <ButtonCorners /> : null}
    </Link>
  );
}

