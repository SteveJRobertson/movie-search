export interface RowProps {
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "stretch" | "baseline";
  gap?: number;
  grow?: "0" | "1" | "grow";
  shrink?: "0" | "1" | "shrink";
  className?: string;
}
