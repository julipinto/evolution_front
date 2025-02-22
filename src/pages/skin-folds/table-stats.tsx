import { DataGrid } from "@mui/x-data-grid";
import { ComparableProp, RequestSkinFolds } from "../../api/skin-folds";
import { formatDate } from "../../utils/format-date";
import ComparableFieldChart from "./chart-comparable-field";

type Props = {
  skinFolds?: RequestSkinFolds[];
};

// Dicionário para formatar as métricas
const Metric = {
  weight: 'Peso (kg)',
  fat_percentage: 'Percentual de gordura (%)',
  body_density: 'Densidade corporal (g/cm³)',
  lean_mass: 'Massa magra (kg)',
  residual_mass: 'Massa residual (kg)',
  fat_mass: 'Massa de gordura (kg)',
  fold_sum: 'Soma das dobras (mm)',
  fat_classification: 'Classificação de gordura', // Adicionado para fat_classification
};

export default function StatsTable({ skinFolds }: Props) {
  if (!skinFolds || skinFolds.length === 0) {
    return <div>Nenhum dado disponível.</div>;
  }

  // Extrair as chaves de `stats` para criar as colunas
  const columns = [
    { field: "metric", headerName: "Métrica", width: 200 },
    ...skinFolds.map((item: RequestSkinFolds) => ({
      field: `date_${item.id}`, // Usar o ID para evitar conflitos
      headerName: formatDate(item.measured_at),
      width: 150,
      renderCell: (params: { row: { metric: keyof typeof item.stats; [key: string]: any } }) => {
        const metric: keyof typeof item.stats = params.row.metric;
        const metricKey = Object.keys(Metric).find((key) => Metric[key as keyof typeof Metric] === metric);

        if (typeof item.stats[metric] === 'string') {
          return item.stats[metric];
        }

        const value = params.row[`date_${item.id}`];
        const diff = metricKey ? (item.stats[metricKey as keyof typeof item.stats] as ComparableProp)?.last_diff : undefined;

        const invert = !['lean_mass', 'body_density'].includes(metric);

        return <ComparableFieldChart current={value} diff={diff} invert={invert} />;
      },
    })),
  ];

  const rows = Object.keys(skinFolds[0].stats).map((metric) => {
    const metricKey = metric as keyof typeof Metric;
    const metricLabel = Metric[metricKey] || metric;

    return {
      id: metric,
      metric: metricLabel, 
      ...skinFolds.reduce((acc: { [key: string]: number | string | undefined }, item: RequestSkinFolds) => {
        acc[`date_${item.id}`] = typeof item.stats[metric as keyof typeof item.stats] === 'string' 
          ? item.stats[metric as keyof typeof item.stats] 
          : (item.stats[metric as keyof typeof item.stats] as ComparableProp)?.current;
        return acc;
      }, {}),
    };
  });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick
      disableColumnSorting
      disableColumnFilter
      disableAutosize
      disableColumnMenu
      hideFooter
    />
  );
}