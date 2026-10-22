# Region 1 filter

Apply the database migration and regenerate the client before starting the updated backend:

```powershell
npx prisma migrate deploy
npx prisma generate
npm run build
```

The dashboard response supplies `filters.region1`, including the 20 region codes and
`{ "label": "blank", "value": "-" }`. The frontend loads these options from the backend.
Select multiple regions using repeated query parameters, for example
`/dashboard?region1=1&region1=20`. Use `region1=-` to include records with no Region 1,
or combine it with region codes. Omitting Region 1 leaves all regions included.
Other dashboard filters still apply alongside the Region 1 selection.

Spreadsheet uploads accept an additional column headed `Region 1` (also `region1`
or `region_1`). Insert it after Tenure, elsewhere among the existing columns, or
append it. Values must be codes 1–20; empty cells or `-` are stored as null.
Files without this column remain supported. Existing database rows initially have
null Region 1; upload data containing the new column to populate region codes.

Run the filter and import checks with `npm test`.
