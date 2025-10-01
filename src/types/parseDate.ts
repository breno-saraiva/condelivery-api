function parseDateBR(dateStr: string): Date {
  const [dia, mes, ano] = dateStr.split('/');
  return new Date(`${ano}-${mes}-${dia}`);
}

export { parseDateBR };
