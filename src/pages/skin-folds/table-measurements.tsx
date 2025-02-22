import { DataGrid } from "@mui/x-data-grid";
import { RequestSkinFolds } from "../../api/skin-folds";
import { formatDate } from "../../utils/format-date";
import ComparableFieldChart from "./chart-comparable-field";

type Props = {
  skinFolds?: RequestSkinFolds[];
};

// Dicionário para formatar as métricas das dobras
const FoldMetric = {
  triceps: 'Dobra Tricipital (mm)',
  biceps: 'Dobra Bicipital (mm)',
  abdominal: 'Dobra Abdominal (mm)',
  subscapular: 'Dobra Subescapular (mm)',
  thigh: 'Dobra da Coxa (mm)',
  suprailiac: 'Dobra Suprailiaca (mm)',
  middle_axillary: 'Dobra Axilar Média (mm)',
  calf: 'Dobra da Panturrilha (mm)',
};

export default function AnthropometricFoldsTable({ skinFolds }: Props) {
  if (!skinFolds || skinFolds.length === 0) {
    return <div>Nenhum dado disponível.</div>;
  }

  // Extrair as chaves de `measurements` para criar as colunas
  const columns = [
    { field: "metric", headerName: "Dobra", width: 200 },
    ...skinFolds.map((item: RequestSkinFolds) => ({
      field: `date_${item.id}`, // Usar o ID para evitar conflitos
      headerName: formatDate(item.measured_at),
      width: 150,
      renderCell: (params: { row: { metric: keyof typeof item.measurements; [key: string]: any } }) => {
        const metric: keyof typeof item.measurements = params.row.metric;
        const metricKey = Object.keys(FoldMetric).find((key) => FoldMetric[key as keyof typeof FoldMetric] === metric);

        // Acessa o valor atual e a diferença
        const value = params.row[`date_${item.id}`]; // Valor da célula
        const diff = metricKey ? item.measurements[metricKey as keyof typeof item.measurements]?.last_diff : null;

        return <ComparableFieldChart current={value} diff={diff} invert />;
      },
    })),
  ];

  // Criar as linhas com base nas métricas das dobras
  const rows = Object.keys(skinFolds[0].measurements).map((metric) => {
    const metricKey = metric as keyof typeof FoldMetric;
    const metricLabel = FoldMetric[metricKey] || metric; // Usa o dicionário ou a própria métrica como fallback

    return {
      id: metric,
      metric: metricLabel, // Formata a métrica usando o dicionário
      ...skinFolds.reduce((acc: { [key: string]: number | string | null }, item: RequestSkinFolds) => {
        // Adiciona o valor da métrica para cada data
        acc[`date_${item.id}`] = item.measurements[metric as keyof typeof item.measurements]?.current || null;
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