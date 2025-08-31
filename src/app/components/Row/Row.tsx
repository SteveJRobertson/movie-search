import type { PropsWithChildren } from "react";
import type { RowProps } from "./Row.types";

export const Row = ({
  justify,
  align,
  gap,
  grow,
  shrink,
  className = "",
  children,
  ...rest
}: PropsWithChildren<RowProps>) => {
  const justifyClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  const growClasses = {
    "0": "grow-0",
    "1": "grow",
    grow: "grow",
  };

  const shrinkClasses = {
    "0": "shrink-0",
    "1": "shrink",
    shrink: "shrink",
  };

  const gapClass = gap ? `gap-${gap}` : "";
  const justifyClass = justify ? justifyClasses[justify] : "";
  const alignClass = align ? alignClasses[align] : "";
  const growClass = grow ? growClasses[grow] : "";
  const shrinkClass = shrink ? shrinkClasses[shrink] : "";

  const classes = `flex flex-row ${justifyClass} ${alignClass} ${gapClass} ${growClass} ${shrinkClass} ${className}`;

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
