class DataExporter {
  constructor(options) {
    this.header = options.header;
  }

  parse(data) {
    const csvContent = data
      .map((row) => Object.values(row).join(","))
      .join("\n");
    return `${this.header.join(",")}\n${csvContent}`;
  }
}

module.exports = DataExporter;
