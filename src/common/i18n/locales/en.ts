export type TranslationKey = keyof typeof en;

export const en = {
  // App
  "app.title": "AMBER",
  // Toast messages
  "toast.query.generic.error.unknown": "Something went wrong!",
  "toast.mutation.generic.error.unknown": "Something went wrong!",
  // Settings - Company types
  "config.company-types.investments.name": "Investments",
  "config.company-types.investments.description": "Investments description",
  "config.company-types.productive.name": "Productive",
  "config.company-types.productive.description": "Productive description",
  "config.company-types.banks.name": "Bank",
  "config.company-types.banks.description": "Bank description",
  // Settings - Dividend types
  "config.dividend-types.definitive.name": "Definitive",
  "config.dividend-types.definitive.description": "Definitive description",
  "config.dividend-types.provisional.name": "Provisional",
  "config.dividend-types.provisional.description": "Provisional description",
  "config.dividend-types.additional.name": "Additional",
  "config.dividend-types.additional.description": "Additional description",
  "config.dividend-types.eventual.name": "Eventual",
  "config.dividend-types.eventual.description": "Eventual description",
  // Analysis - Profitability
  "analysis.profitability.title": "Análisis de Rentabilidad",
  "analysis.profitability.results.title": "Resultados del análisis",
  "analysis.profitability.results.no-results": "No hay resultados para mostrar",

  // Analysis - Profitability results
  "analysis.profitability.results.observations.title": "Observaciones",
  "analysis.profitability.results.every-year.title": "Según frecuencia de pagos:",
  "analysis.profitability.results.every-year.true": "Es una acción dividendera!",
  "analysis.profitability.results.every-year.false": "Existen años que no pagó dividendos",
  "analysis.profitability.results.good-dividend.title": "Según porcentaje de ganancia:",
  "analysis.profitability.results.good-dividend.-1": "Cuidado! No paga buenos dividendos",
  "analysis.profitability.results.good-dividend.0": "Es una acción bastante atractiva",
  "analysis.profitability.results.good-dividend.1": "Es una excelente acción!",
  "analysis.profitability.results.rising-dividends.title": "Tendencia de los dividendos:",
  "analysis.profitability.results.rising-dividends.-1": "Cuidado! los dividendos van en bajada",
  "analysis.profitability.results.rising-dividends.0":
    "Los dividendos crecen lentamente o no están creciendo",
  "analysis.profitability.results.rising-dividends.1": "Los dividendos crecen a buen ritmo!",
  // Server Validation Errors
  "server-validation.file-column.invalid_date": `Columna "{column}": "{value}" no es una fecha válida o no cumple con el formato "AAAA-MM-DD".`,
  "server-validation.file-column.invalid_type": `Columna "{column}": "{value}" no es válido, para valores numéricos usa el punto "." como separador decimal.`,
  "server-validation.file-column.required": `Columna "{column}": Es requerida.`,
  "server-validation.file-column.invalid_enum_value": `Columna "{column}": "{value}" no es permitido, solo se aceptan los valores {expected}`,
  "server-validation.file-column.unknown": `Columna "{column}": "{value}" genera un error desconocido, favor verificar.`,
  // Actions
  "actions.see-more": "({count}) more",
  "actions.see-less": "See less",
  // Words
  "word.create": "Create",
  "word.help": "Help",
  "word.retry": "Retry",
  "word.logout": "Logout",
};
