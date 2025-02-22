import Chip from "@mui/material/Chip";

type ValueChangeChipProps = {
  value?: number | undefined | null;
  isPercent?: boolean;
  invert: boolean;
};

export default function ValueChangeChip({ value, isPercent, invert }: ValueChangeChipProps) {
  if (!value) return null;

  const label = isPercent ? `${value}%` : value;

  const increaseClor = invert ? 'error' : 'success';
  const decreaseColor = invert ? 'success' : 'error';
  
  if (value > 0) {
    return <Chip size="small" color={increaseClor} label={'+' + label} />
  }

  return <Chip size="small" color={decreaseColor} label={label} />
}