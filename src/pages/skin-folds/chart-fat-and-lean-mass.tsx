import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { RequestSkinFolds } from "../../api/skin-folds";
import { formatDate } from "../../utils/format-date";
import { Stack, Typography } from "@mui/material";
import ValueChangeChip from "../../components/value-change-chip";

type Props = {
  skinFolds?: RequestSkinFolds[];
};

export default function FatAndLeanMassChart({ skinFolds }: Props) {
  const xAxisData =
    skinFolds?.map((item) => formatDate(item.measured_at)) || [];
  const fatMassData =
    skinFolds?.map((skinFold) => skinFold.stats.fat_mass.current) || [];
  const leanMassData =
    skinFolds?.map((skinFold) => skinFold.stats.lean_mass.current) || [];

  const weightData =
    skinFolds?.map((skinFold) => skinFold.stats.weight.current) || [];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Massa magra x gorda
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {skinFolds?.[skinFolds.length - 1].stats.fat_percentage.current}%
              de gordura atualmente
            </Typography>
            <ValueChangeChip
              value={
                skinFolds?.[skinFolds.length - 1].stats.fat_percentage.last_diff
              }
              isPercent
              invert
            />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Page views and downloads for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={["#FF6384", "#36A2EB"]} // Cores para fat_mass e lean_mass
          xAxis={[
            {
              scaleType: "band",
              // categoryGapRatio: 0.6,
              data: xAxisData,
            },
          ]}
          series={[
            {
              id: "fat_mass",
              label: "Massa Gordurosa (Kg)",
              data: fatMassData || [], // Série: Massa gordurosa
              stack: "A",
            },
            {
              id: "lean_mass",
              label: "Massa Livre de Gordura (Kg)",
              data: leanMassData || [], // Série: Massa livre de gordura
              stack: "A",
            },
            {
              id: "weight",
              label: "Peso Total (Kg)",
              data: weightData, // Série: Peso total
              // @ts-ignore
              type: "line", // Define como uma linha
              color: "#4CAF50", // Cor da linha
            },
          ]}
          height={400}
          // margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: false, // Exibe a legenda
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
