import { Stack, Typography } from "@mui/material";
import ValueChangeChip from "../../components/value-change-chip";

type ComparableFieldChartProps = {
  current: number;
  diff?: number | undefined | null;
  isPercent?: boolean;
  invert: boolean;
};

export default function ComparableFieldChart({
  current,
  diff,
  isPercent,
  invert
}: ComparableFieldChartProps) {
  return (
    <Stack
      direction="row"
      sx={{ display: "flex", alignItems: "center", gap: 1, height: '100%' }}
    >
      <Typography variant="body2" component="p">
        {current ? current : "--"}
      </Typography>
      <ValueChangeChip value={diff} isPercent={isPercent} invert={invert} />
    </Stack>
  );
}
