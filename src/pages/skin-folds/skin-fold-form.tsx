import Grid from "@mui/material/Grid2";
import {
  DatePickerField,
  NumberField,
  TextField,
} from "../../components/hook-form";

export function SkinFoldForm() {
  return (
    <Grid container spacing={2} columns={12} alignItems="flex-end">
      <Grid size={{ xs: 6 }}>
        <NumberField
          name="triceps"
          label="Dobra tricipital (mm)"
          placeholder="12.3"
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <NumberField
          name="biceps"
          label="Dobra bicipital (mm)"
          placeholder="12.3"
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <NumberField
          name="abdominal"
          label="Dobra abdominal (mm)"
          placeholder="12.3"
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <NumberField
          name="subscapular"
          label="Dobra subescapular (mm)"
          placeholder="12.3"
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <NumberField
          name="thigh"
          label="Dobra da coxa (mm)"
          placeholder="12.3"
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <NumberField
          name="suprailiac"
          label="Dobra supra-ilíaca (mm)"
          placeholder="12.3"
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <NumberField
          name="middle_axillary"
          label="Dobra axilar média (mm)"
          placeholder="12.3"
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <NumberField
          name="calf"
          label="Dobra da panturrilha (mm)"
          placeholder="12.3"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <NumberField name="weight" label="Peso (Kg)" />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          name="measured_by"
          label="Profissional que realizou a medição"
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <DatePickerField name="measured_at" label="Data da medição" />
      </Grid>
    </Grid>
  );
}
