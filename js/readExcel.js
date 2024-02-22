function handleFile(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        // Parse sheet data as needed
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
        // Use jsonData as needed
        console.log(jsonData);
      };
  
      reader.readAsBinaryString(file);
    }
  }